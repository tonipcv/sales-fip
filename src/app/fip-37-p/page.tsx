"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Briefcase, Book, ChevronDown, PieChart, TrendingUp, ChevronRight, Globe, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { translations } from '@/translations';
import * as fbq from '@/lib/fpixel';
import dynamic from 'next/dynamic';

const ConverteAIVideo = dynamic(() => import('@/components/ConverteAIVideo'), {
  ssr: false
});

export default function Page() {
  const router = useRouter();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(12);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const t = translations[language];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [isButtonLocked, setIsButtonLocked] = useState(true);
  const [countdown, setCountdown] = useState(350); // 5 minutes and 50 seconds in seconds
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

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
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsButtonLocked(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let pageTimer: NodeJS.Timeout;

    const startTimer = () => {
      pageTimer = setInterval(() => {
        setTimeOnPage(prev => {
          const newTime = prev + 1;
          if (newTime >= 300 && !isModalShown) {
            setShowExitModal(true);
            setIsModalShown(true);
          }
          return newTime;
        });
      }, 1000);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        if (timeOnPage >= 300 && !isModalShown) {
          setShowExitModal(true);
          setIsModalShown(true);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && timeOnPage >= 300 && !isModalShown) {
        setShowExitModal(true);
        setIsModalShown(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timeOnPage >= 300 && !isModalShown) {
        e.preventDefault();
        setShowExitModal(true);
        setIsModalShown(true);
        return e.returnValue = "As vagas para o Desafio estão finalizando, deseja realmente sair?";
      }
    };

    startTimer();
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(pageTimer);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isModalShown, timeOnPage]);

  const handleCloseModal = () => {
    setShowExitModal(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen relative overflow-hidden">
      {/* VIP Notice and Countdown */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 via-green-500 to-red-green border-b border-red-400/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center">
          <div className="text-white/90 text-sm">
            <span className="font-mono">60 vagas para o Desafio do Futuros Tech</span>
            <span className="mx-2">•</span>
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
                <span className="text-neutral-200">Assista o vídeo completo para</span>{' '}
                <div className="mt-2">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent font-medium">
                      participar do Desafio do{' '}
                    </span>
                    <span className="relative inline-block group">
                      <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent font-semibold">
                        Futuros Tech
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
              <ConverteAIVideo />
            </div>
            
            {/* CTA Button - Updated with countdown */}
            <div className="flex justify-center mt-8">
              {isButtonLocked && (
                <a
                  href="#"
                  className="group relative overflow-hidden px-6 py-2.5 bg-neutral-500/20 backdrop-blur-sm border border-neutral-500/30 rounded-md transition-all duration-300 animate-pulse-slow"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-neutral-500/20 blur-xl transition-colors duration-300" />
                  
                  {/* Gradient line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-neutral-300 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
                  
                  {/* Button text */}
                  <span className="text-sm font-medium tracking-wider uppercase text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                    EM INSTANTES...
                  </span>
                </a>
              )}
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

          {/* Footer */}
          <footer className="py-8 px-4 text-center bg-black">
            <p className="text-neutral-500 text-xs">Futuros Tech - Todos os direitos reservados</p>
          </footer>
        </div>
      </div>
    </div>
  );
}