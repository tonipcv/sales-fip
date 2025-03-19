"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallDeliberacao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    os: '',
    meta: ''
  });

  useEffect(() => {
    // Pegar parâmetros da URL
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const os = searchParams.get('os');
    const meta = searchParams.get('meta');

    // Se todos os parâmetros necessários estiverem presentes
    if (name && email && os && meta) {
      const data = { name, email, os, meta };
      setFormData(data);
      
      // Enviar o formulário automaticamente
      fetch('/api/call-liberacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          router.push('/calldeliberacao/confirmacao');
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/call-liberacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao salvar dados');

      router.push('/calldeliberacao/confirmacao');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Hero Section */}
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
            Agendamento de Liberação de Acesso
          </span>

          {/* Formulário */}
          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-2xl font-light mb-6 md:mb-8 text-center text-white/90">
              Preencha seus dados:
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email usado na compra"
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />

                <select
                  name="os"
                  value={formData.os}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none"
                >
                  <option value="" disabled>Sistema Operacional</option>
                  <option value="android">Android</option>
                  <option value="iphone">iPhone</option>
                </select>

                <select
                  name="meta"
                  value={formData.meta}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none"
                >
                  <option value="" disabled>Meta de lucro com app</option>
                  <option value="10k">10 mil/mês</option>
                  <option value="50k">50 mil/mês</option>
                  <option value="100k">100 mil/mês</option>
                  <option value="100k+">Mais de 100 mil</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full relative overflow-hidden group bg-black border border-green-500/20 text-green-400 font-medium rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base transition-all duration-300
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/10 before:via-green-500/20 before:to-green-500/10 
                before:translate-x-[-100%] before:hover:translate-x-0 before:transition-transform before:duration-300
                hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              >
                <span className="relative z-10">
                  Confirmar Inscrição
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1),transparent_70%)]"></div>
                </div>
              </button>
            </form>
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