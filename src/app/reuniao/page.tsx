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
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(true);

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

  // Hide WhatsApp button after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsAppButton(false);
    }, 120000); // 2 minutes in milliseconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-montserrat bg-black text-white min-h-screen relative overflow-hidden">

      {/* Add padding to account for fixed header */}
      <div className="pt-[88px]">
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Language Selector */}
         

          {/* Logo and meeting completion text */}
          <div className="flex flex-col items-center justify-center mt-6 mb-4">
            <Image 
              src="/logo.jpg" 
              alt="Logo" 
              width={150} 
              height={75} 
              className="mb-4"
            />
            <p className="text-center text-sm md:text-base text-gray-300 max-w-2xl mx-auto px-4">
              Reunião Finalizada: Assista o Vídeo Ter Acesso a Liberação do Futuros Tech
            </p>
            
            {/* Progress bar - 88% filled */}
            <div className="w-full max-w-md mx-auto mt-4 mb-1 px-4">
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gray-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">88%</p>
            </div>
          </div>

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

          {/* WhatsApp button that disappears after 2 minutes */}
          {showWhatsAppButton && (
            <a 
              href="/whatsapp-desafio" 
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 256 258" className="text-white">
                <defs>
                  <linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#1FAF38"/>
                    <stop offset="100%" stopColor="#60D669"/>
                  </linearGradient>
                  <linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#F9F9F9"/>
                    <stop offset="100%" stopColor="#FFF"/>
                  </linearGradient>
                </defs>
                <path fill="#fff" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/>
                <path fill="#fff" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"/>
                <path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}