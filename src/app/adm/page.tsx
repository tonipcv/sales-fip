"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WhatsappLead {
  id: string;
  whatsapp: string;
  source: string;
  country: string | null;
  createdAt: string;
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

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (!response.ok) throw new Error('Erro ao carregar dados');
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError('Erro ao carregar os leads');
    } finally {
      setLoading(false);
    }
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Data</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">WhatsApp</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Origem</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">País</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/50">
                  <td className="py-3 px-4">
                    {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">{lead.whatsapp}</td>
                  <td className="py-3 px-4">{lead.source}</td>
                  <td className="py-3 px-4">{lead.country || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 