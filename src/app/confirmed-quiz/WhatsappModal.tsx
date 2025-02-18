"use client";

import { useState } from 'react';

interface WhatsappModalProps {
  onClose: () => void;
}

export default function WhatsappModal({ onClose }: WhatsappModalProps) {
  const [prefix, setPrefix] = useState('+55');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Removida a formatação específica do Brasil
  const handleWhatsappChange = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    setWhatsapp(numbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação mais flexível para números internacionais
    if (!whatsapp || whatsapp.length < 6) { // Mínimo de 6 dígitos para números internacionais
      setError('Por favor, insira um número válido');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          whatsapp: `${prefix}${whatsapp}`,
          source: 'encerrado',
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-neutral-900 to-black p-8 rounded-2xl border border-neutral-800/50 shadow-2xl">
        {!success ? (
          <>
            {/* Header com destaque */}
            <div className="text-center mb-8">
              <div className="inline-block bg-red-500/10 backdrop-blur-sm border border-red-500/20 px-4 py-1 rounded-full">
                <span className="text-sm font-medium text-red-400">
                  Vagas Encerradas
                </span>
              </div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent mt-4">
                Lista de Espera
              </h1>
              <p className="text-neutral-400 text-sm mt-2 max-w-sm mx-auto">
                Cadastre seu WhatsApp para ser notificado quando novas vagas com bônus estiverem disponíveis
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="w-20 bg-black/50 border border-neutral-800 rounded-xl px-3 py-3.5 text-sm text-white text-center focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700"
                    maxLength={4}
                  />
                  <div className="absolute -top-2.5 left-3 px-2 bg-neutral-900">
                    <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                      País
                    </span>
                  </div>
                </div>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => handleWhatsappChange(e.target.value)}
                    placeholder="Digite seu número"
                    className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-base text-white text-center focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 font-medium tracking-wide"
                  />
                  <div className="absolute -top-2.5 left-3 px-2 bg-neutral-900">
                    <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                      WhatsApp
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-4 text-sm font-medium transition-all disabled:opacity-50 group relative overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="relative text-sm font-medium tracking-wider text-white/90">
                  {loading ? 'Processando...' : 'ENTRAR NA LISTA DE ESPERA'}
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-green-400 mb-3">
              Cadastro Confirmado!
            </h2>
            <p className="text-neutral-300 text-sm">
              Você será notificado quando houver disponibilidade.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 