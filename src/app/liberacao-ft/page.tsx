"use client";

import Link from "next/link";
import { Suspense } from "react";

function LiberacaoFTContent() {
  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Main Content */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-xl mb-6 text-center text-white">
              Olá! Vamos seguir com a liberação do seu acesso.
            </h1>
            
            <div className="space-y-3 text-white/80">
              <p>1️⃣ Acesse a App Store e procure por "Futuros Tech".</p>
              <p>2️⃣ Você encontrará nosso aplicativo com o nome FIP. Baixe e instale.</p>
              <p>3️⃣ Crie uma conta nova na parte de login.</p>
              <p>4️⃣ Após criar a conta, envie para mim o e-mail utilizado no cadastro.</p>
              <p>5️⃣ Após terminarmos a liberação do acesso premium para você do e-mail cadastrado, iremos te da um ok e pedimos para mandar uma última verificação final</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/70 mb-4">
              Entre em contato com time de liberação clicando no botão abaixo para acelerar o seu processo:
            </p>
            
            <Link 
              href={`https://wa.me/5573991778075`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto bg-green-600 text-white font-medium rounded px-6 py-3 text-sm transition-all
              hover:bg-green-500"
            >
              CLIQUE AQUI PARA ENTRAR EM CONTATO COM TIME DE LIBERAÇÃO
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-neutral-600 text-xs">
          Futuros Tech
        </p>
      </footer>
    </div>
  );
}

// Componente principal com Suspense
export default function LiberacaoFT() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </div>
    }>
      <LiberacaoFTContent />
    </Suspense>
  );
}
