"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import * as fbq from '@/lib/fpixel';

export default function CursoWebLead() {
  const [countdown, setCountdown] = useState(15);
  const whatsappLink = "https://chat.whatsapp.com/HUhsxJjMIHWG7pDf7uuz5T";
  
  useEffect(() => {
    // Track the webinar-abril event when page loads
    fbq.event('webinar-abril');
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (countdown === 0) {
      window.location.href = whatsappLink;
    }
  }, [countdown, whatsappLink]);
  
  const handleJoinGroup = () => {
    window.location.href = whatsappLink;
  };
  
  return (
    <div className="font-montserrat bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl" />
                <Image
                  src="/logo.jpg"
                  alt="Futuros Tech"
                  width={120}
                  height={120}
                  className="rounded-full relative z-10"
                />
              </div>
            </div>
            
            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">Inscrição confirmada com sucesso!</h2>
              <p className="text-neutral-300 text-lg mb-2">Seu acesso ao grupo foi liberado.</p>
              <p className="text-neutral-300 text-lg">Clique no botão abaixo para entrar no grupo WhatsApp.</p>
            </div>
            
            {/* Countdown Timer */}
            {countdown > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center border-2 border-green-500">
                    <span className="text-2xl font-bold text-green-400">{countdown}</span>
                  </div>
                </div>
                <p className="text-green-400 text-sm font-medium">Redirecionando em {countdown} segundos...</p>
              </div>
            )}
            
            {/* WhatsApp Button */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-70 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              <button 
                onClick={handleJoinGroup}
                className="relative inline-block w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl px-10 py-4 text-lg
                shadow-lg shadow-green-600/20 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-400 transition-all transform hover:scale-105 tracking-wide"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M17.6 6.32A7.85 7.85 0 0 0 12 4.02 7.94 7.94 0 0 0 4.06 12a7.89 7.89 0 0 0 1.5 4.65l-1.5 4.35 4.5-1.5a7.85 7.85 0 0 0 3.44.8A7.94 7.94 0 0 0 20 12a7.9 7.9 0 0 0-2.4-5.68ZM12 19.02a6.54 6.54 0 0 1-3.33-.9l-.24-.14-2.48.82.84-2.4-.16-.24a6.52 6.52 0 0 1-1.1-3.64 6.57 6.57 0 0 1 6.47-6.48 6.47 6.47 0 0 1 4.61 1.91 6.49 6.49 0 0 1 1.99 4.67 6.58 6.58 0 0 1-6.6 6.4Zm3.69-4.97c-.2-.1-1.17-.58-1.36-.64-.18-.07-.32-.1-.45.1-.13.19-.5.63-.62.76-.11.13-.23.14-.43.05A5.5 5.5 0 0 1 11 13.25a.57.57 0 0 1 .16-.77c.09-.06.19-.16.29-.24.1-.08.13-.14.2-.22.07-.1.03-.18-.02-.26-.04-.08-.43-1.04-.6-1.42-.15-.38-.31-.33-.43-.33-.11 0-.24-.02-.37-.02a.72.72 0 0 0-.52.23 2.17 2.17 0 0 0-.67 1.6A3.17 3.17 0 0 0 10 13.22a7.33 7.33 0 0 0 2.81 2.54c.37.16.68.26.9.34.39.12.73.1 1.01.06.31-.04 1.17-.48 1.33-.94.16-.46.16-.85.12-.93-.05-.07-.18-.12-.38-.21Z" 
                      fill="currentColor"
                    />
                  </svg>
                  <span>Entrar no Grupo</span>
                </div>
              </button>
            </div>
            
            {/* QR Code Section */}
            <div className="bg-white p-6 rounded-xl max-w-xs mx-auto mb-8">
              <div className="text-center mb-4">
                <p className="text-black font-medium text-sm">Ou escaneie o QR Code</p>
              </div>
              <div className="flex justify-center p-2 bg-white">
                <QRCode
                  value={whatsappLink}
                  size={200}
                  level="H"
                  className="mx-auto"
                />
              </div>
            </div>
            
            <p className="text-neutral-400 text-sm">
              Não consegue entrar? Copie e cole este link no seu navegador:
            </p>
            <p className="text-green-400 text-sm font-mono break-all mt-2">
              {whatsappLink}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-4 text-center relative z-10">
        <p className="text-neutral-600 text-sm">
          Futuros Tech
        </p>
      </footer>
    </div>
  );
} 