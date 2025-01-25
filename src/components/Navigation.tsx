"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Settings } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-[#111]/90 backdrop-blur-sm border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 ${
              pathname === '/' ? 'text-green-100' : 'text-gray-400 hover:text-green-100'
            } transition-colors`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Início</span>
          </Link>

          <Link
            href="/resultados"
            className={`flex flex-col items-center gap-1 ${
              pathname === '/resultados' ? 'text-green-100' : 'text-gray-400 hover:text-green-100'
            } transition-colors`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs">Resultados</span>
          </Link>

          <Link
            href="/configuracoes"
            className={`flex flex-col items-center gap-1 ${
              pathname === '/configuracoes' ? 'text-green-100' : 'text-gray-400 hover:text-green-100'
            } transition-colors`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Configurações</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 