"use client";

import Image from 'next/image';

export default function WhatsAppTelegram() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Futuros Tech"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      {/* Message */}
      <div className="text-center mb-12 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-light text-white mb-6">
          Bem-vindo ao Grupo Exclusivo!
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Clique no botão abaixo para entrar no grupo do Telegram:
        </p>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl px-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/557391778075"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group relative overflow-hidden px-6 py-3 bg-green-600/20 backdrop-blur-sm border border-green-600/30 hover:border-green-500 rounded-lg transition-all duration-300"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-600/20 blur-xl group-hover:bg-green-500/30 transition-colors duration-300" />
          
          {/* Gradient line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-green-400 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
          
          {/* Button text */}
          <div className="relative flex flex-col items-center">
            <span className="text-base font-medium tracking-wider uppercase text-green-300 group-hover:text-green-200 transition-colors duration-300">
              ENTRAR NO WHATSAPP
            </span>
            <span className="text-xs text-green-400/80 mt-0.5">
              (SUPORTE EXCLUSIVO)
            </span>
          </div>
        </a>

        {/* Telegram Button */}
        <a
          href="https://t.me/+tOj6h-B6rrM0MDYx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group relative overflow-hidden px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 hover:border-blue-500 rounded-lg transition-all duration-300"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-600/20 blur-xl group-hover:bg-blue-500/30 transition-colors duration-300" />
          
          {/* Gradient line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
          
          {/* Button text */}
          <div className="relative flex flex-col items-center">
            <span className="text-base font-medium tracking-wider uppercase text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
              ENTRAR NO TELEGRAM
            </span>
            <span className="text-xs text-blue-400/80 mt-0.5">
              (GRUPO EXCLUSIVO)
            </span>
          </div>
        </a>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 text-center">
        <p className="text-neutral-500 text-xs">Futuros Tech - Todos os direitos reservados</p>
      </footer>
    </div>
  );
} 