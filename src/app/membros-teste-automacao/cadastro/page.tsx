"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function CadastroMembrosAutomacaoContent() {
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
      const data = await res.json();
      const params = new URLSearchParams({
        referralCode: data.member.referralCode,
        coupon: data.coupon.code,
      });
      router.push(`/membros-teste-automacao/sucesso?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header / Logo */}
      <header className="w-full flex justify-center pt-8">
        <Image src="/logo.jpg" alt="Futuros Tech" width={120} height={120} priority className="mx-auto" />
      </header>

      {/* Form container */}
      <main className="max-w-md w-full mx-auto px-4 py-10">
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6">
          <h1 className="text-xl font-semibold text-center mb-2">Cadastro de Membros (Automação)</h1>
          <p className="text-sm text-neutral-400 text-center mb-6">Preencha seus dados para receber seu cupom e link de indicação.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-sm text-neutral-300 mb-2">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome completo"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700"
              />
            </div>

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

            <div>
              <label htmlFor="indicacao" className="block text-sm text-neutral-300 mb-2">Indicação (código ou WhatsApp) - opcional</label>
              <input
                id="indicacao"
                type="text"
                value={indicacao}
                onChange={(e) => setIndicacao(e.target.value)}
                placeholder="Código do indicado ou número (somente se tiver)"
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
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function CadastroMembrosAutomacao() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}> 
      <CadastroMembrosAutomacaoContent />
    </Suspense>
  );
}
