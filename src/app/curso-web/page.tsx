"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UtmParams {
  utm_source: string | undefined;
  utm_medium: string | undefined;
  utm_campaign: string | undefined;
  utm_content: string | undefined;
  utm_term: string | undefined;
}

function LiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: undefined,
    utm_medium: undefined,
    utm_campaign: undefined,
    utm_content: undefined,
    utm_term: undefined
  });
  
  useEffect(() => {
    // Redirect to whatsapp-bio
    router.push("/whatsapp-bio");
    
    const params: UtmParams = {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      utm_term: searchParams.get("utm_term") || undefined
    };
    console.log('UTM params from URL:', params);
    setUtmParams(params);
  }, [searchParams, router]);

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
      // Filter out undefined UTM parameters
      const filteredUtmParams = Object.fromEntries(
        Object.entries(utmParams).filter(([_, value]) => value !== undefined)
      );
      
      console.log('Submitting data:', { whatsapp, ...filteredUtmParams });
      const response = await fetch("/api/curso-web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          whatsapp,
          ...filteredUtmParams
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit');
      }

      // Redirect to the lead page
      router.push("/curso-web-lead");
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : "Erro ao processar WhatsApp. Tente novamente.");
      setLoading(false);
    }
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
                Mentoria Gratuita Liberação de acesso exclusiva para quem estiver ao vivo na terça-feira às 20h. Clica no botão abaixo para entrar no grupo:
              </p>
              
              {/* Button with enhanced pulsing effect */}
              <div className="mb-16 relative group">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                
                <button 
                  onClick={handleOpenModal}
                  className="relative inline-block w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl px-12 py-6 text-lg md:text-xl
                  shadow-lg shadow-green-600/20 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-400 transition-all transform hover:scale-105 tracking-wide"
                >
                  Entrar no Grupo
                </button>
              </div>
              
              {/* WhatsApp Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                  <div className="bg-black border border-green-500/30 rounded-lg w-full max-w-md">
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-4">Qual número você quer colocar no grupo:</h3>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="tel"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="(00) 00000-0000"
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                            required
                          />
                        </div>
                        
                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}
                        
                        <div className="flex pt-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-md font-bold text-base transition-all hover:from-green-500 hover:to-emerald-400 shadow-lg shadow-green-600/30 hover:shadow-green-500/50 transform hover:scale-105 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? "Processando..." : "CONTINUAR"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              
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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Carregando...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
          </div>
        </div>
      </div>
    }>
      <LiveContent />
    </Suspense>
  );
}
