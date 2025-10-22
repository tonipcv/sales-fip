"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { countries } from "@/lib/countries";

function IndicacoesPageContent() {
  const router = useRouter();
  const search = useSearchParams();
  const indicacaoQuery = search.get("indicacao") || "";

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [indicacao, setIndicacao] = useState(indicacaoQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(
    countries.find(c => c.code === 'BR') || countries[0]
  );

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (selectedCountry.code !== 'BR') {
      return digits.slice(0, 20); // internacional sem máscara (permitir maior)
    }
    const br = digits.slice(0, 11);
    if (br.length <= 2) return br;
    if (br.length <= 7) return `(${br.slice(0, 2)}) ${br.slice(2)}`;
    return `(${br.slice(0, 2)}) ${br.slice(2, 7)}-${br.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const digits = whatsapp.replace(/\D/g, "");
      const dialDigits = selectedCountry.dial.replace(/\D/g, '');
      const fullDigits = digits.startsWith(dialDigits) ? digits : `${dialDigits}${digits}`;

      const res = await fetch("/api/membros-teste-automacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp: fullDigits, indicacao }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar. Tente novamente.");
      }
      const data = await res.json();
      const repeated = data?.meta?.alreadyReferred || data?.meta?.referralExisted;
      if (repeated) {
        try { alert('Cadastro já registrado em indicações. Vamos te redirecionar para o grupo.'); } catch {}
      }
      // Redireciona para o grupo do WhatsApp em ambos os casos
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
              <div className="flex gap-2">
                <select
                  aria-label="País"
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700"
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const c = countries.find(x => x.code === e.target.value) || countries[0]
                    setSelectedCountry(c)
                    setWhatsapp("")
                  }}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>
                  ))}
                </select>
                <input
                  id="whatsapp"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                  required
                  placeholder={selectedCountry.code === 'BR' ? "(00) 00000-0000" : "Somente números"}
                  maxLength={selectedCountry.code === 'BR' ? 15 : 20}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700"
                />
              </div>
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
