"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ImersaoRedirect() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const messages = [
    "Conferindo disponibilidade de vagas...",
    "Teremos 30 vagas no Lote Promocional de R$47",
    "100 vagas no Primeiro Lote de R$197",
    "e 200 vagas no Segundo Lote de R$497",
    "Iremos conferir a disponibilidade de vagas promocionais",
    "Parabéns! Iremos redirecionar você para o site de R$47",
    "Lembrando que esse valor ser o menor já feito pode sair do ar a qualquer momento",
    "Você terá acesso a um Curso Completo para Iniciantes",
    "Planilha de Criptomoedas com potencial de subir 100x",
    "Imersão AO VIVO para conteúdos avançados"
  ];

  useEffect(() => {
    // Change messages every 3 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const next = prev + 1;
        if (next >= messages.length) {
          // Redirect after showing all messages
          clearInterval(messageInterval);
          router.push("https://pay.hotmart.com/B98993169P?off=kzqja9y1");
          return prev;
        }
        return next;
      });
    }, 3000);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 300); // Complete in about 30 seconds

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Imersão Crypto 4.0</h1>
        
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
          Aguarde enquanto preparamos sua oferta especial...
        </p>
      </div>
    </div>
  );
}
