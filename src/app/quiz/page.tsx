"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import * as fbq from '@/lib/fpixel';

export default function Quiz() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    capital: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: ''
  });

  // Função para capturar UTMs da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    
    const utmData = utmFields.reduce((acc, field) => ({
      ...acc,
      [field]: params.get(field) || ''
    }), {});

    setFormData(prev => ({
      ...prev,
      ...utmData
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Salva os dados no banco
      const response = await fetch('/api/quiz-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao salvar dados');

      // Track the form submission with UTM data
      fbq.event('Lead', {
        content_name: 'quiz_submission',
        currency: 'BRL',
        value: 0,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign
      });

      // Redirect to the promotional page
      window.location.href = '/desconto';
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
      {/* Language Selector */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <Globe className="h-3 w-3" />
          {language.toUpperCase()}
        </button>
      </div>

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
          
          <div className="max-w-3xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-xl md:rounded-2xl p-6 md:p-8">
              <span className="inline-block px-3 md:px-4 py-1 bg-green-500/10 text-green-400 text-xs md:text-sm rounded-full border border-green-500/20 mb-4 md:mb-6">
                {language === 'pt' ? 'Curso 100% Gratuito' : 'Free Course'}
              </span>
              
              <h2 className="text-xl md:text-3xl font-light mb-4 md:mb-6 text-white/90">
                {language === 'pt' 
                  ? '10.000% de Valorização no Mercado de Criptomoedas Começando do Zero' 
                  : '10.000% of Cryptocurrency Market Value Starting from Zero'}
              </h2>
            </div>
          </div>

          {/* Formulário Simplificado */}
          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-2xl font-light mb-6 md:mb-8 text-center text-white/90">
              {language === 'pt'
                ? 'Preencha seus dados para receber acesso'
                : 'Fill in your details to receive access'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === 'pt' ? "Seu nome completo" : "Your full name"}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === 'pt' ? "Seu melhor e-mail" : "Your best email"}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder={language === 'pt' ? "Seu WhatsApp" : "Your WhatsApp"}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />

                <select
                  name="capital"
                  value={formData.capital}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-neutral-800 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none"
                >
                  <option value="" disabled>
                    {language === 'pt' ? "Capital para investir" : "Investment capital"}
                  </option>
                  <option value="0">
                    {language === 'pt' ? "Não tenho nada!" : "I have nothing!"}
                  </option>
                  <option value="1000-5000">
                    {language === 'pt' ? "Entre 1.000 e 5.000" : "Between 1,000 and 5,000"}
                  </option>
                  <option value="5000-50000">
                    {language === 'pt' ? "Entre 5 mil e 50 mil" : "Between 5k and 50k"}
                  </option>
                  <option value="50000+">
                    {language === 'pt' ? "Acima de 50 mil" : "Above 50k"}
                  </option>
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
                  {language === 'pt' 
                    ? 'Receber Acesso ao Curso Gratuito' 
                    : 'Get Free Course Access'}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1),transparent_70%)]"></div>
                </div>
              </button>
            </form>
          </div>

          <p className="text-xs md:text-sm text-neutral-400 mt-6 md:mt-8 max-w-[90%] md:max-w-md mx-auto">
            {language === 'pt'
              ? 'Seus dados estão seguros e você receberá o acesso ao curso imediatamente após o cadastro.'
              : 'Your data is secure and you will receive course access immediately after registration.'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">
          Futuros Tech - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
