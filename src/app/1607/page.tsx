"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function WhatsAppRedirect() {
  useEffect(() => {
    // Redirect after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://chat.whatsapp.com/IaqTe21ft9H1vApGem7psJ";
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8 md:mb-12 w-24 md:w-32"
          />
          
          {/* Loading Text */}
          <h3 className="text-xl md:text-2xl font-light text-white/90 mb-8">
            Redirecionando para o grupo...
          </h3>

          {/* Loading Animation */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">
          Futuros Tech
        </p>
      </footer>
    </div>
  );
} 