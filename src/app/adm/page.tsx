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
  count?: number; // Contagem de vezes que o número aparece
  checked: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<WhatsappLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'milionario27@') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchLeads();
    } else {
      setError('Senha incorreta');
    }
  };

  const processLeads = (leads: WhatsappLead[]) => {
    // Agrupa por número de WhatsApp
    const groupedLeads = leads.reduce((acc, lead) => {
      const key = lead.whatsapp;
      if (!acc[key]) {
        acc[key] = {
          ...lead,
          count: 1,
        };
      } else {
        // Atualiza apenas se a data for mais recente
        if (new Date(lead.createdAt) > new Date(acc[key].createdAt)) {
          acc[key] = {
            ...lead,
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
    }, {} as Record<string, WhatsappLead>);

    // Converte de volta para array e ordena por data mais recente
    return Object.values(groupedLeads).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (!response.ok) throw new Error('Erro ao carregar dados');
      const data = await response.json();
      setLeads(processLeads(data));
    } catch (err) {
      setError('Erro ao carregar os leads');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = async (whatsapp: string, checked: boolean) => {
    try {
      const response = await fetch('/api/admin/toggle-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ whatsapp, checked }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar');
      
      // Atualiza o estado local
      setLeads(leads.map(lead => 
        lead.whatsapp === whatsapp 
          ? { ...lead, checked } 
          : lead
      ));
    } catch (error) {
      console.error('Erro ao marcar lead:', error);
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
      fetchLeads();
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
          <h1 className="text-2xl font-semibold">Leads Capturados</h1>
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Data</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">WhatsApp</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Origem</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">País</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Acessos</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/50">
                  <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lead.checked}
                        onChange={(e) => toggleCheck(lead.whatsapp, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">{lead.whatsapp}</td>
                  <td className="py-3 px-4">{lead.source}</td>
                  <td className="py-3 px-4">{lead.country || '-'}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300">
                      {lead.count}x
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