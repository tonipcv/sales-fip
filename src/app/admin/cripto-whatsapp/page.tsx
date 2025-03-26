"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface WhatsAppLead {
  id: string;
  whatsapp: string;
  createdAt: string;
  checked: boolean;
}

interface Stats {
  total: number;
  unique: number;
  duplicates: number;
}

export default function AdminCriptoWhatsapp() {
  const [leads, setLeads] = useState<WhatsAppLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    unique: 0,
    duplicates: 0
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/cripto-whatsapp?admin_token=${adminToken}`
      );

      if (response.status === 401) {
        setError("Código de acesso inválido");
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao carregar dados");
      }

      const data = await response.json();
      setLeads(data.leads);
      calculateStats(data.leads);
      setIsAuthenticated(true);
      setShowModal(false);
      setError("");
    } catch (err) {
      setError("Erro ao verificar código de acesso");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leads: WhatsAppLead[]) => {
    const uniqueWhatsapps = new Set(leads.map(lead => lead.whatsapp));
    const total = leads.length;
    const unique = uniqueWhatsapps.size;
    const duplicates = total - unique;

    setStats({
      total,
      unique,
      duplicates
    });
  };

  const exportToCSV = () => {
    const headers = ["ID", "WhatsApp", "Data de Criação", "Status"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => [
        lead.id,
        lead.whatsapp,
        new Date(lead.createdAt).toLocaleString("pt-BR"),
        lead.checked ? "Verificado" : "Pendente"
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `whatsapp-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  // Modal de Autenticação
  if (showModal) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold mb-2">Área Administrativa</h1>
            <p className="text-neutral-400">Leads WhatsApp</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Código de Acesso
                </label>
                <input
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-green-500/50 transition-colors"
                  placeholder="Digite o código de acesso"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group bg-black border border-green-500/20 text-green-400 font-medium rounded-lg px-4 py-3 transition-all duration-300
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/10 before:via-green-500/20 before:to-green-500/10 
                before:translate-x-[-100%] before:hover:translate-x-0 before:transition-transform before:duration-300
                hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? "Verificando..." : "Acessar"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Área Administrativa - Leads WhatsApp</h1>
          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 text-sm text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setShowModal(true);
                setAdminToken("");
              }}
              className="px-4 py-2 text-sm text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm text-neutral-400 mb-1">Leads Únicos</h3>
            <p className="text-2xl font-bold text-green-400">{stats.unique}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm text-neutral-400 mb-1">Duplicados</h3>
            <p className="text-2xl font-bold text-red-400">{stats.duplicates}</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : error ? (
          <div className="text-red-400 py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white/5 rounded-lg">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left">Data</th>
                  <th className="p-4 text-left">WhatsApp</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/10">
                    <td className="p-4">{formatDate(lead.createdAt)}</td>
                    <td className="p-4">{lead.whatsapp}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lead.checked 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {lead.checked ? "Verificado" : "Pendente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 