"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function IndicacoesPageContent() {
  const router = useRouter();
  const search = useSearchParams();
  const indicacaoQuery = search.get("indicacao") || "";

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [indicacao, setIndicacao] = useState(indicacaoQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/membros-teste-automacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp, indicacao }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar. Tente novamente.");
      }
      // Sucesso: redireciona automaticamente para o grupo do WhatsApp
      window.location.href = "https://chat.whatsapp.com/CPbdoKeaVlH37mBK55SefS?mode=wwc";
    } catch (err: any) {
      setError(err.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header (empty to keep spacing minimal) */}
      <header className="w-full pt-6" />

      {/* Form container */}
      <main className="max-w-md w-full mx-auto px-4 py-10">
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6">
          <div className="flex justify-center mb-4">
            <Image src="/logo1.png" alt="Futuros Tech" width={80} height={80} priority className="brightness-0 invert" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold text-center mb-2">
            Grupo Gratuito para Instalar Automação de Ganhos Automaticos no Mercado Internacional
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="whatsapp" className="block text-sm text-neutral-300 mb-2">WhatsApp</label>
              <input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                required
                placeholder="(00) 00000-0000"
                maxLength={15}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-60 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
            >
              {loading ? "Enviando..." : "Entrar no Grupo e Instalar a Automação Gratuita"}
            </button>
          </form>
          {indicacao && (
            <p className="text-[11px] text-neutral-500 text-center mt-4">Indicação: <span className="text-neutral-300">{indicacao}</span></p>
          )}
        </div>
      </main>
    </div>
  );
}

export default function IndicacoesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}> 
      <IndicacoesPageContent />
    </Suspense>
  );
}
