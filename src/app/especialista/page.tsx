"use client";

import Image from 'next/image';

export default function WhatsAppAlunos() {
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
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Se tiver alguma dúvida envie uma mensagem no botão abaixo:
        </p>
      </div>

      {/* WhatsApp Button */}
      <div className="w-full max-w-md px-4">
        <a
          href="https://wa.me/5573917780750"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden px-6 py-4 bg-green-600/20 backdrop-blur-sm border border-green-600/30 hover:border-green-500 rounded-lg transition-all duration-300 block"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-600/20 blur-xl group-hover:bg-green-500/30 transition-colors duration-300" />
          
          {/* Gradient line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-green-400 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
          
          {/* Button text */}
          <div className="relative flex flex-col items-center">
            <span className="text-lg font-medium tracking-wider uppercase text-green-300 group-hover:text-green-200 transition-colors duration-300">
              CLIQUE AQUI!
            </span>
            <span className="text-xs text-green-400/80 mt-2">
              (11) 97665-0763
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