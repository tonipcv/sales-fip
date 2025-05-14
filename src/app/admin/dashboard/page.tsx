"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  os: string;
  meta: string;
  createdAt: string;
  checked: boolean;
}

interface WhatsAppLead {
  id: string;
  whatsapp: string;
  source: string;
  country?: string;
  createdAt: string;
  checked: boolean;
}

interface WaitingListLead {
  id: string;
  whatsapp: string;
  source: string;
  createdAt: string;
  checked: boolean;
}

interface QuizLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  capital: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  createdAt: string;
  checked: boolean;
}

interface ProtectionFormLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  createdAt: string;
  checked: boolean;
}

interface GiftFormLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gender?: string;
  age?: string;
  market_level?: string;
  net_worth?: string;
  is_premium: boolean;
  interested: boolean;
  createdAt: string;
  checked: boolean;
}

interface CriptoWhatsappLead {
  id: string;
  whatsapp: string;
  createdAt: string;
  checked: boolean;
}

interface Partner {
  id: string;
  name: string;
  hotmartEmail: string;
  purchaseEmail: string;
  whatsapp: string;
  instagram: string;
  marketingMethod: string;
  createdAt: string;
  approved: boolean;
}

interface DashboardData {
  whatsapp: {
    leads: WhatsAppLead[];
    total: number;
    sources: [string, number][];
  };
  waitingList: {
    leads: WaitingListLead[];
    total: number;
    sources: [string, number][];
  };
  quiz: {
    leads: QuizLead[];
    total: number;
    capitalDistribution: [string, number][];
  };
  callLiberacao: {
    leads: Lead[];
    total: number;
    osDistribution: {
      android: number;
      ios: number;
    };
    metaDistribution: [string, number][];
  };
  protectionForm: {
    leads: ProtectionFormLead[];
    total: number;
    utmStats: {
      source: [string, number][];
      medium: [string, number][];
    };
  };
  giftForm: {
    leads: GiftFormLead[];
    total: number;
    stats: {
      gender: [string, number][];
      age: [string, number][];
      marketLevel: [string, number][];
      netWorth: [string, number][];
      isPremium: number;
      interested: number;
    };
  };
  criptoWhatsapp: {
    leads: CriptoWhatsappLead[];
    total: number;
    unique: number;
    duplicates: number;
  };
  partners: {
    leads: Partner[];
    total: number;
    approved: number;
    pending: number;
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [showDuplicates, setShowDuplicates] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("admin_token");
      
      if (!storedToken) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/dashboard", {
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

        const dashboardData = await response.json();
        setData(dashboardData);
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

  // Function to remove duplicates from any lead list based on whatsapp number
  const removeDuplicates = (leads: any[]) => {
    if (!leads) return [];
    
    const seen = new Set();
    return leads.filter(lead => {
      const whatsapp = lead.whatsapp;
      if (!whatsapp) return true;
      
      const normalized = whatsapp.replace(/\D/g, '');
      if (seen.has(normalized)) return false;
      
      seen.add(normalized);
      return true;
    });
  };

  // Function to export data to CSV
  const exportToCSV = (leads: any[], filename: string) => {
    if (!leads || leads.length === 0) return;
    
    const headers = Object.keys(leads[0]).filter(key => key !== 'id' && key !== 'checked');
    const csvHeader = headers.join(',');
    
    const csvRows = leads.map(lead => {
      return headers.map(header => {
        let value = lead[header] !== undefined ? lead[header] : '';
        
        // Format dates
        if (header === 'createdAt') {
          value = formatDate(value);
        }
        
        // Handle boolean values
        if (typeof value === 'boolean') {
          value = value ? 'Sim' : 'Não';
        }
        
        // Escape commas, quotes, etc.
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`;
          }
        }
        
        return value;
      }).join(',');
    }).join('\n');
    
    const csvContent = `${csvHeader}\n${csvRows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
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
            <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "whatsapp"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setActiveTab("waiting-list")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "waiting-list"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Lista de Espera
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "quiz"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab("call-liberacao")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "call-liberacao"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Call Liberação
          </button>
          <button
            onClick={() => setActiveTab("protection-form")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "protection-form"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Formulário Proteção
          </button>
          <button
            onClick={() => setActiveTab("gift-form")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "gift-form"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Formulário Gift
          </button>
          <button
            onClick={() => setActiveTab("cripto-whatsapp")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "cripto-whatsapp"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Cripto WhatsApp
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "partners"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Parceiros
          </button>
          <Link
            href="/admin/test-users"
            className="px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap text-neutral-400 hover:text-white"
          >
            Usuários de Teste
          </Link>
          <Link
            href="/admin/partners"
            className="px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap text-neutral-400 hover:text-white"
          >
            Gerenciar Parceiros
          </Link>
        </div>

        {/* Global controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={showDuplicates} 
                onChange={() => setShowDuplicates(!showDuplicates)}
                className="w-4 h-4 rounded bg-white/10 border-white/20 accent-green-500"
              />
              Mostrar números duplicados
            </label>
          </div>
          
          {activeTab === "whatsapp" && data?.whatsapp && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.whatsapp.leads : removeDuplicates(data.whatsapp.leads),
                'whatsapp-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "waiting-list" && data?.waitingList && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.waitingList.leads : removeDuplicates(data.waitingList.leads),
                'lista-espera-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "quiz" && data?.quiz && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.quiz.leads : removeDuplicates(data.quiz.leads),
                'quiz-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "call-liberacao" && data?.callLiberacao && (
            <button
              onClick={() => exportToCSV(data.callLiberacao.leads, 'call-liberacao-leads')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "protection-form" && data?.protectionForm && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.protectionForm.leads : removeDuplicates(data.protectionForm.leads),
                'protecao-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "gift-form" && data?.giftForm && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.giftForm.leads : removeDuplicates(data.giftForm.leads),
                'gift-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
          
          {activeTab === "cripto-whatsapp" && data?.criptoWhatsapp && (
            <button
              onClick={() => exportToCSV(
                showDuplicates ? data.criptoWhatsapp.leads : removeDuplicates(data.criptoWhatsapp.leads),
                'cripto-whatsapp-leads'
              )}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Exportar CSV
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : error ? (
          <div className="text-red-400 py-8">{error}</div>
        ) : (
          <>
            {activeTab === "whatsapp" && data?.whatsapp && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.whatsapp.total}</p>
                  </div>
                  {data.whatsapp.sources.map(([source, count]) => (
                    <div key={source} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-sm text-neutral-400 mb-1">{source}</h3>
                      <p className="text-2xl font-bold text-green-400">{count}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Origem</th>
                        <th className="p-4 text-left">País</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showDuplicates ? data.whatsapp.leads : removeDuplicates(data.whatsapp.leads)).map((lead) => (
                        <tr key={lead.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(lead.createdAt)}</td>
                          <td className="p-4">{lead.whatsapp}</td>
                          <td className="p-4">{lead.source}</td>
                          <td className="p-4">{lead.country || "-"}</td>
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
              </div>
            )}

            {activeTab === "waiting-list" && data?.waitingList && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.waitingList.total}</p>
                  </div>
                  {data.waitingList.sources.map(([source, count]) => (
                    <div key={source} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-sm text-neutral-400 mb-1">{source}</h3>
                      <p className="text-2xl font-bold text-green-400">{count}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Origem</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showDuplicates ? data.waitingList.leads : removeDuplicates(data.waitingList.leads)).map((lead) => (
                        <tr key={lead.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(lead.createdAt)}</td>
                          <td className="p-4">{lead.whatsapp}</td>
                          <td className="p-4">{lead.source}</td>
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
              </div>
            )}

            {activeTab === "quiz" && data?.quiz && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.quiz.total}</p>
                  </div>
                  {data.quiz.capitalDistribution.map(([capital, count]) => (
                    <div key={capital} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-sm text-neutral-400 mb-1">Capital {capital}</h3>
                      <p className="text-2xl font-bold text-green-400">{count}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">Nome</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Capital</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showDuplicates ? data.quiz.leads : removeDuplicates(data.quiz.leads)).map((lead) => (
                        <tr key={lead.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(lead.createdAt)}</td>
                          <td className="p-4">{lead.name}</td>
                          <td className="p-4">{lead.email}</td>
                          <td className="p-4">{lead.whatsapp}</td>
                          <td className="p-4">{lead.capital}</td>
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
              </div>
            )}

            {activeTab === "call-liberacao" && data?.callLiberacao && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.callLiberacao.total}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Android</h3>
                    <p className="text-2xl font-bold text-green-400">{data.callLiberacao.osDistribution.android}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">iOS/iPhone</h3>
                    <p className="text-2xl font-bold text-blue-400">{data.callLiberacao.osDistribution.ios}</p>
                  </div>
                  {data.callLiberacao.metaDistribution.map(([meta, count]) => (
                    <div key={meta} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-sm text-neutral-400 mb-1">Meta {meta}</h3>
                      <p className="text-2xl font-bold text-purple-400">{count}</p>
                    </div>
                  ))}
                </div>

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
                      {data.callLiberacao.leads.map((lead) => (
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
              </div>
            )}

            {activeTab === "protection-form" && data?.protectionForm && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.protectionForm.total}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Origem (UTM Source)</h3>
                    <div className="space-y-1">
                      {data.protectionForm.utmStats.source.map(([source, count]) => (
                        <div key={source} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{source || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Meio (UTM Medium)</h3>
                    <div className="space-y-1">
                      {data.protectionForm.utmStats.medium.map(([medium, count]) => (
                        <div key={medium} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{medium || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">Nome</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showDuplicates ? data.protectionForm.leads : removeDuplicates(data.protectionForm.leads)).map((lead) => (
                        <tr key={lead.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(lead.createdAt)}</td>
                          <td className="p-4">{lead.name}</td>
                          <td className="p-4">{lead.email}</td>
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
              </div>
            )}

            {activeTab === "gift-form" && data?.giftForm && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.giftForm.total}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Premium</h3>
                    <p className="text-2xl font-bold text-green-400">{data.giftForm.stats.isPremium}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Interessados</h3>
                    <p className="text-2xl font-bold text-blue-400">{data.giftForm.stats.interested}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Distribuição por Gênero</h3>
                    <div className="space-y-1">
                      {data.giftForm.stats.gender.map(([gender, count]) => (
                        <div key={gender} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{gender || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Distribuição por Idade</h3>
                    <div className="space-y-1">
                      {data.giftForm.stats.age.map(([age, count]) => (
                        <div key={age} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{age || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Nível de Mercado</h3>
                    <div className="space-y-1">
                      {data.giftForm.stats.marketLevel.map(([level, count]) => (
                        <div key={level} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{level || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Patrimônio Líquido</h3>
                    <div className="space-y-1">
                      {data.giftForm.stats.netWorth.map(([worth, count]) => (
                        <div key={worth} className="flex justify-between">
                          <span className="text-sm text-neutral-400">{worth || "Não definido"}</span>
                          <span className="text-sm text-green-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">Nome</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Gênero</th>
                        <th className="p-4 text-left">Idade</th>
                        <th className="p-4 text-left">Nível</th>
                        <th className="p-4 text-left">Patrimônio</th>
                        <th className="p-4 text-left">Premium</th>
                        <th className="p-4 text-left">Interessado</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showDuplicates ? data.giftForm.leads : removeDuplicates(data.giftForm.leads)).map((lead) => (
                        <tr key={lead.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(lead.createdAt)}</td>
                          <td className="p-4">{lead.name}</td>
                          <td className="p-4">{lead.email}</td>
                          <td className="p-4">{lead.whatsapp}</td>
                          <td className="p-4">{lead.gender || "-"}</td>
                          <td className="p-4">{lead.age || "-"}</td>
                          <td className="p-4">{lead.market_level || "-"}</td>
                          <td className="p-4">{lead.net_worth || "-"}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              lead.is_premium
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              {lead.is_premium ? "Sim" : "Não"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              lead.interested
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              {lead.interested ? "Sim" : "Não"}
                            </span>
                          </td>
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
              </div>
            )}

            {activeTab === "cripto-whatsapp" && data?.criptoWhatsapp && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Leads</h3>
                    <p className="text-2xl font-bold text-white">{data.criptoWhatsapp.total}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Leads Únicos</h3>
                    <p className="text-2xl font-bold text-green-400">{data.criptoWhatsapp.unique}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Duplicados</h3>
                    <p className="text-2xl font-bold text-red-400">{data.criptoWhatsapp.duplicates}</p>
                  </div>
                </div>

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
                      {(showDuplicates ? data.criptoWhatsapp.leads : removeDuplicates(data.criptoWhatsapp.leads)).map((lead) => (
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
              </div>
            )}

            {activeTab === "partners" && data?.partners && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Total de Parceiros</h3>
                    <p className="text-2xl font-bold text-white">{data.partners.total}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Aprovados</h3>
                    <p className="text-2xl font-bold text-green-400">{data.partners.approved}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-neutral-400 mb-1">Pendentes</h3>
                    <p className="text-2xl font-bold text-yellow-400">{data.partners.pending}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white/5 rounded-lg">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="p-4 text-left">Data</th>
                        <th className="p-4 text-left">Nome</th>
                        <th className="p-4 text-left">Email Hotmart</th>
                        <th className="p-4 text-left">Email de Compra</th>
                        <th className="p-4 text-left">WhatsApp</th>
                        <th className="p-4 text-left">Instagram</th>
                        <th className="p-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.partners.leads.map((partner) => (
                        <tr key={partner.id} className="border-b border-white/10">
                          <td className="p-4">{formatDate(partner.createdAt)}</td>
                          <td className="p-4">{partner.name}</td>
                          <td className="p-4">{partner.hotmartEmail}</td>
                          <td className="p-4">{partner.purchaseEmail}</td>
                          <td className="p-4">{partner.whatsapp}</td>
                          <td className="p-4">{partner.instagram}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              partner.approved 
                                ? "bg-green-500/20 text-green-400" 
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {partner.approved ? "Aprovado" : "Pendente"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 