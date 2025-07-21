"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Page() {
  useEffect(() => {
    // Performance timing script
    const perfScript = document.createElement('script');
    perfScript.innerHTML = `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`;
    document.head.appendChild(perfScript);

    // Add preload tags
    const preloadLinks = [
      { href: "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/687e962499dbb5eb047a0500/v4/player.js", as: "script" },
      { href: "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js", as: "script" },
      { href: "https://cdn.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/687e962499dbb5eb047a0500/main.m3u8", as: "fetch" }
    ];

    preloadLinks.forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = "preload";
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      document.head.appendChild(preloadLink);
    });

    // Add DNS prefetch
    const dnsPrefetch = [
      "https://cdn.converteai.net",
      "https://scripts.converteai.net",
      "https://images.converteai.net",
      "https://api.vturb.com.br"
    ];

    dnsPrefetch.forEach(href => {
      const link = document.createElement('link');
      link.rel = "dns-prefetch";
      link.href = href;
      document.head.appendChild(link);
    });

    // Add player script with proper timing
    setTimeout(() => {
      const s = document.createElement("script");
      s.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/687e962499dbb5eb047a0500/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }, 100);

    return () => {
      // Cleanup
      document.querySelectorAll('link[rel="preload"], link[rel="dns-prefetch"]').forEach(el => el.remove());
      document.querySelectorAll('script[src*="converteai.net"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Logo Section */}
      <div className="w-full flex justify-center pt-8 mb-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      {/* Title Section */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-large md:text-3xl font-medium mb-2">
          TUTORIAL PARA LIBERAÇÃO DO APP!
        </h1>
        <p className="text-neutral-300 text-small md:text-large">
          Assista o vídeo
        </p>
      </div>

      {/* Video Section */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-full max-w-[1000px] mx-auto px-4">
          <div 
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-687e962499dbb5eb047a0500" style="display: block; margin: 0 auto; width: 100%; max-width: 100%;"></vturb-smartplayer>'
            }}
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-4 px-4 pb-8">
        <a
          href="https://chat.whatsapp.com/HmjcXWKzfKQG9OLynZJF3g?mode=ac_t"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full max-w-md text-center"
        >
          GRUPO DE ATUALIZAÇÕES
        </a>
        
        <a
          href="https://ai.futurostech.com/forgot-password"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full max-w-md text-center"
        >
          ALTERAR SENHA
        </a>
        
        <a
          href="http://ai.futurostech.com/register"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full max-w-md text-center"
        >
          CRIAR CONTA
        </a>
      </div>
    </div>
  );
} 