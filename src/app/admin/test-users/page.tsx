"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TestUser {
  id: string;
  email: string;
  phone: string;
  operatingSystem: string;
  createdAt: string;
  updatedAt: string;
}

interface TestUserData {
  users: TestUser[];
  stats: {
    total: number;
    android: number;
    iphone: number;
    recentActivity: {
      date: string;
      count: number;
    }[];
  };
}

export default function TestUsersAdmin() {
  const [data, setData] = useState<TestUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Function to filter unique emails
  const getUniqueEmailUsers = (users: TestUser[]) => {
    const uniqueEmails = new Map<string, TestUser>();
    
    // Keep only the most recent entry for each email
    users.forEach(user => {
      const existingUser = uniqueEmails.get(user.email);
      if (!existingUser || new Date(user.createdAt) > new Date(existingUser.createdAt)) {
        uniqueEmails.set(user.email, user);
      }
    });
    
    return Array.from(uniqueEmails.values());
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("admin_token");
      
      if (!storedToken) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/test-users", {
          headers: {
            "x-admin-token": storedToken
          }
        });

        if (response.status === 401) {
          localStorage.removeItem("admin_token");
          router.push("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const testUserData = await response.json();
        setData(testUserData);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  // Function to export data to CSV
  const exportToCSV = () => {
    if (!data || !data.users || data.users.length === 0) return;
    
    const uniqueUsers = getUniqueEmailUsers(data.users);
    const headers = ["Email", "Telefone", "Sistema Operacional", "Data de Criação"];
    const csvHeader = headers.join(',');
    
    const csvRows = uniqueUsers.map(user => {
      const email = user.email.replace(/"/g, '""');
      const phone = user.phone.replace(/"/g, '""');
      const os = user.operatingSystem.replace(/"/g, '""');
      const date = formatDate(user.createdAt);
      
      return [
        `"${email}"`, 
        `"${phone}"`, 
        `"${os}"`, 
        `"${date}"`
      ].join(',');
    }).join('\n');
    
    const csvContent = `${csvHeader}\n${csvRows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `teste-usuarios-unicos.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique email users if data exists
  const uniqueUsers = data?.users ? getUniqueEmailUsers(data.users) : [];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Usuários de Teste</h1>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm font-medium transition-colors"
          >
            Voltar ao Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : error ? (
          <div className="text-red-400 py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm text-neutral-400 mb-1">Total de Usuários Únicos</h3>
                <p className="text-2xl font-bold text-white">{uniqueUsers.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm text-neutral-400 mb-1">Android</h3>
                <p className="text-2xl font-bold text-green-400">
                  {uniqueUsers.filter(user => 
                    user.operatingSystem.toLowerCase().includes('android')
                  ).length}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm text-neutral-400 mb-1">iPhone</h3>
                <p className="text-2xl font-bold text-blue-400">
                  {uniqueUsers.filter(user => 
                    user.operatingSystem.toLowerCase().includes('iphone') || 
                    user.operatingSystem.toLowerCase().includes('ios')
                  ).length}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Lista de Usuários (Emails Únicos)</h2>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
              >
                Exportar CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 rounded-lg">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left">Data</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Telefone</th>
                    <th className="p-4 text-left">Sistema</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10">
                      <td className="p-4 text-neutral-300">{formatDate(user.createdAt)}</td>
                      <td className="p-4 text-neutral-300">{user.email}</td>
                      <td className="p-4 text-neutral-300">{user.phone}</td>
                      <td className="p-4 text-neutral-300">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.operatingSystem.toLowerCase().includes('android') 
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-blue-900/30 text-blue-400'
                        }`}>
                          {user.operatingSystem}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!uniqueUsers.length && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-neutral-400">
                        Nenhum usuário de teste encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 