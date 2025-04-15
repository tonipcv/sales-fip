"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function LiveContent() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    // Redirect to curso-web page
    router.push("/curso-web");
  }, [router]);
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cripto-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ whatsapp }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar WhatsApp");
      }

      setShowModal(false);
      setShowConfirmation(true);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            // Redirect when countdown reaches 0
            window.location.href = "https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA";
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
      // Clean up timer if component unmounts
      return () => clearInterval(timer);
    } catch (err) {
      setError("Erro ao processar WhatsApp. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEnterNow = () => {
    // Redirect to the WhatsApp group
    window.location.href = "https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA";
  };
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-neutral-400">Redirecionando...</p>
      </div>
    </div>
  );
}

// Componente principal com Suspense
export default function Live() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </div>
    }>
      <LiveContent />
    </Suspense>
  );
}
