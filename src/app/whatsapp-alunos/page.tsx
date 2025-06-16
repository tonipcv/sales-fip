"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function WhatsAppAlunos() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 3 seconds
    const redirect = setTimeout(() => {
      window.location.href = "https://api.whatsapp.com/send/?phone=557391778075&text&type=phone_number&app_absent=0";
    }, 3000);

    // Cleanup
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

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
          Redirecionando para o WhatsApp em {countdown} segundos...
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Se não for redirecionado automaticamente, clique no botão abaixo:
        </p>
      </div>

      {/* WhatsApp Button */}
      <div className="w-full max-w-md px-4">
        <a
          href="https://api.whatsapp.com/send/?phone=557391778075&text&type=phone_number&app_absent=0"
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
              (73) 9177-8075
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