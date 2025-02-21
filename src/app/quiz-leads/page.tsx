'use client';

import { useState, useEffect } from 'react';
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
import { ChevronLeft, ChevronRight } from "lucide-react";

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

      if (response.ok) {
        const data = await response.json();
        setQuizStats(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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

  const totalPages = Math.ceil((quizStats?.leads?.length || 0) / ITEMS_PER_PAGE);
  const paginatedLeads = quizStats?.leads?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            { label: 'Total de Leads', value: quizStats?.totalLeads || 0 },
            { label: 'Leads Hoje', value: quizStats?.todayLeads || 0 },
            { label: 'Leads Verificados', value: quizStats?.checkedLeads || 0 },
            { label: 'Taxa de Conversão', value: `${(quizStats?.conversionRate || 0).toFixed(1)}%` }
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
          <div className="p-6 border-b border-[#222222] flex items-center justify-between">
            <h2 className={`text-lg font-medium text-white ${fontStyles.primary}`}>Leads do Quiz</h2>
            <span className={`text-sm text-gray-400 ${fontStyles.secondary}`}>
              Total: {quizStats?.leads?.length || 0}
            </span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#222222] hover:bg-transparent">
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
              <PaginationContent className={fontStyles.secondary}>
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
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}

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