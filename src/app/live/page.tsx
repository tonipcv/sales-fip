"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";

function LiveContent() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(10);
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleConfirm = () => {
    // Close the first modal and show the confirmation screen
    setShowModal(false);
    setShowConfirmation(true);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // Redirect when countdown reaches 0
          window.open("https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA", "_blank");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Clean up timer if component unmounts
    return () => clearInterval(timer);
  };
  
  const handleEnterNow = () => {
    // Redirect to the WhatsApp group
    window.open("https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA", "_blank");
  };
  
  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <section className="py-8 md:py-16 px-4 flex-grow">
        <div className="max-w-3xl mx-auto w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-4xl font-semibold mb-6 bg-gradient-to-b from-gray-300 to-white bg-clip-text text-transparent leading-tight tracking-tight px-2">
              RECEBA ACESSO AO APP QUE ESTÁ MUDANDO O MERCADO
            </h1>
            
            <p className="text-xl md:text-xl font-medium bg-gradient-to-b from-green-400 to-green-200 bg-clip-text text-transparent mb-10 px-3 leading-relaxed">
              LIBERAÇÃO DE ACESSO EXCLUSIVA PARA QUEM ESTIVER AO VIVO NO DIA 08/02 ÀS 19H
            </p>
            
            {/* Button with enhanced pulsing effect */}
            <div className="mb-12 relative">
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70 blur-md animate-pulse"></div>
              
              <button 
                onClick={handleOpenModal}
                className="relative inline-block w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-md px-6 py-4 text-base md:text-lg
                shadow-lg shadow-green-600/20 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-400 transition-all transform hover:scale-105 uppercase tracking-wide"
              >
                Entrar no Grupo
              </button>
            </div>
            
            {/* First Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
                <div className="bg-black border border-green-500/30 rounded-lg max-w-md w-full p-5 md:p-6 text-left my-auto mx-4 md:mx-auto">
                  <div className="max-h-[80vh] overflow-y-auto pb-1">
                    <h3 className="text-2xl md:text-2xl font-semibold text-green-400 mb-5">Atenção:</h3>
                    <p className="text-white mb-6 text-base md:text-base font-medium leading-relaxed">
                      Esse Aplicativo é a Tecnologia Mais Inovadora do Mercado que Manda Entradas no Mercado de Criptomoedas de Domingo a Domingo com Assertividade de até <span className="text-green-400 font-bold">20.000%</span>
                    </p>
                    <p className="text-white mb-8 text-base md:text-base font-medium leading-relaxed">
                      Deixaremos o grupo fechado e deixaremos um <span className="text-green-400 font-bold">presente exclusivo</span> para você antes da abertura, fica ligado na mensagem.
                    </p>
                    
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={handleConfirm}
                        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-md font-medium transition-all hover:from-green-500 hover:to-emerald-400 shadow-md shadow-green-600/20 hover:shadow-green-500/30"
                      >
                        Entendi!
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 py-3 px-4 rounded-md transition-colors"
                      >
                        Não entendi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Confirmation Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
                <div className="bg-black border border-green-500/30 rounded-lg max-w-md w-full p-5 md:p-6 text-left my-auto mx-4 md:mx-auto">
                  <div className="max-h-[80vh] overflow-y-auto pb-1">
                    <div className="text-center mb-6">                      
                      {/* Countdown Timer */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center border-2 border-green-500">
                          <span className="text-3xl font-bold text-green-400">{countdown}</span>
                        </div>
                      </div>
                      <p className="text-green-400 text-sm font-medium">Redirecionando em {countdown} segundos...</p>
                    </div>
                    
                    <p className="text-white mb-6 text-base md:text-base font-medium leading-relaxed text-center">
                      O link da reunião será enviado no Grupo com Material de uso do APP.
                    </p>
                    
                    <p className="text-white mb-8 text-base md:text-base font-medium leading-relaxed text-center">
                      Seu acesso foi liberado para entrar é só clicar no botão abaixo:
                    </p>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={handleEnterNow}
                        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 px-8 rounded-md font-bold text-lg transition-all hover:from-green-500 hover:to-emerald-400 shadow-lg shadow-green-600/30 hover:shadow-green-500/50 transform hover:scale-105 uppercase tracking-wider"
                      >
                        ENTRAR AGORA!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Video */}
            <div className="relative pb-[56.25%] h-0 mt-4">
              <iframe
                src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=5979f31c-e718-4f70-a44e-4003f48abbdb&autoplay=1&loop=1&muted=1"
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-neutral-600 text-xs font-light">
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </div>
    }>
      <LiveContent />
    </Suspense>
  );
}
