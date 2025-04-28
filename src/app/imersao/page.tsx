"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImersaoPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"completo" | "basico" | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Imersão Crypto 4.0
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8">
            Dê seus primeiros passos no mercado de cripto utilizando as mesmas estratégias que eu uso nas minhas operações milionárias.
          </p>
          <p className="text-lg text-neutral-400 mb-12">
            O passo a passo para investir de forma rápida, segura e eficaz.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
          >
            QUERO COMEÇAR
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            De Empregado da Petz a um dos Maiores Especialistas de Criptomoedas do Brasil
          </h2>
          <p className="text-lg text-neutral-300 text-center">
            De funcionário ganhando R$600/mês a especialista em cripto que conquistou liberdade financeira.
            Minha jornada começou com dúvidas e medos, mas hoje compartilho o conhecimento que me transformou
            em um dos maiores especialistas do mercado brasileiro.
          </p>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Mas antes, me responde uma coisa...
          </h2>
          <div className="space-y-6 mb-12">
            <p className="text-xl">
              Você já pensou em investir em criptomoedas, mas tem medo de perder dinheiro?
            </p>
            <p className="text-xl">
              Acha que esse mercado é só para quem tem muito capital ou é especialista?
            </p>
            <p className="text-xl">
              Gostaria de saber exatamente os princípios de quando comprar, quando vender e quais criptos escolher?
            </p>
          </div>
          <p className="text-2xl font-bold text-green-500 mb-8">
            Se respondeu "sim" para alguma dessas perguntas, o Plano Primeiros Passos é para você!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
          >
            QUERO ACESSAR AGORA
          </button>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-16 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            O que você vai aprender no Plano Primeiros Passos?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-green-500 mr-4">✅</span>
              <p className="text-lg">Como funciona o mercado cripto e como dar os primeiros passos com segurança</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-4">✅</span>
              <p className="text-lg">Como criar um portfólio inteligente e reduzir riscos</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-4">✅</span>
              <p className="text-lg">Como evitar os maiores erros que fazem os iniciantes perderem dinheiro</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-4">✅</span>
              <p className="text-lg">O passo a passo para multiplicar seu capital de forma estratégica</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-4">✅</span>
              <p className="text-lg">As criptomoedas com potencial de valorização de até 1.600%</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
            >
              QUERO GARANTIR MINHA VAGA
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Resultados de Quem Já Deu os Primeiros Passos
          </h2>
          <p className="text-xl mb-12">
            Mais de 9.000 alunos já passaram pelo meu treinamento e deram seus primeiros passos lucrativos no mercado cripto!
          </p>
          {/* Add testimonials here */}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Oferta Especial: Plano Primeiros Passos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plano Completo */}
            <div className="bg-neutral-800 p-8 rounded-xl">
              <div className="text-center mb-6">
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">🔥 MAIS VENDIDO 🔥</span>
                <h3 className="text-2xl font-bold mt-4">PLANO COMPLETO</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Acesso ao Workshop ao Vivo
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gestão de Patrimônio
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Tutoriais Completos
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  300% de Cashback
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lista de Moedas com Potencial de 1600%
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Acesso Vitalício
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Todas as Atualizações
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Garantia de 7 Dias
                </li>
              </ul>
              <div className="text-center">
                <p className="text-neutral-400 line-through">De R$635,00</p>
                <p className="text-3xl font-bold">por apenas R$37,00</p>
                <p className="text-sm text-neutral-400">[PAGAMENTO ÚNICO]</p>
                <button
                  onClick={() => {
                    setSelectedPlan("completo");
                    setShowModal(true);
                  }}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full w-full transition-colors"
                >
                  QUERO O PLANO COMPLETO
                </button>
              </div>
            </div>

            {/* Plano Básico */}
            <div className="bg-neutral-800 p-8 rounded-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">PLANO BÁSICO</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Acesso ao Workshop ao Vivo
                </li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold">R$10,00</p>
                <p className="text-sm text-neutral-400">[PAGAMENTO ÚNICO]</p>
                <button
                  onClick={() => {
                    setSelectedPlan("basico");
                    setShowModal(true);
                  }}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full w-full transition-colors"
                >
                  QUERO ESSA OPÇÃO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Garantia de Risco Zero
          </h2>
          <p className="text-xl mb-8">
            7 dias para testar sem compromisso! Se dentro desse prazo você achar que o treinamento não é para você,
            basta enviar um e-mail e devolveremos 100% do seu dinheiro. Sem burocracia.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
          >
            SIM, EU QUERO COMEÇAR SEM RISCO
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Esse treinamento é para mim se eu nunca investi em criptomoedas?
              </h3>
              <p className="text-lg">
                ✅ Sim! Foi criado justamente para iniciantes que querem entrar no mercado com segurança.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Preciso ter muito dinheiro para investir?
              </h3>
              <p className="text-lg">
                ❌ Não! Você pode começar com pouco e aprender a crescer de forma estratégica.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                E se eu tiver dúvidas ao longo do treinamento?
              </h3>
              <p className="text-lg">
                ✅ Você terá acesso a tutoriais e suporte para suas dúvidas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Como funciona o cashback de 300%?
              </h3>
              <p className="text-lg">
                ✅ Você receberá créditos para utilizar em treinamentos futuros ou outras vantagens exclusivas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Por quanto tempo terei acesso ao treinamento?
              </h3>
              <p className="text-lg">
                ✅ Acesso vitalício, incluindo todas as atualizações futuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            📈 Não deixe o medo te impedir de começar!
          </h2>
          <p className="text-xl mb-12">
            Essa pode ser sua melhor decisão para construir liberdade financeira com o mercado cripto.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
          >
            COMEÇAR AGORA
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Escolha seu plano</h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  // Handle payment for complete plan
                  window.location.href = "https://pay.hotmart.com/SEU_LINK_AQUI";
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Plano Completo - R$37,00
              </button>
              <button
                onClick={() => {
                  // Handle payment for basic plan
                  window.location.href = "https://pay.hotmart.com/SEU_LINK_AQUI";
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Plano Básico - R$10,00
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
