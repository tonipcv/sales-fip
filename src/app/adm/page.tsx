"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download } from 'lucide-react';

interface WhatsappLead {
  id: string;
  whatsapp: string;
  source: string;
  country: string | null;
  createdAt: string;
  count?: number;
  checked: boolean;
}

interface WaitingListLead {
  id: string;
  whatsapp: string;
  source: string;
  createdAt: string;
  count?: number;
  checked: boolean;
}

function isWhatsappLead(item: WhatsappLead | WaitingListLead): item is WhatsappLead {
  return 'country' in item;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<WhatsappLead[]>([]);
  const [waitingList, setWaitingList] = useState<WaitingListLead[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'waiting'>('leads');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'milionario27@') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchData();
    } else {
      setError('Senha incorreta');
    }
  };

  const processLeads = <T extends WhatsappLead | WaitingListLead>(items: T[]): T[] => {
    const groupedItems = items.reduce((acc, item) => {
      const key = item.whatsapp;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
        };
      } else {
        if (new Date(item.createdAt) > new Date(acc[key].createdAt)) {
          acc[key] = {
            ...item,
            count: (acc[key]?.count || 0) + 1,
          };
        } else {
          acc[key] = {
            ...acc[key],
            count: (acc[key]?.count || 0) + 1,
          };
        }
      }
      return acc;
    }, {} as Record<string, T>);

    return Object.values(groupedItems).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const fetchData = async () => {
    try {
      const [leadsResponse, waitingResponse] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/waiting-list')
      ]);

      if (!leadsResponse.ok || !waitingResponse.ok) throw new Error('Erro ao carregar dados');
      
      const leadsData = await leadsResponse.json();
      const waitingData = await waitingResponse.json();
      
      setLeads(processLeads<WhatsappLead>(leadsData));
      setWaitingList(processLeads<WaitingListLead>(waitingData));
    } catch (err) {
      setError('Erro ao carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = async (whatsapp: string, checked: boolean, type: 'leads' | 'waiting') => {
    try {
      const endpoint = type === 'leads' ? '/api/admin/toggle-check' : '/api/admin/toggle-waiting-check';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ whatsapp, checked }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar');
      
      // Atualiza o estado local
      if (type === 'leads') {
        setLeads(leads.map(lead => 
          lead.whatsapp === whatsapp ? { ...lead, checked } : lead
        ));
      } else {
        setWaitingList(waitingList.map(item => 
          item.whatsapp === whatsapp ? { ...item, checked } : item
        ));
      }
    } catch (error) {
      console.error('Erro ao marcar item:', error);
    }
  };

  const exportToCSV = () => {
    // Cabeçalho do CSV
    const headers = ['Data', 'WhatsApp', 'Origem', 'País', 'Acessos', 'Status'];
    
    // Converte os leads para o formato CSV
    const csvData = leads.map(lead => [
      format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }),
      lead.whatsapp,
      lead.source,
      lead.country || '-',
      lead.count,
      lead.checked ? 'Verificado' : 'Pendente'
    ]);

    // Junta tudo em uma string CSV
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Cria o blob e link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${format(new Date(), 'dd-MM-yyyy')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-neutral-900/90 backdrop-blur-md p-6 rounded-xl border border-neutral-800">
          <h1 className="text-xl font-semibold text-center mb-6">
            Área Administrativa
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-black/50 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700"
              />
              {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg py-2 text-sm font-medium transition-colors"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuth');
                setIsAuthenticated(false);
              }}
              className="text-sm text-neutral-400 hover:text-white"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'leads' 
                ? 'bg-green-500 text-white' 
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Leads Capturados ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('waiting')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'waiting' 
                ? 'bg-green-500 text-white' 
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Lista de Espera ({waitingList.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                {activeTab === 'leads' && (
                  <th className="text-left py-3 px-4 text-neutral-400 font-medium">Status</th>
                )}
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Data</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">WhatsApp</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Origem</th>
                {activeTab === 'leads' && (
                  <th className="text-left py-3 px-4 text-neutral-400 font-medium">País</th>
                )}
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Acessos</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'leads' ? leads : waitingList).map((item) => (
                <tr key={item.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/50">
                  <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => toggleCheck(
                          item.whatsapp, 
                          e.target.checked, 
                          activeTab === 'leads' ? 'leads' : 'waiting'
                        )}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(item.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">{item.whatsapp}</td>
                  <td className="py-3 px-4">{item.source}</td>
                  {activeTab === 'leads' && isWhatsappLead(item) && (
                    <td className="py-3 px-4">{item.country || '-'}</td>
                  )}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300">
                      {item.count}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 