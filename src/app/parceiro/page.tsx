"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MessageSquare, Mail, User, Instagram } from "lucide-react";

export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    hotmartEmail: "",
    purchaseEmail: "",
    whatsapp: "",
    instagram: "",
    marketingMethod: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/partner-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar formulário");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        hotmartEmail: "",
        purchaseEmail: "",
        whatsapp: "",
        instagram: "",
        marketingMethod: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      setSubmitError(error instanceof Error ? error.message : "Erro ao enviar formulário");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        
        <h1 className="text-xl font-medium text-center mb-8">
          Seja um parceiro e ganhe até <span className="text-green-500">70%</span> de comissão
        </h1>

        {submitSuccess ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
            <p className="text-green-400 mb-2 font-medium">Solicitação enviada com sucesso!</p>
            <p className="text-gray-400 text-sm">Entraremos em contato em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                {submitError}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome completo"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="email"
                id="hotmartEmail"
                name="hotmartEmail"
                value={formData.hotmartEmail}
                onChange={handleChange}
                placeholder="Email da Hotmart"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="email"
                id="purchaseEmail"
                name="purchaseEmail"
                value={formData.purchaseEmail}
                onChange={handleChange}
                placeholder="Email de compra"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp (DDD + número)"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram (sem @)"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <textarea
              id="marketingMethod"
              name="marketingMethod"
              value={formData.marketingMethod}
              onChange={handleChange}
              placeholder="Como vai divulgar?"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 min-h-[80px]"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 