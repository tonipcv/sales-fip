"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AndroidTutorial() {
  useEffect(() => {
    // Add the video script dynamically for Android
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/682119a1e3b3cfc4a13a438d/player.js";
    script.async = true;
    script.id = "scr_682119a1e3b3cfc4a13a438d";
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const scriptElement = document.getElementById("scr_682119a1e3b3cfc4a13a438d");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-xl"
            priority
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
            Tutorial de Instalação para Android
          </h2>
          <div className="w-full">
            <div 
              id="vid_682119a1e3b3cfc4a13a438d" 
              style={{ position: "relative", width: "100%", padding: "56.25% 0 0" }}
            >
              <img 
                id="thumb_682119a1e3b3cfc4a13a438d" 
                src="https://images.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/682119a1e3b3cfc4a13a438d/thumbnail.jpg" 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
                alt="thumbnail"
              />
              <div 
                id="backdrop_682119a1e3b3cfc4a13a438d" 
                style={{
                  WebkitBackdropFilter: "blur(5px)",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%"
                }}
              />
            </div>
          </div>
        </div>

        {/* Login Credentials Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4 text-neutral-200">
                Informações de Acesso:
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-neutral-400 mb-1">Link:</p>
                  <p className="font-mono bg-neutral-900 p-2 rounded border border-neutral-800">
                    ai.futurostech.com
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1">Login:</p>
                  <p className="font-mono bg-neutral-900 p-2 rounded border border-neutral-800">
                    futurostech01@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1">Senha:</p>
                  <p className="font-mono bg-neutral-900 p-2 rounded border border-neutral-800">
                    milionario27@
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/teste-sistema"
            className="inline-block px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-200 hover:text-white transition-all duration-200"
          >
            ← Voltar para seleção
          </Link>
        </div>
      </div>
    </div>
  );
} 