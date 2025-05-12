"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TesteSistema() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSystem === 'android') {
      // Add the video script dynamically for Android
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/682119a1e3b3cfc4a13a438d/player.js";
      script.async = true;
      script.id = "scr_682119a1e3b3cfc4a13a438d";
      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts or system changes
        const scriptElement = document.getElementById("scr_682119a1e3b3cfc4a13a438d");
        if (scriptElement) {
          scriptElement.remove();
        }
      };
    }
  }, [selectedSystem]);

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

        {/* System Selection */}
        {!selectedSystem && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
              Qual seu sistema operacional?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSelectedSystem('android')}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-200 hover:text-white transition-all duration-200"
              >
                Android
              </button>
              <button
                onClick={() => setSelectedSystem('iphone')}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-200 hover:text-white transition-all duration-200"
              >
                iPhone
              </button>
            </div>
          </div>
        )}

        {/* Android Content */}
        {selectedSystem === 'android' && (
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
        )}

        {/* iPhone Content */}
        {selectedSystem === 'iphone' && (
          <div className="mt-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
              Tutorial de Instalação para iPhone
            </h2>
            
            <div className="space-y-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-xl font-medium mb-4 text-neutral-200">
                  1. Baixe o aplicativo agora mesmo (iPhone):
                </h3>
                <a 
                  href="https://apps.apple.com/br/app/fip/id6738362588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline break-all"
                >
                  https://apps.apple.com/br/app/fip/id6738362588
                </a>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-xl font-medium mb-4 text-neutral-200">
                  2. Use as credenciais abaixo para acessar:
                </h3>
                <div className="space-y-3">
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
        )}

        {/* Back Button */}
        {selectedSystem && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setSelectedSystem(null)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              ← Voltar para seleção
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 