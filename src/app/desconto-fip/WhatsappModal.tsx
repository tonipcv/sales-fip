"use client";

import { useState, useEffect } from 'react';

interface WhatsappModalProps {
  isOpen: boolean;
  onSubmit: (whatsapp: string) => void;
}

// Mapa de códigos de país
const countryCodes: { [key: string]: string } = {
  BR: '+55', // Brasil
  US: '+1',  // Estados Unidos
  UK: '+44', // Reino Unido
  PT: '+351', // Portugal
  ES: '+34',  // Espanha
  FR: '+33',  // França
  DE: '+49',  // Alemanha
  IT: '+39',  // Itália
  // ... outros países conforme necessário
};

export default function WhatsappModal({ isOpen, onSubmit }: WhatsappModalProps) {
  const [prefix, setPrefix] = useState('+55');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(600); // 10 minutos em segundos

  // Detectar país do usuário
  useEffect(() => {
    async function detectCountry() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && countryCodes[countryCode]) {
          setPrefix(countryCodes[countryCode]);
        }
      } catch (error) {
        console.error('Erro ao detectar país:', error);
        // Mantém +55 como fallback
      }
    }

    detectCountry();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!whatsapp || whatsapp.length < 11) {
      setError('Por favor, insira um número válido com DDD');
      setLoading(false);
      return;
    }

    try {
      await onSubmit(`${prefix}${whatsapp}`);
    } catch (err) {
      setError('Erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-900/90 backdrop-blur-md p-6 rounded-xl border border-neutral-800 shadow-2xl">
        <h1 className="text-lg text-white font-semibold text-center mb-3 leading-tight">
          RECEBA O SEU ACESSO HOJE COM O BÔNUS DE 1 ANO DE ACESSO AO FUTUROS TECH
        </h1>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-xs text-center font-medium">
            OFERTA SE ENCERRANDO EM:
          </p>
          <p className="text-red-300 text-xl text-center font-bold mt-1">
            {formatTime(countdown)}
          </p>
        </div>

        <p className="text-neutral-300 text-xs text-center font-medium mb-4">
          PREENCHA SEU WHATSAPP E CLIQUE EM CONTINUAR:
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-16 bg-black/50 border border-neutral-800 rounded-lg px-2 py-2.5 text-sm text-white text-center focus:outline-none focus:border-neutral-700"
              maxLength={4}
            />
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
              placeholder="(00) 00000-0000"
              className="flex-1 bg-black/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 text-center"
              maxLength={11}
            />
          </div>
          {error && (
            <p className="text-red-400 text-xs mt-1 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black/50 hover:bg-black/70 text-white/90 border border-neutral-800 rounded-lg py-3 text-sm font-medium transition-all disabled:opacity-50 uppercase tracking-wider"
          >
            {loading ? 'Processando...' : 'Continuar'}
          </button>
        </form>
      </div>
    </div>
  );
} 