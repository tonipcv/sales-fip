"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function IPhoneTutorial() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-xl"
            priority
          />
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
            Tutorial de Instalação para iPhone
          </h2>
          
          <div className="space-y-8">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4 text-neutral-200">
                1. Baixe o aplicativo agora mesmo (iPhone):
              </h3>
              <a 
                href="https://apps.apple.com/br/app/fip/id6738362588"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-all duration-200"
              >
                Baixar na App Store →
              </a>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4 text-neutral-200">
                2. Use as credenciais abaixo para acessar:
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-neutral-400 mb-1">Login:</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono bg-neutral-900 p-2 rounded border border-neutral-800 flex-grow">
                      futurostech01@gmail.com
                    </p>
                    <button
                      onClick={() => handleCopy('futurostech01@gmail.com', 'email')}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm font-medium transition-all duration-200"
                    >
                      {copiedText === 'email' ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1">Senha:</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono bg-neutral-900 p-2 rounded border border-neutral-800 flex-grow">
                      123Teste@
                    </p>
                    <button
                      onClick={() => handleCopy('123Teste@', 'password')}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm font-medium transition-all duration-200"
                    >
                      {copiedText === 'password' ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/teste-sistema"
            className="inline-block px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-200 hover:text-white transition-all duration-200"
          >
            ← Voltar para seleção
          </Link>
        </div>
      </div>
    </div>
  );
} 