"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Lead {
  id: string;
  name: string;
  email: string;
  os: string;
  meta: string;
  createdAt: string;
  checked: boolean;
}

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
}

export default function AdminCallLiberacao() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/call-liberacao?admin_token=${adminToken}&page=1`
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
      setPagination(data.pagination);
      setIsAuthenticated(true);
      setShowModal(false);
      setError("");
    } catch (err) {
      setError("Erro ao verificar código de acesso");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/call-liberacao?admin_token=${adminToken}&page=${page}`
      );

      if (response.status === 401) {
        setError("Sessão expirada");
        setIsAuthenticated(false);
        setShowModal(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao carregar dados");
      }

      const data = await response.json();
      setLeads(data.leads);
      setPagination(data.pagination);
      setError("");
    } catch (err) {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
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
            <p className="text-neutral-400">Call Liberação</p>
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
          <h1 className="text-2xl font-bold">Área Administrativa - Call Liberação</h1>
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
        
        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : error ? (
          <div className="text-red-400 py-8">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 rounded-lg">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left">Data</th>
                    <th className="p-4 text-left">Nome</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">OS</th>
                    <th className="p-4 text-left">Meta</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/10">
                      <td className="p-4">{formatDate(lead.createdAt)}</td>
                      <td className="p-4">{lead.name}</td>
                      <td className="p-4">{lead.email}</td>
                      <td className="p-4">{lead.os}</td>
                      <td className="p-4">{lead.meta}</td>
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

            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${
                      pagination.currentPage === page
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 