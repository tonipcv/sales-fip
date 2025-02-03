"use client";

import { BarChart, Briefcase, Book, ChevronDown, PieChart, TrendingUp, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { translations } from '@/translations';
import * as fbq from '@/lib/fpixel';

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(12);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const t = translations[language];

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

  const handleSubscribeClick = (plan: string) => {
    // Track the subscription event
    fbq.event('InitiateCheckout', {
      content_name: plan,
      currency: 'BRL',
      value: plan === 'annual' ? 297 : 405
    });
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Language Selector */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <Globe className="h-3 w-3" />
          {language.toUpperCase()}
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Área de Membros Link */}
          <div className="flex justify-end mb-4">
            <a
              href="https://ai.futurostech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              {language === 'pt' ? 'Área VIP' : 'VIP Area'}
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-3xl font-light mb-4 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          <p className="text-neutral-400 mb-8 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {t.hero.subtitle}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#planos" className="bg-white/10 backdrop-blur-sm text-white px-8 py-2 rounded-full text-sm hover:bg-white/20 transition">
              {language === 'pt' ? 'Assine Agora' : 'Subscribe Now'}
            </a>
            <Link 
              href="/resultados" 
              className="border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <BarChart className="h-4 w-4" />
              {language === 'pt' ? 'Ver Resultados' : 'View Results'}
            </Link>
          </div>
        </div>
      </section>

      {/* Preview dos Resultados */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {language === 'pt' ? 'Resultados Comprovados' : 'Verified Results'}
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
                <span className="text-sm text-neutral-400">Total de Entradas</span>
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
              {language === 'pt' ? 'Ver Relatório Completo' : 'View Full Report'}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {language === 'pt' ? 'Por que Escolher o Futuros Tech?' : 'Why Choose Futuros Tech?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <BarChart className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                {language === 'pt' ? 'Relatórios Diários' : 'Daily Reports'}
              </h3>
              <p className="text-neutral-400 text-sm">
                {language === 'pt' ? 'Relatórios com clareza absoluta para maximizar seus resultados.' : 'Relatórios with absolute clarity to maximize your results.'}
              </p>
            </div>

            <div className="text-center">
              <Briefcase className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                {language === 'pt' ? 'Lucros Consistentes' : 'Consistent Profits'}
              </h3>
              <p className="text-neutral-400 text-sm">
                {language === 'pt' ? 'Resultados consistentes seguindo nossos sinais.' : 'Consistent results following our signals.'}
              </p>
            </div>

            <div className="text-center">
              <Book className="h-6 w-6 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg mb-2 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                {language === 'pt' ? 'Para Todos os Níveis' : 'For All Levels'}
              </h3>
              <p className="text-neutral-400 text-sm">
                {language === 'pt' ? 'Recomendações estratégicas para iniciantes e avançados.' : 'Strategic recommendations for beginners and advanced users.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {language === 'pt' ? 'Escolha seu plano' : 'Choose your plan'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-[0.5px] border-neutral-800 p-8 rounded-lg text-center">
              <h3 className="text-sm font-light mb-8 text-neutral-400">
                {language === 'pt' ? 'Plano Semestral' : 'Semester Plan'}
              </h3>
              <div className="mb-8">
                <div className="text-sm font-light text-neutral-500">
                  6x
                </div>
                <div className="text-3xl font-light text-white">
                  R$405
                </div>
              </div>
              <ul className="text-neutral-500 text-xs space-y-3 mb-8 text-left">
                <li>✓ Acesso ao aplicativo por 6 meses</li>
                <li>✓ Relatórios diários</li>
                <li>✓ Suporte completo</li>
              </ul>
              <a 
                href="https://checkout.k17.com.br/subscribe/semestral-ft" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSubscribeClick('semester')}
                className="inline-block border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors"
              >
                {language === 'pt' ? 'Assinar' : 'Subscribe'}
              </a>
            </div>

            <div className="relative border-[0.5px] border-green-100/20 bg-green-100/[0.02] p-8 rounded-lg text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-green-100/10 backdrop-blur-sm text-green-100 px-4 py-1 rounded-full text-xs border border-green-100/20">
                  {language === 'pt' ? 'Mais Popular' : 'Most Popular'}
                </span>
              </div>

              <h3 className="text-sm font-light mb-8 text-neutral-400">
                {language === 'pt' ? 'Plano Anual' : 'Annual Plan'}
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
              <a 
                href="https://checkout.k17.com.br/subscribe/anual-ft-promocional" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSubscribeClick('annual')}
                className="inline-block border border-neutral-800 text-neutral-300 px-6 py-2 text-xs hover:bg-white/5 transition-colors"
              >
                {language === 'pt' ? 'Assinar' : 'Subscribe'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {language === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "Como funciona o aplicativo?",
                answer: "Nosso aplicativo fornece recomendações de compra ou venda baseadas em análises técnicas e fundamentalistas do mercado."
              },
              {
                question: "Preciso de experiência?",
                answer: "Não, nosso aplicativo atende tanto iniciantes quanto investidores experientes com recomendações claras."
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
