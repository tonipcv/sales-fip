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
  const [redirectCountdown, setRedirectCountdown] = useState(5);

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

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        if (!isModalShown) {
          setShowExitModal(true);
          setIsModalShown(true);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !isModalShown) {
        setShowExitModal(true);
        setIsModalShown(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isModalShown) {
        e.preventDefault();
        setShowExitModal(true);
        setIsModalShown(true);
        return e.returnValue = "As vagas para o Desafio estão finalizando, deseja realmente sair?";
      }
    };

    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isModalShown]);

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
      {/* Add padding to account for fixed header */}
      <div className="pt-[88px]">
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Language Selector */}
          
          {/* Video Section */}
          <div className="max-w-4xl mx-auto px-4 py-24">
            {/* Headline Text */}

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
                    BOTÃO SERÁ LIBERADO EM INSTANTES...
                  </span>
                </a>
                
              )}
            </div>
            <p className="text-center text-neutral-500 mt-9 text-xs">Assista o vídeo completo para participar do Desafio do Futuros Tech</p>
          </div>

          {/* Brokers Carousel */}
         


         
        </div>
      </div>
    </div>
  );
}