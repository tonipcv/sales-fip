"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WhatsAppBio() {
  const router = useRouter();

  useEffect(() => {
    // WhatsApp number and message
    const phoneNumber = "557391778075";
    const message = encodeURIComponent("Olá, quero conhecer os programas e tecnologias!");
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Redirecionando para o WhatsApp...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      </div>
    </div>
  );
} 