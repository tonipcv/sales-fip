"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

function LiveContent() {
  const handleEnterNow = () => {
    // Redirect to the WhatsApp group
    window.location.href = "https://chat.whatsapp.com/HUhsxJjMIHWG7pDf7uuz5T";
  };
  
  return (
    <div className="font-montserrat bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0" />
      
      {/* Main Content */}
      <div className="relative z-10">
        <section className="py-8 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                <Image
                  src="/logo.jpg"
                  alt="Futuros Tech"
                  width={140}
                  height={140}
                  className="rounded-full relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-12">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-red-400 font-medium">Vagas Gratuitas Encerrando</span>
                <span className="text-red-400 font-bold">89%</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-gray-500 w-[89%] animate-pulse rounded-full"></div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 bg-clip-text text-transparent animate-gradient">
                ALERTA DE COMPRA: APP INDICA 3 MOEDAS QUE VÃO SUBIR NO MÊS DE MAIO
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Mentoria Gratuita Liberação de acesso exclusiva para quem estiver ao vivo no dia 23/04 às 19h. Clica no botão abaixo para entrar no grupo:
              </p>
              
              {/* Button with enhanced pulsing effect */}
              <div className="mb-16 relative group">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                
                <button 
                  onClick={handleEnterNow}
                  className="relative inline-block w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl px-12 py-6 text-lg md:text-xl
                  shadow-lg shadow-green-600/20 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-400 transition-all transform hover:scale-105 tracking-wide"
                >
                  Entrar no Grupo
                </button>
              </div>
              
              {/* Video */}
              <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse" />
                <iframe
                  src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=5979f31c-e718-4f70-a44e-4003f48abbdb&autoplay=1&loop=1&muted=1"
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center relative z-10">
        <p className="text-neutral-600 text-sm font-light">
          Futuros Tech
        </p>
      </footer>
    </div>
  );
}

// Componente principal com Suspense
export default function Live() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </div>
    }>
      <LiveContent />
    </Suspense>
  );
}
