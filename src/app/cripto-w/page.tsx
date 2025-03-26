"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";

function LiveContent() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cripto-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ whatsapp }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar WhatsApp");
      }

      setShowModal(false);
      setShowConfirmation(true);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            // Redirect when countdown reaches 0
            window.location.href = "https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA";
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
      // Clean up timer if component unmounts
      return () => clearInterval(timer);
    } catch (err) {
      setError("Erro ao processar WhatsApp. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEnterNow = () => {
    // Redirect to the WhatsApp group
    window.location.href = "https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA";
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

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-red-400">Encontro somente para quem estiver ao vivo</span>
              <span className="text-red-400">89%</span>
            </div>
            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 w-[89%] animate-pulse"></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-4xl font-semibold mb-6 bg-gradient-to-b from-gray-300 to-white bg-clip-text text-transparent leading-tight tracking-tight px-2">
              RECEBA O ACESSO AO APP QUE FALA A HORA CERTA DE COMPRAR E VENDER CRIPTOMOEDAS
            </h1>
            
            <p className="text-lg md:text-lg font-medium bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent mb-10 px-3 leading-relaxed">
              Liberação de acesso exclusiva para quem estiver ao vivo no dia 08/02 às 19h. Clica no botão abaixo para entrar no grupo:
            </p>
            
            {/* Button with enhanced pulsing effect */}
            <div className="mb-12 relative">
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70 blur-md animate-pulse"></div>
              
              <button 
                onClick={handleOpenModal}
                className="relative inline-block w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg px-8 py-4 text-base md:text-lg
                shadow-lg shadow-green-600/20 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-400 transition-all transform hover:scale-105 tracking-wide"
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
                      O grupo é exclusivo para quem vai participar do encontro.
                      Durante a transmissão, vamos detalhar os projetos de criptomoedas com maior potencial de lucro do dia e liberar o acesso às entradas pelo app.
                      Este encontro é limitado a um número restrito de pessoas, e a liberação será feita somente para quem estiver ao vivo.
                    </p>
                    
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setShowConfirmation(true);
                        }}
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
            
            {/* WhatsApp Modal */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-black border border-green-500/30 rounded-lg w-full max-w-md">
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-medium text-green-400 mb-3">Qual número você quer colocar no grupo:</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <input
                          type="tel"
                          id="whatsapp"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                          required
                        />
                      </div>
                      
                      {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                      )}
                      
                      <div className="flex flex-col space-y-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2.5 px-4 rounded-md font-bold text-base transition-all hover:from-green-500 hover:to-emerald-400 shadow-lg shadow-green-600/30 hover:shadow-green-500/50 transform hover:scale-105 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Processando..." : "ENVIAR"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {/* Countdown Modal */}
            {countdown < 10 && (
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
