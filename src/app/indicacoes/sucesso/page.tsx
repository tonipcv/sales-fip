"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function IndicacoesSucessoContent() {
  const search = useSearchParams();
  const referralCode = search.get("referralCode") || "";
  const coupon = search.get("coupon") || "";
  const [copied, setCopied] = useState(false);

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, []);

  const referralLink = `${baseUrl}/indicacoes?indicacao=${encodeURIComponent(referralCode)}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [referralLink]);

  const whatsappHref = "https://chat.whatsapp.com/CPbdoKeaVlH37mBK55SefS?mode=wwc";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header / Logo */}
      <header className="w-full flex justify-center pt-8">
        <Image src="/logo.jpg" alt="Futuros Tech" width={120} height={120} priority className="mx-auto" />
      </header>

      <main className="max-w-lg w-full mx-auto px-4 py-10">
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Cadastro concluído!</h1>
            <p className="text-neutral-300 text-sm">
              Seu cupom foi gerado e seu link de indicação está pronto para compartilhar.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <p className="text-sm text-neutral-400">Seu cupom</p>
            <p className="text-xl font-bold text-green-400 select-all">{coupon}</p>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
          >
            Entrar no grupo
          </a>

          <div className="space-y-2">
            <p className="text-sm text-neutral-300">Seu link de indicação</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={referralLink}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 bg-neutral-800 hover:bg-neutral-700 rounded-lg px-3 py-2 text-xs"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            Compartilhe seu link com amigos. Quando eles se cadastrarem, registraremos sua indicação.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function IndicacoesSucessoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}> 
      <IndicacoesSucessoContent />
    </Suspense>
  );
}
