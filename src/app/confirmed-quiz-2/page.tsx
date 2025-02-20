"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import * as fbq from '@/lib/fpixel';

export default function ConfirmedQuiz2() {
  useEffect(() => {
    fbq.pageview();
  }, []);

  const steps = [
    {
      title: "Criar a Conta na Plataforma",
      description: "Acesse a plataforma exclusiva do curso"
    },
    {
      title: "Confirmar e-mail",
      description: "Valide seu acesso através do e-mail cadastrado"
    },
    {
      title: "Acessar as 6 aulas bônus",
      description: "Conteúdo exclusivo para alunos"
    },
    {
      title: "Receber a Informação Bônus",
      description: "Material complementar especial"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logo */}
      <div className="w-full flex justify-center pt-8">
        <Image
          src="/logo.jpg"
          alt="K17"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-white/90 mb-4">
            Próximos Passos
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
            Siga as etapas abaixo para ter acesso completo ao conteúdo exclusivo
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              {/* Step Number */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {step.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-green-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a 
            href="https://x.k17.com.br/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-8 py-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:border-green-400 rounded-xl transition-all duration-300"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-green-500/20 blur-xl group-hover:bg-green-400/30 transition-colors duration-300" />
            
            {/* Gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-green-300 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
            
            {/* Button text */}
            <span className="relative text-sm font-medium tracking-wider text-green-300 group-hover:text-green-200 transition-colors duration-300">
              COMEÇAR AGORA
            </span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p className="text-neutral-500 text-xs">
          Made by KRX
        </p>
      </footer>
    </div>
  );
} 