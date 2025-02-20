"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Loader2 } from "lucide-react";
import * as fbq from '@/lib/fpixel';

export default function ConfirmedQuiz() {
  const [showButton, setShowButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 90 segundos = 1:30

  useEffect(() => {
    // Track page view
    fbq.pageview();

    // Timer para mostrar o botão após 1:30 minutos
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 90000);

    // Countdown
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Formata o tempo no formato MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logo */}
      <div className="w-full flex justify-center pt-8">
        <Image
          src="/logo.jpg"
          alt="K17"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Video Container */}
        <div className="relative pb-[56.25%] h-0 bg-neutral-900 rounded-xl overflow-hidden mb-8">
          <iframe
            src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=c689c709-5643-4fb6-be32-6f080a5f5066"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* CTA Button or Loading State */}
        <div className="flex flex-col items-center justify-center gap-4">
          {!showButton ? (
            <>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-3 text-neutral-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">
                    Aguarde {formatTime(timeLeft)} para liberar a próxima etapa
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  É necessário assistir o vídeo completo para continuar
                </p>
              </div>
              <div className="w-full max-w-xs bg-neutral-900/50 rounded-full h-1">
                <div 
                  className="bg-green-500/50 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${((90 - timeLeft) / 90) * 100}%` }}
                />
              </div>
            </>
          ) : (
            <Link 
              href="/confirmed-quiz-2"
              className="group relative overflow-hidden px-8 py-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:border-green-400 rounded-xl transition-all duration-300 animate-fade-in"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-green-500/20 blur-xl group-hover:bg-green-400/30 transition-colors duration-300" />
              
              {/* Gradient line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-green-300 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
              
              {/* Button text */}
              <span className="relative text-sm font-medium tracking-wider text-green-300 group-hover:text-green-200 transition-colors duration-300">
                CONTINUAR PARA A PRÓXIMA ETAPA
              </span>
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p className="text-neutral-500 text-xs">
          Made by KRX
        </p>
      </footer>
    </div>
  );
} 