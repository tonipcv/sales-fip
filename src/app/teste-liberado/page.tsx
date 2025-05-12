"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from 'react-hot-toast';

export default function TesteLiberadoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    operatingSystem: "iphone"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/test-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Show success message
      toast.success('Cadastro realizado com sucesso!');
      
      // Redirect to video page
      router.push("/teste-liberado/video");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-xl"
            priority
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              placeholder="Digite seu melhor e-mail"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              placeholder="(00) 00000-0000"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Operating System Select */}
          <div>
            <label htmlFor="operatingSystem" className="block text-sm font-medium text-white mb-2">
              Sistema Operacional
            </label>
            <select
              id="operatingSystem"
              name="operatingSystem"
              required
              value={formData.operatingSystem}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
              <option value="iphone">iPhone</option>
              <option value="android">Android</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-3.5 font-medium transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.3)] disabled:opacity-50 mt-8"
          >
            {isLoading ? "Processando..." : "Acessar Teste"}
          </button>
        </form>

        <p className="text-xs text-neutral-400 text-center mt-6 mb-8">
          Seus dados estão seguros e não serão compartilhados.
        </p>

        {/* Systems Image */}
        <div className="flex justify-center">
          <Image
            src="/sistemas.png"
            alt="Sistemas disponíveis"
            width={200}
            height={50}
            className="w-full max-w-[200px] h-auto"
          />
        </div>
      </div>
    </div>
  );
} 