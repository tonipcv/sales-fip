"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  hotmartEmail: string;
  purchaseEmail: string;
  whatsapp: string;
  instagram: string;
  marketingMethod: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  approved: boolean;
}

interface PartnerData {
  partners: Partner[];
  stats: {
    total: number;
    approved: number;
    pending: number;
  };
}

export default function PartnersAdmin() {
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("admin_token");
      
      if (!storedToken) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/partners", {
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

        const partnerData = await response.json();
        setData(partnerData);
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

  const handleApproval = async (id: string, approved: boolean) => {
    setUpdating(id);
    
    const storedToken = localStorage.getItem("admin_token");
    if (!storedToken) {
      router.push("/admin/login");
      return;
    }

    try {
      const response = await fetch("/api/admin/partners", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": storedToken
        },
        body: JSON.stringify({ id, approved })
      });

      if (response.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao atualizar parceiro");
      }

      // Atualiza os dados localmente
      setData(prevData => {
        if (!prevData) return null;
        
        const updatedPartners = prevData.partners.map(partner => 
          partner.id === id ? { ...partner, approved } : partner
        );
        
        const approvedCount = updatedPartners.filter(partner => partner.approved).length;
        
        return {
          partners: updatedPartners,
          stats: {
            total: prevData.stats.total,
            approved: approvedCount,
            pending: prevData.stats.total - approvedCount
          }
        };
      });
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    } finally {
      setUpdating(null);
    }
  };

  const toggleExpandPartner = (id: string) => {
    if (expandedPartner === id) {
      setExpandedPartner(null);
    } else {
      setExpandedPartner(id);
    }
  };

  // Function to export data to CSV
  const exportToCSV = () => {
    if (!data || !data.partners || data.partners.length === 0) return;
    
    const headers = [
      "Nome", 
      "Email Hotmart", 
      "Email de Compra", 
      "WhatsApp", 
      "Instagram", 
      "Método de Marketing",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Data",
      "Status"
    ];
    
    const csvHeader = headers.join(',');
    
    const csvRows = data.partners.map(partner => {
      const name = partner.name.replace(/"/g, '""');
      const hotmartEmail = partner.hotmartEmail.replace(/"/g, '""');
      const purchaseEmail = partner.purchaseEmail.replace(/"/g, '""');
      const whatsapp = partner.whatsapp.replace(/"/g, '""');
      const instagram = partner.instagram.replace(/"/g, '""');
      const marketingMethod = partner.marketingMethod.replace(/"/g, '""');
      const utm_source = partner.utm_source || "";
      const utm_medium = partner.utm_medium || "";
      const utm_campaign = partner.utm_campaign || "";
      const date = formatDate(partner.createdAt);
      const status = partner.approved ? "Aprovado" : "Pendente";
      
      return [
        `"${name}"`, 
        `"${hotmartEmail}"`, 
        `"${purchaseEmail}"`, 
        `"${whatsapp}"`,
        `"${instagram}"`,
        `"${marketingMethod}"`,
        `"${utm_source}"`,
        `"${utm_medium}"`,
        `"${utm_campaign}"`,
        `"${date}"`,
        `"${status}"`
      ].join(',');
    }).join('\n');
    
    const csvContent = `${csvHeader}\n${csvRows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `parceiros.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <h1 className="text-2xl font-bold">Gerenciamento de Parceiros</h1>
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
                <h3 className="text-sm text-neutral-400 mb-1">Total de Parceiros</h3>
                <p className="text-2xl font-bold text-white">{data?.stats.total || 0}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm text-neutral-400 mb-1">Aprovados</h3>
                <p className="text-2xl font-bold text-green-400">{data?.stats.approved || 0}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm text-neutral-400 mb-1">Pendentes</h3>
                <p className="text-2xl font-bold text-yellow-400">{data?.stats.pending || 0}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Lista de Parceiros</h2>
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
                    <th className="p-4 text-left">Nome</th>
                    <th className="p-4 text-left">Email Hotmart</th>
                    <th className="p-4 text-left">WhatsApp</th>
                    <th className="p-4 text-left">Instagram</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.partners.map((partner) => (
                    <>
                      <tr 
                        key={partner.id} 
                        className="border-b border-white/10 cursor-pointer hover:bg-white/5"
                        onClick={() => toggleExpandPartner(partner.id)}
                      >
                        <td className="p-4 text-neutral-300">{formatDate(partner.createdAt)}</td>
                        <td className="p-4 text-neutral-300">{partner.name}</td>
                        <td className="p-4 text-neutral-300">{partner.hotmartEmail}</td>
                        <td className="p-4 text-neutral-300">{partner.whatsapp}</td>
                        <td className="p-4 text-neutral-300">{partner.instagram}</td>
                        <td className="p-4 text-neutral-300">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            partner.approved 
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {partner.approved ? 'Aprovado' : 'Pendente'}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-300">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproval(partner.id, true);
                              }}
                              disabled={partner.approved || updating === partner.id}
                              className={`p-2 rounded hover:bg-green-900/30 text-green-400 ${
                                partner.approved || updating === partner.id 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : ''
                              }`}
                              title="Aprovar"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproval(partner.id, false);
                              }}
                              disabled={!partner.approved || updating === partner.id}
                              className={`p-2 rounded hover:bg-red-900/30 text-red-400 ${
                                !partner.approved || updating === partner.id 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : ''
                              }`}
                              title="Rejeitar"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedPartner === partner.id && (
                        <tr className="bg-black/30">
                          <td colSpan={7} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-white mb-2">Email de Compra</h4>
                                <p className="text-neutral-400">{partner.purchaseEmail}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-white mb-2">Instagram</h4>
                                <p className="text-neutral-400">@{partner.instagram}</p>
                              </div>
                              <div className="md:col-span-2">
                                <h4 className="text-sm font-medium text-white mb-2">Método de Marketing</h4>
                                <p className="text-neutral-400 whitespace-pre-wrap">{partner.marketingMethod}</p>
                              </div>
                              {partner.utm_source && (
                                <div>
                                  <h4 className="text-sm font-medium text-white mb-2">UTM Source</h4>
                                  <p className="text-neutral-400">{partner.utm_source}</p>
                                </div>
                              )}
                              {partner.utm_medium && (
                                <div>
                                  <h4 className="text-sm font-medium text-white mb-2">UTM Medium</h4>
                                  <p className="text-neutral-400">{partner.utm_medium}</p>
                                </div>
                              )}
                              {partner.utm_campaign && (
                                <div>
                                  <h4 className="text-sm font-medium text-white mb-2">UTM Campaign</h4>
                                  <p className="text-neutral-400">{partner.utm_campaign}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  {!data?.partners.length && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-neutral-400">
                        Nenhum parceiro encontrado.
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