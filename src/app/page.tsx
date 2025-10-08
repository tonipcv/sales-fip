"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Briefcase, Book, ChevronDown, PieChart, TrendingUp, ChevronRight, Globe, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { translations } from '@/translations';
import * as fbq from '@/lib/fpixel';
import { routes } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(12);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [showProtectionModal, setShowProtectionModal] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const t = translations[language];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  // Immediate redirection
  useEffect(() => {
    router.push('/automacao-v2');
  }, [router]);

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

  useEffect(() => {
    // Inicializa a largura da janela
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualiza o autoplay baseado no layout
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev < (isMobile ? 4 : 3) ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 59, 59, 999);
      
      // Se já passou das 23:59, ajusta para o próximo dia
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const difference = target.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      } else {
        setTimeLeft('00:00:00');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if user already filled the form
    const hasFilledForm = localStorage.getItem('hasFilledForm');
    if (hasFilledForm) {
      setShowProtectionModal(false);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/protection-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Save to localStorage to prevent showing modal again
      localStorage.setItem('hasFilledForm', 'true');
      // Close the modal
      setShowProtectionModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // Format: (00) 00000-0000
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      setFormData({ ...formData, whatsapp: value });
    }
  };

  if (showProtectionModal) {
    return (
      <div className="fixed inset-0 z-50">
        {/* Dark background */}
        <div className="absolute inset-0 bg-black/95" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center p-4">
          <div className="bg-black border border-neutral-800 rounded-2xl p-8 max-w-md w-full">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.jpg"
                alt="Futuros Tech"
                width={120}
                height={120}
                className="mx-auto"
                priority
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-medium bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent mb-2">
                Infelizmente as vagas foram Encerradas
              </h2>
              <p className="text-sm text-neutral-400">
                Preencha seus dados para caso aja outra disponibilidade
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
                  placeholder="Digite seu melhor e-mail"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm text-neutral-400 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  maxLength={15}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
              >
                Entrar na Lista de Espera
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Seus dados estão seguros e não serão compartilhados.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-montserrat bg-black text-white min-h-screen relative overflow-hidden">
      {/* VIP Notice and Countdown */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-500 to-red-600 border-b border-red-400/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center">
          <div className="text-white/90 text-sm">
            <span className="font-mono">Vagas Encerradas</span>
            <span className="mx-2">•</span>
            <span className="font-mono font-bold">Acesso Indisponível</span>
          </div>
        </div>
      </div>

      {/* Add padding to account for fixed header */}
      <div className="pt-[88px]">
        {/* Content wrapper */}
        <div className="relative z-10">
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

          {/* Logo Section */}
          <div className="w-full flex justify-center pt-8">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={120}
              height={120}
              className="mx-auto"
              priority
            />
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Headline Text */}
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-light">
                <span className="text-neutral-200">Somente com uma Operação</span>{' '}
                <div className="mt-2">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent font-medium">
                      você pode fazer o{' '}
                    </span>
                    <span className="relative inline-block group">
                      <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent font-semibold">
                        Dobro do Investimento
                      </span>
                      {/* Animated underline */}
                      <div className="absolute -bottom-1 left-0 w-full h-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white to-white/40 animate-pulse" />
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute -inset-1 bg-white/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </span>
                  </span>
                </div>
              </h2>
            </div>

            <div className="relative pb-[56.25%] h-0">
              <iframe
                src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=5979f31c-e718-4f70-a44e-4003f48abbdb&autoplay=1&loop=1&muted=1"
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* CTA Button - Updated with neutral colors */}
            <div className="flex justify-center mt-8">
              <a
                href="#planos"
                className="group relative overflow-hidden px-6 py-2.5 bg-neutral-500/20 backdrop-blur-sm border border-neutral-500/30 hover:border-neutral-400 rounded-md transition-all duration-300 animate-pulse-slow"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-neutral-500/20 blur-xl group-hover:bg-neutral-400/30 transition-colors duration-300" />
                
                {/* Gradient line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-neutral-300 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
                
                {/* Button text */}
                <span className="relative text-xs font-medium tracking-wider uppercase text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                  {language === 'pt' ? 'LISTA DE ESPERA' : 'WAITLIST'}
                </span>
              </a>
            </div>
          </div>

          {/* Brokers Carousel */}
          <div className="w-full overflow-hidden py-4 bg-black/50">
            <div className="max-w-[1000px] mx-auto relative">
              {/* Desktop: fixo e centralizado */}
              <div className="hidden md:flex justify-center items-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Image
                    key={num}
                    src={`/corretora${num}.webp`}
                    alt={`Corretora ${num}`}
                    width={180}
                    height={35}
                    className="object-contain mx-4 h-[35px] w-auto"
                  />
                ))}
              </div>

              {/* Mobile: carrossel infinito */}
              <div className="flex md:hidden animate-scroll-infinite">
                {/* Primeiro conjunto */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <Image
                    key={`first-${num}`}
                    src={`/corretora${num}.webp`}
                    alt={`Corretora ${num}`}
                    width={180}
                    height={35}
                    className="object-contain mx-4 h-[25px] w-auto"
                  />
                ))}
                {/* Segundo conjunto para loop */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <Image
                    key={`second-${num}`}
                    src={`/corretora${num}.webp`}
                    alt={`Corretora ${num}`}
                    width={180}
                    height={35}
                    className="object-contain mx-4 h-[25px] w-auto"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="py-16 px-4 bg-black/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/10 via-white/5 to-neutral-800/10 blur-3xl -z-10" />
                <h1 className="text-xl md:text-2xl font-medium text-white">
                  Resultados Acima da Média
                </h1>
                <h2 className="text-lg md:text-xl mt-2 font-medium text-neutral-100/90">
                  em Tempo Recorde
                </h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto mt-4">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse" />
                </div>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-500 ease-out" 
                    style={{ 
                      transform: `translateX(-${currentTestimonial * (windowWidth <= 768 ? 50 : 33.333)}%)`
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div 
                        key={num} 
                        className="w-1/2 md:w-1/3 flex-shrink-0 px-2"
                      >
                        <Image
                          src={`/depoimento${num}.webp`}
                          alt={`Depoimento ${num}`}
                          width={400}
                          height={300}
                          className="w-full h-auto rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : windowWidth <= 768 ? 4 : 3))}
                  className="absolute -left-4 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev < (windowWidth <= 768 ? 4 : 3) ? prev + 1 : 0))}
                  className="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: windowWidth <= 768 ? 5 : 4 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview dos Resultados */}
          <section className="py-16 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                    {language === 'pt' ? 'Relatórios Comprovados' : 'Verified Results'}
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
                    <PieChart className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
                    <span className="text-sm text-neutral-400">Win Rate</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-light text-white">{currentResults.winRate}%</span>
                    <span className="text-xs text-neutral-500">{currentResults.wins}</span>
                  </div>
                </div>

                <div className="bg-black border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
                    <span className="text-sm text-neutral-400">Resultado Total</span>
                  </div>
                  <div className="text-2xl font-light text-white">
                    +{currentResults.total}%
                  </div>
                </div>

                <div className="bg-black border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
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
                Tudo que você precisa para lucrar todo dia
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Conteúdo de Alto Nível */}
                <div className="group relative p-6 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 mb-4 mx-auto relative">
                      <div className="absolute inset-0 bg-neutral-500/20 rounded-full blur-md group-hover:bg-neutral-500/30 transition-colors duration-300" />
                      <Book className="w-full h-full text-neutral-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-lg mb-3 text-center bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent font-medium">
                      Conteúdo de Alto Nível
                    </h3>
                    <p className="text-neutral-400 text-sm text-center leading-relaxed">
                      Aprenda estratégias e ferramentas mais avançadas do mercado do absoluto zero a certificação e consiga construir o seu escritório lucrativo.
                    </p>
                  </div>
                </div>

                {/* Sinais Todo Dia */}
                <div className="group relative p-6 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 mb-4 mx-auto relative">
                      <div className="absolute inset-0 bg-neutral-500/20 rounded-full blur-md group-hover:bg-neutral-500/30 transition-colors duration-300" />
                      <BarChart className="w-full h-full text-neutral-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-lg mb-3 text-center bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent font-medium">
                      Sinais Todo Dia
                    </h3>
                    <p className="text-neutral-400 text-sm text-center leading-relaxed">
                      Acesso a Tecnologia do Futuros Tech e ter acesso a sinais lucrativos de operações todo dia da semana de domingo a domingo por 1 ano.
                    </p>
                  </div>
                </div>

                {/* Suporte Especializado */}
                <div className="group relative p-6 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 mb-4 mx-auto relative">
                      <div className="absolute inset-0 bg-neutral-500/20 rounded-full blur-md group-hover:bg-neutral-500/30 transition-colors duration-300" />
                      <Briefcase className="w-full h-full text-neutral-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-lg mb-3 text-center bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent font-medium">
                      Suporte Especializado
                    </h3>
                    <p className="text-neutral-400 text-sm text-center leading-relaxed">
                      Conteúdo sem aplicação não gera resultado, tenha ao seu lado o acesso a especialistas para escalar os seus lucros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefícios Extras */}
          <section className="py-16 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                Além da Formação você terá acesso a:
              </h2>

              {/* Cards Estáticos - Ajustado para 3 colunas em todas as telas */}
              <div className="grid grid-cols-3 gap-2 md:gap-6 mb-12 overflow-x-auto">
                <div className="group relative p-2 md:p-4 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <Image
                    src="/beneficio1.webp"
                    alt="Benefício 1"
                    width={300}
                    height={580}
                    className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="group relative p-2 md:p-4 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <Image
                    src="/beneficio2.webp"
                    alt="Benefício 2"
                    width={300}
                    height={580}
                    className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="group relative p-2 md:p-4 border border-neutral-800/50 rounded-xl bg-black/30 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <Image
                    src="/beneficio3.webp"
                    alt="Benefício 3"
                    width={300}
                    height={580}
                    className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Preços e Aviso */}
              <div className="max-w-4xl mx-auto bg-black/30 border border-neutral-800/50 rounded-2xl p-8 mb-8">
                {/* Preços em formato destacado */}
                <div className="space-y-8">
                  {/* Black Book */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                    <span className="text-neutral-400 text-sm md:text-base">Black Book:</span>
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="text-neutral-400 text-sm md:text-base">De:</span>
                      <span className="line-through text-neutral-500 text-base md:text-lg">R$1.500</span>
                      <span className="text-neutral-400 text-sm md:text-base">por</span>
                      <div className="relative">
                        <span className="text-neutral-400 text-2xl md:text-4xl font-light">R$0</span>
                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-500/30 to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Futuros Tech */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                    <span className="text-neutral-400 text-sm md:text-base">1 ano de Futuros Tech:</span>
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="text-neutral-400 text-sm md:text-base">De:</span>
                      <span className="line-through text-neutral-500 text-base md:text-lg">R$2.997</span>
                      <span className="text-neutral-400 text-sm md:text-base">por</span>
                      <div className="relative">
                        <span className="text-neutral-400 text-2xl md:text-4xl font-light">R$0</span>
                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-500/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aviso */}
                <p className="text-neutral-300/80 text-sm text-center max-w-3xl mx-auto border-t border-neutral-800/50 pt-4 mt-8">
                  Atenção: O valor especial ainda está disponível, recomendamos não atualizar a página pois caso as vagas se encerre o link sairá do ar, clique em confirmar sua inscrição e finalize sua inscrição com direito a todos os bônus.
                </p>
              </div>
            </div>
          </section>

          {/* Planos */}
          <section id="planos" className="py-16 px-4 bg-black">
            <div className="max-w-5xl mx-auto">
              {/* Grid de Planos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plano Original */}
                <div className="order-2 md:order-1 border border-neutral-800/50 rounded-2xl p-8 bg-black/30 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-neutral-400">OFERTA ORIGINAL</h3>
                    <div className="mt-2 text-xs text-neutral-500">Vagas Encerradas</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Formação Completa do Zero ao Avançado <span className="block text-white/80 text-xs mt-1">(Valor Original: R$1.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Acesso a Plataforma da K17 <span className="block text-white/80 text-xs mt-1">(Valor Original: R$997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">1 ano de acesso ao Futuros Tech <span className="block text-white/80 text-xs mt-1">(Valor Original: R$2.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">BlackBook <span className="block text-white/80 text-xs mt-1">(Valor Original: R$897)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">Bônus Secreto para Caixa Rápido <span className="block text-white/80 text-xs mt-1">(Valor Original: R$4.000)</span></span>
                    </li>
                  </ul>

                  <div className="text-center pt-6 border-t border-neutral-800/30">
                    <div className="text-2xl font-light text-neutral-400">R$1.997</div>
                    <div className="text-sm text-neutral-500 mt-1">ou 12x de R$197</div>
                    <div className="text-sm text-neutral-500 mt-6">Indisponível</div>
                  </div>
                </div>

                {/* Plano Promocional */}
                <div className="order-1 md:order-2 relative border-2 border-neutral-800 rounded-2xl p-8 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm">
                  {/* Tag de Oferta */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-black/80 backdrop-blur-sm border border-white/20 px-4 py-0.5 rounded-full text-[11px] font-light text-white/90">
                      Vagas Encerradas
                    </div>
                  </div>

                  {/* Título com mais destaque */}
                  <div className="text-center mt-8 mb-8">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                      VALOR REDUZIDO
                    </h3>
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-400 bg-clip-text text-transparent mt-1">
                      + TODOS BÔNUS
                    </h3>
                    <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mt-3" />
                    
                    {/* Barra de Progresso */}
                    <div className="mt-6">
                      <div className="flex justify-between text-xs text-neutral-400 mb-2">
                        <span>Vagas Preenchidas</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Formação Completa do Zero ao Avançado <span className="block text-white/80 text-xs mt-1">(Valor Original: R$1.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Acesso a Plataforma da K17 <span className="block text-white/80 text-xs mt-1">(Valor Original: R$997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">1 ano de acesso ao Futuros Tech <span className="block text-white/80 text-xs mt-1">(Valor Original: R$2.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">BlackBook <span className="block text-white/80 text-xs mt-1">(Valor Original: R$897)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Bônus Secreto para Caixa Rápido <span className="block text-white/80 text-xs mt-1">(Valor Original: R$4.000)</span></span>
                    </li>
                  </ul>

                  {/* Preços e botão */}
                  <div className="text-center pt-6 border-t border-white/20">
                    <div className="text-neutral-400 line-through text-sm">De: R$2.997</div>
                    <div className="text-3xl font-light text-neutral-400">12x R$97,04</div>
                    <div className="text-sm text-neutral-500 mt-1">ou R$997 à vista (10% off)</div>
                    
                    {/* Botão simplificado */}
                    <div className="mt-8 mb-4 w-full">
                      <a 
                        href="https://chat.whatsapp.com/GBjqpfmRoUt4eZCjc5pQYm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-400 hover:text-neutral-300 font-medium transition-all duration-200"
                      >
                        <span className="text-sm font-medium tracking-wider">
                          LISTA DE ESPERA
                        </span>
                      </a>
                    </div>

                    <p className="text-xs text-neutral-500">P.s. Vagas esgotadas</p>
                  </div>
                </div>

                {/* Plano Após Vagas */}
                <div className="order-3 border border-neutral-800/50 rounded-2xl p-8 bg-black/30 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-neutral-400">APÓS VAGAS SE ENCERRAR</h3>
                    <div className="mt-2 text-xs text-neutral-500">Acesso Indisponível</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Formação Completa do Zero ao Avançado <span className="block text-white/80 text-xs mt-1">(Valor Original: R$1.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✓</span>
                      <span className="text-white">Acesso a Plataforma da K17 <span className="block text-white/80 text-xs mt-1">(Valor Original: R$997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">1 ano de acesso ao Futuros Tech <span className="block text-white/80 text-xs mt-1">(Valor Original: R$2.997)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">BlackBook <span className="block text-white/80 text-xs mt-1">(Valor Original: R$897)</span></span>
                    </li>
                    <li className="flex items-start gap-3 text-sm opacity-40">
                      <span className="text-neutral-400 mt-1">✕</span>
                      <span className="text-white">Bônus Secreto para Caixa Rápido <span className="block text-white/80 text-xs mt-1">(Valor Original: R$4.000)</span></span>
                    </li>
                  </ul>

                  <div className="text-center pt-6 border-t border-neutral-800/30">
                    <div className="text-2xl font-light text-neutral-400">R$2.997</div>
                    <div className="text-sm text-neutral-500 mt-1">ou 12x de R$297</div>
                    <div className="text-sm text-neutral-500 mt-6">Indisponível</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Depoimentos Adicionais */}
          <section className="py-24 px-4 bg-black/30">
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-500 ease-out" 
                    style={{ 
                      transform: `translateX(-${currentTestimonial * (windowWidth <= 768 ? 50 : 33.333)}%)`
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div 
                        key={num} 
                        className="w-1/2 md:w-1/3 flex-shrink-0 px-3"
                      >
                        <Image
                          src={`/depoimento${num}.webp`}
                          alt={`Depoimento ${num}`}
                          width={600}
                          height={450}
                          className="w-full h-auto rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : windowWidth <= 768 ? 4 : 3))}
                  className="absolute -left-4 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev < (windowWidth <= 768 ? 4 : 3) ? prev + 1 : 0))}
                  className="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: windowWidth <= 768 ? 5 : 4 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 px-4 bg-black">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-light text-center mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                    Perguntas Frequentes
              </h2>

              <div className="space-y-4">
                {[
                  {
                        question: "O que é o FIP?",
                        answer: "O FIP (Formação para Investidor Profissional) é um curso completo que leva o aluno do zero até a certificação, com conteúdo didático e liberado por etapas baseado na metodologia de investimentos de Daniel Katsu. Será revelado tudo que ele utilizou para ganhar milhões com mercado do zero ao avançado."
                      },
                  {
                    question: "O que está incluído no bônus de 1 ano do Futuros Tech?",
                    answer: "O bônus de 1 ano do Futuros Tech oferece acesso à tecnologia exclusiva que ajuda no acompanhamento e análise de mercados futuros, facilitando a tomada de decisão nas operações financeiras. A mensalidade avulsa do Futuros Tech é 500 reais ou o plano anual é 2997 e fazendo a inscrição você ganhar 1 ano de bônus. Como os membros gostam de falar – com apenas um sinal você já paga a mensalidade com lucro."
                  },
                  {
                    question: "O que é o Black Book?",
                    answer: "O Black Book é um livro exclusivo que compila estratégias e insights valiosos sobre análise gráfica em mais de 274 páginas. É realmente um manual para quem quer se especializar no mercado e está a venda avulso por 1.500 reais (k17.com.br/blackbook) mas ao fazer a inscrição no FIP você recebe a versão digital de graça."
                  },
                  {
                    question: "Qual o suporte que eu recebo durante o curso?",
                    answer: "Ao se inscrever no FIP, você terá suporte dedicado através do nosso WhatsApp e e-mail. Ao longo das semanas serão liberados conteúdos e você poderá tirar dúvida quando quiser."
                  },
                  {
                    question: "Os sinais no Futuros Tech são de Segunda a Sexta?",
                    answer: "Não, é todos os dias da semana, em média 5 sinais de operações, essa tecnologia é uma verdadeira máquina de fazer dinheiro."
                  },
                  {
                    question: "Poderei conhecer o Escritório da K17?",
                    answer: "Com certeza, quando você lucrar mais de 50 mil, uma meta básica, você poderá vim para o escritório para ter o seu reconhecimento pessoalmente e poder conhecer os nossos profissionais pessoalmente."
                  },
                  {
                    question: "E se eu não gostar do FIP?",
                    answer: "Se você não ficar completamente satisfeito em 7 dias, garantimos a devolução total do seu investimento. Basta enviar um e-mail para contato@k17.com.br e faremos o resto."
                }
                ].map((item, index) => (
                  <div key={index} className="border-b border-neutral-800">
                    <button
                      onClick={() => toggleQuestion(index)}
                          className="w-full flex justify-between items-center py-4 text-left group"
                    >
                          <span className="text-sm bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent font-medium group-hover:from-white group-hover:to-white transition-all duration-300">
                        {item.question}
                      </span>
                      <ChevronDown 
                            className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                          activeQuestion === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeQuestion === index && (
                          <p className="text-neutral-400 text-sm pb-4 leading-relaxed">
                            {item.answer}
                          </p>
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
      </div>
    </div>
  );
}