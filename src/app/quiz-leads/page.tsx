'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, Download, CheckSquare, Square } from "lucide-react";

interface QuizLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  capital: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  createdAt: string;
  checked: boolean;
}

interface QuizStats {
  totalLeads: number;
  todayLeads: number;
  checkedLeads: number;
  conversionRate: number;
  leads?: QuizLead[];
  stats?: {
    uniqueCount: number;
    total?: number;
    checked?: number;
  };
}

const ITEMS_PER_PAGE = 10;

const fontStyles = {
  primary: 'font-satoshi tracking-[-0.03em]',
  secondary: 'font-satoshi tracking-[-0.02em] font-light'
};

export default function QuizLeadsAdmin() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (inputToken: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: inputToken }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', inputToken);
        fetchStats();
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_token');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const savedToken = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/quiz-leads', {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      });
      const data = await response.json();
      
      // Log para depuração
      console.log('Dados recebidos da API:', data);
      
      // Filtrar leads para manter apenas o mais recente de cada e-mail
      if (data.leads && Array.isArray(data.leads)) {
        const uniqueLeads = new Map<string, QuizLead>();
        
        // Para cada lead, armazena apenas o mais recente por e-mail
        data.leads.forEach((lead: QuizLead) => {
          const existingLead = uniqueLeads.get(lead.email);
          if (!existingLead || new Date(lead.createdAt) > new Date(existingLead.createdAt)) {
            uniqueLeads.set(lead.email, lead);
          }
        });
        
        // Converte o Map de volta para array
        data.leads = Array.from(uniqueLeads.values());
      }
      
      setQuizStats(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setToken('');
    router.push('/');
  };

  const toggleChecked = async (id: string, checked: boolean) => {
    try {
      const savedToken = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/quiz-leads/toggle-check', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${savedToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, checked }),
      });

      if (response.ok) {
        fetchStats(); // Recarrega os dados
      }
    } catch (error) {
      console.error('Error toggling check:', error);
    }
  };

  const exportToCSV = () => {
    if (!quizStats?.leads) return;

    // Cabeçalhos do CSV
    const headers = [
      'Nome',
      'Email',
      'WhatsApp',
      'Capital',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Content',
      'UTM Term',
      'Data',
      'Status'
    ];

    // Converter dados para linhas do CSV
    const rows = quizStats.leads.map(lead => [
      lead.name,
      lead.email,
      lead.whatsapp,
      lead.capital,
      lead.utm_source || '',
      lead.utm_medium || '',
      lead.utm_campaign || '',
      lead.utm_content || '',
      lead.utm_term || '',
      new Date(lead.createdAt).toLocaleDateString('pt-BR'),
      lead.checked ? 'Convertido' : 'Pendente'
    ]);

    // Combinar cabeçalhos e linhas
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Criar e baixar o arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-quiz-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil((quizStats?.leads?.length || 0) / ITEMS_PER_PAGE);
  const paginatedLeads = quizStats?.leads?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Função para selecionar/deselecionar todos
  const toggleSelectAll = () => {
    if (selectedLeads.size === (quizStats?.leads?.length || 0)) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(quizStats?.leads?.map(lead => lead.id) || []));
    }
  };

  // Função para selecionar/deselecionar um lead
  const toggleSelectLead = (id: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLeads(newSelected);
  };

  // Função para marcar todos selecionados como verificados
  const markSelectedAsChecked = async (checked: boolean) => {
    try {
      const savedToken = localStorage.getItem('admin_token');
      
      // Fazer requisições em paralelo para cada lead selecionado
      await Promise.all(
        Array.from(selectedLeads).map(id =>
          fetch('/api/admin/quiz-leads/toggle-check', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${savedToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, checked }),
          })
        )
      );

      // Recarregar dados e limpar seleção
      fetchStats();
      setSelectedLeads(new Set());
    } catch (error) {
      console.error('Error updating leads:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <Image
              src="/logo.jpg"
              alt="FT Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
            <h1 className={`text-2xl font-semibold text-white ${fontStyles.primary}`}>
              Quiz Leads Dashboard
            </h1>
            <p className={`text-gray-400 text-sm ${fontStyles.secondary}`}>
              Acesso restrito a administradores
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className={`w-full px-4 py-3 bg-[#111111] text-white rounded-lg border border-[#222222] focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight/50 transition-all ${fontStyles.secondary}`}
              placeholder="Token de acesso"
            />
            <button
              onClick={() => verifyToken(token)}
              disabled={isLoading}
              className={`w-full bg-highlight hover:bg-highlight-light text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${fontStyles.primary}`}
            >
              {isLoading ? 'Verificando...' : 'Acessar Dashboard'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.jpg"
                alt="FT Logo"
                width={32}
                height={32}
              />
              <div className="h-6 w-px bg-[#222222]" />
              <h1 className={`text-white font-medium ${fontStyles.primary}`}>Quiz Leads</h1>
            </div>
            <button
              onClick={handleLogout}
              className={`text-gray-400 hover:text-white text-sm transition-colors ${fontStyles.secondary}`}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total de Leads', 
              value: quizStats?.totalLeads || quizStats?.stats?.total || 0 
            },
            { 
              label: 'Leads Hoje', 
              value: quizStats?.todayLeads || 0 
            },
            { 
              label: 'Leads Verificados', 
              value: quizStats?.checkedLeads || quizStats?.stats?.checked || 0 
            },
            { 
              label: 'Taxa de Conversão', 
              value: `${((quizStats?.conversionRate || 0).toFixed(1))}%` 
            }
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111111] rounded-xl p-6">
              <p className={`text-sm text-gray-400 ${fontStyles.secondary}`}>{stat.label}</p>
              <p className={`text-2xl font-semibold text-white mt-2 ${fontStyles.primary}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-[#111111] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#222222] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className={`text-lg font-medium text-white ${fontStyles.primary}`}>Leads do Quiz</h2>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-sm text-gray-400 ${fontStyles.secondary}`}>
                  Total: {quizStats?.leads?.length || 0}
                </span>
                {quizStats?.stats?.uniqueCount && (
                  <span className={`text-sm text-gray-400 ${fontStyles.secondary}`}>
                    E-mails únicos: {quizStats.stats.uniqueCount}
                  </span>
                )}
              </div>
            </div>

            {selectedLeads.size > 0 && (
              <div className="flex items-center gap-3 py-2">
                <span className="text-sm text-gray-400">
                  {selectedLeads.size} leads selecionados
                </span>
                <button
                  onClick={() => markSelectedAsChecked(true)}
                  className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm transition-colors"
                >
                  Marcar como verificado
                </button>
                <button
                  onClick={() => markSelectedAsChecked(false)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors"
                >
                  Marcar como não verificado
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <button
                      onClick={toggleSelectAll}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {selectedLeads.size === (quizStats?.leads?.length || 0) ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>Status</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>Nome</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>Email</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>WhatsApp</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>Capital</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>UTM Source</TableHead>
                  <TableHead className={`text-gray-400 ${fontStyles.secondary}`}>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads?.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    className="border-[#222222] hover:bg-[#1A1A1A] transition-colors"
                  >
                    <TableCell>
                      <button
                        onClick={() => toggleSelectLead(lead.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {selectedLeads.has(lead.id) ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lead.checked}
                          onChange={(e) => toggleChecked(lead.id, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </TableCell>
                    <TableCell className={`text-white font-medium ${fontStyles.primary}`}>
                      {lead.name}
                    </TableCell>
                    <TableCell className={`text-gray-300 ${fontStyles.secondary}`}>{lead.email}</TableCell>
                    <TableCell className={`text-gray-300 ${fontStyles.secondary}`}>{lead.whatsapp}</TableCell>
                    <TableCell className={`text-gray-300 ${fontStyles.secondary}`}>{lead.capital}</TableCell>
                    <TableCell className={`text-gray-300 ${fontStyles.secondary}`}>{lead.utm_source || '-'}</TableCell>
                    <TableCell className={`text-gray-300 ${fontStyles.secondary}`}>
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-[#222222]">
            <Pagination>
              <PaginationContent className={`${fontStyles.secondary} flex-wrap`}>
                <PaginationItem>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={`text-gray-400 hover:text-white transition-colors ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Página anterior</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </PaginationItem>
                
                {/* Paginação melhorada com formato 1, 2, 3, ..., n-1, n */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Sempre mostrar primeira e última página
                    if (page === 1 || page === totalPages) return true;
                    
                    // Mostrar páginas próximas à atual
                    if (Math.abs(page - currentPage) <= 1) return true;
                    
                    // Não mostrar outras páginas
                    return false;
                  })
                  .map((page, index, array) => {
                    // Adicionar reticências quando há saltos na sequência
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <PaginationItem>
                            <span className="px-3 py-1.5 text-gray-500">...</span>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className={`${
                                currentPage === page 
                                  ? 'bg-highlight text-white' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    }
                    
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className={`${
                            currentPage === page 
                              ? 'bg-highlight text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                <PaginationItem>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={`text-gray-400 hover:text-white transition-colors ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Próxima página</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222222] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className={`text-sm text-gray-400 ${fontStyles.secondary}`}>
              © 2024 Futuros Tech. Todos os direitos reservados.
            </p>
            <p className={`text-sm text-gray-400 ${fontStyles.secondary}`}>
              Made by KRX
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}