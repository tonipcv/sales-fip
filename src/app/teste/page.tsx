"use client";

import { useState, useEffect } from "react";

export default function TestePage() {
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "https://chat.whatsapp.com/LvoGyJyo3xo1mV4QQ5RS8d";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Redirecionando para o WhatsApp</h1>
        
        <div className="text-8xl font-bold text-green-500 mb-8">
          {countdown}
        </div>
        
        <p className="text-xl text-neutral-400">
          Você será redirecionado em {countdown} segundos...
        </p>
      </div>
    </div>
  );
} 