"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, Shield, Percent } from "lucide-react";

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [countdown, setCountdown] = useState(4);
  const [quizTimer, setQuizTimer] = useState(120); // 2 minutes in seconds
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const steps = [
    {
      title: "ACESSE O DESAFIO DO FUTUROS TECH AGORA",
      subtitle: "Liberamos somente 60 vagas...",
      type: "continue",
    },
    {
      title: "Futuros Tech é um APP para Iniciantes, Intermediários e Avançados no mercado ter acesso as operações mais assertivas do mercado.",
      question: "Você teria interesse:",
      type: "yesno",
    },
    {
      title: "Com uma operação pessoas comum estão fazer o investimento anual e apenas 1 dia",
      type: "carousel",
    },
    {
      title: "Valor do Futuros Tech é 3.000 ou 12x297, mas no desafio o RISCO é ZERO e você terá uma super redução desse valor e garantia de 1 ano, é do seu agrado:",
      type: "yesno",
    },
    {
      title: "No desafio você terá acesso a:",
      benefits: [
        "FIP - Formação do Zero ao Avançado (De 2 mil por ZERO)",
        "Black Book - (De 500 por ZERO)",
        "Futuros Tech (Com redução de 66% do valor.)",
      ],
      type: "accept",
    },
    {
      title: "Você terá acesso a duas garantias:",
      guarantees: [
        "7 dias de Garantia Exigida pelo Estatuto do Consumidor.",
        "Garantia Condicional de 1 Ano – Compromisso com a Performance. Válida exclusivamente para os casos em que forem cumpridos integralmente os critérios de elegibilidade descritos nos Termos de Uso.",
      ],
      type: "guarantees",
    },
    {
      title: "Preencha seus dados para continuar",
      type: "form",
    },
    {
      title: "Restam poucas vagas para o desafio, vamos redirecionar você para o site de inscrição...",
      type: "redirect",
      message: (name: string) => `${name}, restam poucas vagas para o desafio, vamos redirecionar você para o site de inscrição...`,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    // Quiz timer
    const quizTimerInterval = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 0) {
          clearInterval(quizTimerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect timer
    if (currentStep === steps.length - 1) {
      const redirectTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(redirectTimer);
            const { name, email, phone } = formData;
            const ddd = phone.substring(0, 2);
            const phoneNumber = phone.substring(2);
            window.location.href = `https://pay.hotmart.com/H95976782G?preview_id=2621&preview_nonce=dc33ccea2a&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phoneac=${encodeURIComponent(ddd)}&phonenumber=${encodeURIComponent(phoneNumber)}`;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(quizTimerInterval);
        clearInterval(redirectTimer);
      };
    }

    return () => clearInterval(quizTimerInterval);
  }, [currentStep, formData]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnswer = (answer: boolean) => {
    setAnswers({ ...answers, [currentStep]: answer });
    setCurrentStep(currentStep + 1);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAcceptChallenge = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !acceptedTerms) {
      return;
    }
    
    try {
      // Salvar os dados no banco de dados antes de redirecionar
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          acceptedTerms: acceptedTerms
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Armazenar o ID da submissão no localStorage como prova adicional
        localStorage.setItem('submission_id', result.data.id);
        localStorage.setItem('terms_accepted_at', result.data.termsAcceptedAt);
        
        // Redirecionar para a página de pagamento
        const { name, email, phone } = formData;
        const ddd = phone.substring(0, 2);
        const phoneNumber = phone.substring(2);
        window.location.href = `https://pay.hotmart.com/H95976782G?preview_id=2621&preview_nonce=dc33ccea2a&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phoneac=${encodeURIComponent(ddd)}&phonenumber=${encodeURIComponent(phoneNumber)}`;
      } else {
        // Tratar erro
        console.error('Erro ao salvar dados:', result.error);
        alert('Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      alert('Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.');
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.type) {
      case "continue":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">{step.title}</h1>
            <p className="text-lg mb-8 text-neutral-400">{step.subtitle}</p>
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        );

      case "yesno":
        return (
          <div className="text-center">
            {currentStep === 3 ? (
              <>
                <h1 className="text-xl md:text-2xl font-bold mb-8 md:mb-12 text-white">Proposta</h1>
                <div className="max-w-2xl mx-auto space-y-4 md:space-y-8 mb-8 md:mb-12">
                  <div className="flex flex-col items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-4xl font-bold text-neutral-500 line-through">R$ 3.000</span>
                    </div>
                    <div className="text-[#00FF00] text-xl md:text-3xl font-bold tracking-wide">
                      POR: VALOR SUPER BAIXO
                    </div>
                    <div className="flex flex-col items-center gap-2 md:gap-4">
                      <div className="flex items-center justify-center gap-2 text-white bg-[#1A1A1A] px-4 md:px-6 py-2 md:py-3 rounded-lg">
                        <Shield className="w-4 h-4 md:w-6 md:h-6" />
                        <span className="text-base md:text-lg font-bold">RISCO ZERO</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-white bg-[#1A1A1A] px-4 md:px-6 py-2 md:py-3 rounded-lg">
                        <Percent className="w-4 h-4 md:w-6 md:h-6" />
                        <span className="text-base md:text-lg font-bold">SUPER REDUÇÃO</span>
                      </div>
                      <div className="text-neutral-400 text-base md:text-lg font-medium">
                        + GARANTIA
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-base md:text-lg mb-6 md:mb-8 text-neutral-400">É do seu agrado?</p>
                <div className="flex justify-center gap-3 md:gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-8 md:px-12 py-3 md:py-4 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors text-base md:text-lg"
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-8 md:px-12 py-3 md:py-4 bg-neutral-800 text-white font-bold rounded-lg hover:bg-neutral-700 transition-colors text-base md:text-lg"
                  >
                    Não
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4 text-white">{step.title}</h1>
                {step.question && <p className="text-lg mb-8 text-neutral-400">{step.question}</p>}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-8 py-3 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Não
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case "carousel":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-8 text-white">{step.title}</h1>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="relative">
                    <Image
                      src={`/depoimento${num}.webp`}
                      alt={`Depoimento ${num}`}
                      width={300}
                      height={225}
                      className="w-full h-auto rounded-lg object-cover"
                      priority={true}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleContinue}
                className="mt-8 px-8 py-3 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case "accept":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-12 text-white">{step.title}</h1>
            <div className="max-w-2xl mx-auto space-y-6 mb-12">
              {step.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <p className="text-lg text-neutral-300 text-left">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleAcceptChallenge}
              className="px-12 py-4 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors text-lg"
            >
              Aceitar desafio
            </button>
          </div>
        );

      case "guarantees":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-8 text-white">{step.title}</h1>
            <div className="max-w-2xl mx-auto space-y-6">
              {step.guarantees?.map((guarantee, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A] p-6 rounded-lg text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00FF00] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-neutral-300">
                      {guarantee.replace("(Leia os termos)", "")}
                      <span className="text-neutral-500 text-sm"> (Leia os termos)</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleContinue}
              className="mt-8 px-8 py-3 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        );

      case "form":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-8 text-white">{step.title}</h1>
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome completo"
                className="w-full px-4 py-3 bg-[#1A1A1A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF00]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                className="w-full px-4 py-3 bg-[#1A1A1A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF00]"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="DDD + Telefone (apenas números)"
                className="w-full px-4 py-3 bg-[#1A1A1A] text-white rounded-lg focus:outline-none"
                required
              />
              <div className="flex items-start justify-center gap-2 text-neutral-400 text-sm">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded border-neutral-700 bg-[#1A1A1A] text-[#00FF00] focus:ring-0"
                  required
                />
                <label htmlFor="terms-checkbox" className="text-left">
                  Li e aceito os{" "}
                  <a 
                    href="/termos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#00FF00] hover:underline"
                  >
                    termos de uso
                  </a>
                  . Compreendo que meus dados serão armazenados de acordo com a política de privacidade.
                </label>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone || !acceptedTerms}
                className={`w-full px-12 py-4 bg-[#00FF00] text-black font-bold rounded-lg transition-colors text-lg ${
                  !formData.name || !formData.email || !formData.phone || !acceptedTerms
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#00FF00]/90"
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case "redirect":
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-8 text-white">
              {step.message ? step.message(formData.name) : step.title}
            </h1>
            <p className="text-lg text-neutral-400 mb-4">Clique no botão abaixo para continuar:</p>
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors text-lg"
            >
              Continuar para o Pagamento
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={200}
              height={100}
              className="w-auto h-12"
            />
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-[#1A1A1A] rounded-lg">
              <span className="text-white font-bold text-xl">{formatTime(quizTimer)}</span>
            </div>
          </div>

          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="mb-8 flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
          )}

          {renderStep()}

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full bg-[#1A1A1A] rounded-full h-2">
              <div
                className="bg-[#00FF00] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-neutral-400 text-sm">
              {currentStep + 1} de {steps.length} passos
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="bg-[#0A0A0A] border-t border-neutral-800 p-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-neutral-500 text-[10px] md:text-xs text-center">
            Disclaimer: Ao continuar, você declara que leu, compreendeu e concorda com os nossos Termos de Uso e com a Política de Garantia Condicional. Os resultados podem variar de acordo com a disciplina, execução e gestão de risco do usuário. Esta oferta não constitui promessa de ganhos financeiros, e a garantia de reembolso é válida apenas mediante o cumprimento integral dos critérios estabelecidos nos termos.
          </p>
        </div>
      </footer>
    </div>
  );
} 