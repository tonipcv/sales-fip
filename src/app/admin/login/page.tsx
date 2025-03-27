"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          "x-admin-token": token
        }
      });

      if (response.ok) {
        // Store the token in localStorage for future requests
        localStorage.setItem("admin_token", token);
        router.push("/admin/dashboard");
      } else {
        setError("Token inválido");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login Administrativo</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-neutral-400 mb-1">
                Token de Acesso
              </label>
              <input
                type="password"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 