"use client";

import { BarChart, Briefcase, Book, ChevronDown, PieChart, TrendingUp } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(12);

  const months = [
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Setembro' },
    { number: 10, name: 'Outubro' },
    { number: 11, name: 'Novembro' },
    { number: 12, name: 'Dezembro' }
  ];

  const monthlyResults = {
    8: { winRate: "81.0", wins: "45/55", total: "11.917" },
    9: { winRate: "85.0", wins: "68/80", total: "13.254" },
    10: { winRate: "87.0", wins: "95/109", total: "14.122" },
    11: { winRate: "88.0", wins: "88/100", total: "15.345" },
    12: { winRate: "89.0", wins: "137/154", total: "11.917" }
  };

  const currentResults = monthlyResults[selectedMonth as keyof typeof monthlyResults];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-3xl font-light mb-4 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Transforme Seu Investimento em Resultados Concretos
          </h1>
          <p className="text-neutral-400 mb-8 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Sinais Diários com Relatórios de Alta Performance
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#planos" className="bg-white/10 backdrop-blur-sm text-white px-8 py-2 rounded-full text-sm hover:bg-white/20 transition">
              Assine Agora
            </a>
            <Link 
              href="/resultados" 
              className="border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <BarChart className="h-4 w-4" />
              Ver Resultados
            </Link>
          </div>
        </div>
      </section>

      {/* Preview dos Resultados */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Resultados Comprovados
          </h2>

          {/* Seletor de Mês */}
          <div className="flex justify-center mb-8">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-transparent border border-neutral-800 text-neutral-300 px-4 py-2 text-xs rounded-lg focus:outline-none focus:border-neutral-700"
            >
              {months.map((month) => (
                <option key={month.number} value={month.number} className="bg-black">
                  {month.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-black border border-neutral-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                <span className="text-sm text-neutral-400">Win Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">{currentResults.winRate}%</span>
                <span className="text-xs text-neutral-500">{currentResults.wins}</span>
              </div>
            </div>

            <div className="bg-black border border-neutral-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                <span className="text-sm text-neutral-400">Resultado Total</span>
              </div>
              <div className="text-2xl font-light text-white">
                +{currentResults.total}%
              </div>
            </div>

            <div className="bg-black border border-neutral-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-1">
                <BarChart className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                <span className="text-sm text-neutral-400">Total de Sinais</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">{currentResults.wins.split('/')[1]}</span>
                <span className="text-xs text-neutral-500">operações</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/resultados" 
              className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors"
            >
              <BarChart className="h-4 w-4" />
              Ver Relatório Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Por que Escolher o Futuros Tech?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <BarChart className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                Relatórios Diários
              </h3>
              <p className="text-neutral-400 text-sm">
                Relatórios com clareza absoluta para maximizar seus resultados.
              </p>
            </div>

            <div className="text-center">
              <Briefcase className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                Lucros Consistentes
              </h3>
              <p className="text-neutral-400 text-sm">
                Resultados consistentes seguindo nossos sinais.
              </p>
            </div>

            <div className="text-center">
              <Book className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                Para Todos os Níveis
              </h3>
              <p className="text-neutral-400 text-sm">
                Recomendações estratégicas para iniciantes e avançados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Escolha seu plano
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-[0.5px] border-neutral-800 p-8 rounded-lg text-center">
              <h3 className="text-sm font-light mb-8 text-neutral-400">
                Plano Semestral
              </h3>
              <div className="mb-8">
                <div className="text-sm font-light text-neutral-500">
                  6x
                </div>
                <div className="text-3xl font-light text-white">
                  R$396
                </div>
              </div>
              <ul className="text-neutral-500 text-xs space-y-3 mb-8 text-left">
                <li>✓ Acesso a sinais por 6 meses</li>
                <li>✓ Relatórios diários</li>
                <li>✓ Suporte completo</li>
              </ul>
              <a href="#" className="inline-block border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors">
                Assinar
              </a>
            </div>

            <div className="border-[0.5px] border-neutral-800 p-8 rounded-lg text-center">
              <h3 className="text-sm font-light mb-8 text-neutral-400">
                Plano Anual
              </h3>
              <div className="mb-8">
                <div className="text-sm font-light text-neutral-500">
                  12x
                </div>
                <div className="text-3xl font-light text-white">
                  R$297
                </div>
              </div>
              <ul className="text-neutral-500 text-xs space-y-3 mb-8 text-left">
                <li>✓ Tudo do plano semestral</li>
                <li>✓ Acesso por 12 meses</li>
                <li>✓ Bônus: treinamento avançado</li>
              </ul>
              <a href="#" className="inline-block border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors">
                Assinar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "O que são sinais?",
                answer: "Sinais são recomendações de compra ou venda baseadas em análises técnicas e fundamentalistas do mercado."
              },
              {
                question: "Preciso de experiência?",
                answer: "Não, nosso serviço atende tanto iniciantes quanto investidores experientes com recomendações claras."
              },
              {
                question: "Posso cancelar quando quiser?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento, com reembolso proporcional."
              },
              {
                question: "É seguro investir com as recomendações?",
                answer: "Nossas recomendações são baseadas em análises cuidadosas, mas todo investimento envolve riscos."
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-neutral-800">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex justify-between items-center py-4 text-left"
                >
                  <span className="text-sm bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      activeQuestion === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeQuestion === index && (
                  <p className="text-neutral-400 text-sm pb-4">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">Futuros Tech - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
