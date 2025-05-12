"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function TesteLiberadoVideo() {
  useEffect(() => {
    // Add the video script dynamically
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/6821198158e97f8befd9bd6c/player.js";
    script.async = true;
    script.id = "scr_6821198158e97f8befd9bd6c";
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const scriptElement = document.getElementById("scr_6821198158e97f8befd9bd6c");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
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

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
          Assista o vídeo para aprender a baixar e ter o seu acesso ao teste!
        </h2>

        {/* Video Container */}
        <div className="w-full">
          <div 
            id="vid_6821198158e97f8befd9bd6c" 
            style={{ position: "relative", width: "100%", padding: "56.25% 0 0" }}
          >
            <img 
              id="thumb_6821198158e97f8befd9bd6c" 
              src="https://images.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/6821198158e97f8befd9bd6c/thumbnail.jpg" 
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
              id="backdrop_6821198158e97f8befd9bd6c" 
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

        {/* Login Credentials Section */}
        <div className="mt-8 p-6 bg-white/5 rounded-xl border-2 border-neutral-700 shadow-lg">
          <h3 className="text-xl font-medium text-center mb-4 text-green-500">
            Informações de Acesso
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-neutral-400">Link:</p>
              <p className="text-white font-medium">ai.futurostech.com</p>
            </div>
            
            <div>
              <p className="text-neutral-400">Login:</p>
              <p className="text-white font-medium">futurostech01@gmail.com</p>
            </div>
            
            <div>
              <p className="text-neutral-400">Senha:</p>
              <p className="text-white font-medium">milionario27@</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 