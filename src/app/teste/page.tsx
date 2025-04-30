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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-medium mb-6">Seu convite foi aprovado para o teste do APP!</h1>
        
        <div className="text-5xl font-light text-green-500 my-6">
          {countdown}
        </div>
      </div>
    </div>
  );
} 