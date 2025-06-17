"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function IosConfirmacao() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = `https://wa.me/5573991778075?text=${encodeURIComponent('Oi, eu sou IOS!')}`;
    }
  }, [countdown]);

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8 md:mb-12 w-24 md:w-32"
          />
          
          <span className="inline-block px-3 md:px-4 py-1 bg-green-500/10 text-green-400 text-xs md:text-sm rounded-full border border-green-500/20 mb-4 md:mb-6">
            Aplicação Confirmada
          </span>

          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8">
            <div className="space-y-4 text-center">
              <div className="text-4xl font-bold text-green-400 mb-6">
                {countdown}
              </div>
              
              <h3 className="text-xl md:text-2xl font-light text-white/90">
                Você será redirecionado para o WhatsApp em instantes...
              </h3>
              
              <div className="space-y-4 text-neutral-300 text-sm md:text-base">
                <p>
                  Entraremos em contato para liberar o acesso e oferecer um suporte personalizado!
                </p>
                
                <p>
                  Lembrando que o acesso de 1 ano será contado a partir do dia da liberação.
                </p>
                
                <p>
                  Nosso objetivo é que você tenha um ano completo de lucros e saiba utilizar o app por isso marcamos esse encontro antes.
                </p>
                
                <p className="text-green-400 font-medium">
                  Conte conosco para atingir o seu objetivo!
                </p>
                <p>
                  Atenciosamente, time Futuros Tech
                </p>
              </div>
            </div>
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