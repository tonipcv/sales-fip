"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Page() {
  useEffect(() => {
    // Redirect to WhatsApp
    window.location.href = "https://wa.me/5511976650763";

    // Performance timing script
    const perfScript = document.createElement('script');
    perfScript.innerHTML = `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`;
    document.head.appendChild(perfScript);

    // Add preload tags
    const preloadLinks = [
      { href: "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/68778ddb0ba5d2090a227a0e/v4/player.js", as: "script" },
      { href: "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js", as: "script" },
      { href: "https://cdn.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/68778c359df225772d836439/main.m3u8", as: "fetch" }
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

    // Add player script
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/32ff2495-c71e-49ba-811b-00b5b49c517f/players/68778ddb0ba5d2090a227a0e/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

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

      {/* Text Section */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-large md:text-3xl font-medium mb-2">
          App encerrado!
        </h1>
        <p className="text-neutral-300 text-small md:text-large">
          Vagas lotadas
        </p>
      </div>

      {/* Video Section - mantido exatamente como estava */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1000px] mx-auto px-4">
          <div 
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-68778ddb0ba5d2090a227a0e" style="display: block; margin: 0 auto; width: 100%; max-width: 100%;"></vturb-smartplayer>'
            }}
          />
        </div>
      </div>
    </div>
  );
} 