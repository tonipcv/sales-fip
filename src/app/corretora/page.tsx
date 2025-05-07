"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CorretoraRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately
    window.location.href = "https://partner.bybit.com/b/126541";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Redirecionando...</h1>
        <p className="text-xl text-green-400 mb-8">Você será redirecionado para a corretora em instantes</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      </div>
    </div>
  );
} 