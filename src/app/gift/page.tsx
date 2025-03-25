"use client";

import { useState } from "react";
import Image from "next/image";

type QuizStep = 'initial' | 'quiz' | 'success';
type QuizQuestion = {
  id: string;
  question: string;
  type: 'select' | 'number' | 'radio';
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 'gender',
    question: 'Qual seu sexo?',
    type: 'select',
    options: [
      { value: 'male', label: 'Masculino' },
      { value: 'female', label: 'Feminino' },
      { value: 'other', label: 'Outro' }
    ]
  },
  {
    id: 'age',
    question: 'Qual sua idade?',
    type: 'select',
    options: [
      { value: '18-25', label: '18 a 25 anos' },
      { value: '26-35', label: '26 a 35 anos' },
      { value: '36-45', label: '36 a 45 anos' },
      { value: '46-55', label: '46 a 55 anos' },
      { value: '56+', label: 'Acima de 55 anos' }
    ]
  },
  {
    id: 'market_level',
    question: 'Qual seu nível de mercado?',
    type: 'select',
    options: [
      { value: 'beginner', label: 'Iniciante' },
      { value: 'intermediate', label: 'Intermediário' },
      { value: 'advanced', label: 'Avançado' }
    ]
  },
  {
    id: 'net_worth',
    question: 'Qual seu patrimônio atual?',
    type: 'select',
    options: [
      { value: '0-50k', label: 'Até R$ 50.000' },
      { value: '50k-200k', label: 'R$ 50.000 - R$ 200.000' },
      { value: '200k-500k', label: 'R$ 200.000 - R$ 500.000' },
      { value: '500k+', label: 'Acima de R$ 500.000' }
    ]
  },
  {
    id: 'is_premium',
    question: 'Já entrou em alguma operação do Futuros Tech Premium?',
    type: 'radio',
    options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ]
  },
  {
    id: 'interested',
    question: 'Tem interesse em receber entradas de domingo a domingo e consegui ganhar de 10 a 100 mil por mês?',
    type: 'radio',
    options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ]
  }
];

export default function GiftPage() {
  const [step, setStep] = useState<QuizStep>('initial');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    gender: '',
    age: '',
    market_level: '',
    net_worth: '',
    is_premium: false,
    interested: false
  });

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // Format: (00) 00000-0000
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      setFormData({ ...formData, whatsapp: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/gift-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStep('quiz');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao processar sua solicitação. Tente novamente.');
    }
  };

  const handleQuestionAnswer = (value: string) => {
    const question = quizQuestions[currentQuestionIndex];
    const newFormData = { ...formData };

    if (question.type === 'radio') {
      newFormData[question.id as keyof typeof formData] = value === 'true';
    } else {
      newFormData[question.id as keyof typeof formData] = value;
    }

    setFormData(newFormData);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = async () => {
    try {
      const response = await fetch('/api/gift-form', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      setStep('success');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Erro ao processar suas respostas. Tente novamente.');
    }
  };

  const renderInitialForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
          placeholder="Digite seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
          placeholder="Digite seu melhor e-mail"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm text-neutral-400 mb-2">
          WhatsApp
        </label>
        <input
          type="tel"
          id="whatsapp"
          required
          value={formData.whatsapp}
          onChange={handleWhatsAppChange}
          maxLength={15}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-700 transition-colors"
          placeholder="(00) 00000-0000"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
      >
        Liberar Agora!
      </button>

      <p className="text-xs text-neutral-500 text-center mt-4">
        Seus dados estão seguros e não serão compartilhados.
      </p>
    </form>
  );

  const renderQuiz = () => {
    const question = quizQuestions[currentQuestionIndex];
    const currentValue = formData[question.id as keyof typeof formData];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  index === currentQuestionIndex
                    ? 'bg-emerald-500'
                    : index < currentQuestionIndex
                    ? 'bg-emerald-700'
                    : 'bg-neutral-800'
                }`}
              />
            ))}
          </div>
          <h2 className="text-xl font-medium text-white mb-2">
            {question.question}
          </h2>
        </div>

        <div className="space-y-4">
          {question.type === 'select' && (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleQuestionAnswer(option.value)}
                  className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-emerald-500 text-white transition-all duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {question.type === 'number' && (
            <div className="space-y-3">
              <input
                type="number"
                value={currentValue as string}
                onChange={(e) => handleQuestionAnswer(e.target.value)}
                min={question.min}
                max={question.max}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder={question.placeholder}
              />
            </div>
          )}

          {question.type === 'radio' && (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleQuestionAnswer(option.value)}
                  className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-emerald-500 text-white transition-all duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-medium text-white mb-4">
        Parabéns! Seu acesso foi liberado
      </h2>
      <p className="text-neutral-300 mb-6">
        Seu acesso ao PDF foi liberado e seu acesso a Reunião foi liberado.
        <br /><br />
        No dia 08/03 as 20h enviaremos o link no grupo.
      </p>
      <a
        href="https://chat.whatsapp.com/FqrPhw6D9NKFHSgYZ24GSA"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
      >
        Entrar no Grupo do WhatsApp
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-montserrat flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black border border-neutral-800 rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-2">
            {step === 'initial' && 'LIBERE SEU ACESSO AO PDF EXCLUSIVO'}
            {step === 'quiz' && 'QUIZ DE PERFIL'}
            {step === 'success' && 'ACESSO LIBERADO!'}
          </h1>
        </div>

        {step === 'initial' && renderInitialForm()}
        {step === 'quiz' && renderQuiz()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
} 