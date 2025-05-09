"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TesteRedirect() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const messages = [
    "Verificando disponibilidade...",
    "Grupo encontrado!",
    "Preparando seu acesso...",
    "Redirecionando para o grupo no WhatsApp..."
  ];

  useEffect(() => {
    // Change messages every 2 seconds (faster than other pages)
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const next = prev + 1;
        if (next >= messages.length) {
          // Redirect after showing all messages
          clearInterval(messageInterval);
          router.push("https://chat.whatsapp.com/JYwlXcEk7ZXJtDP11rZ7zN");
          return prev;
        }
        return next;
      });
    }, 2000);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100); // Complete in about 5 seconds

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Grupo VIP</h1>
        
        {/* Loading animation */}
        <div className="flex justify-center mb-12">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
        </div>
        
        {/* Current message */}
        <div className="min-h-[80px] text-center">
          <p className="text-xl md:text-2xl text-green-400">{messages[currentMessage]}</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-4 mt-8">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-center text-gray-400 mt-6 text-sm">
          Aguarde enquanto preparamos seu acesso...
        </p>
      </div>
    </div>
  );
} 