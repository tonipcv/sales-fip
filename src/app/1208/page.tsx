"use client";

import Image from "next/image";

export default function WhatsAppRedirect() {
  const silverGradient = { 
    background: 'linear-gradient(135deg, #444, #999, #ddd, #999, #444)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 2px rgba(255,255,255,0.3), 0 0 5px rgba(255,255,255,0.2)'
  };

  const buttonGreen = {
    background: 'linear-gradient(to bottom, #4CAF50, #2E7D32, #4CAF50)',
    border: '1px solid #2E7D32',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)'
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Restricted Access Tag */}
      <div className="bg-black text-white py-2 px-4 text-center text-xs font-medium" style={{borderBottom: '1px solid rgba(192,192,192,0.3)'}}>
        Somente para quem estiver no novo grupo e ativar o alerta no dia 12/08
      </div>
      
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8 md:mb-12 w-24 md:w-32"
          />

          {/* Attention Text */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={silverGradient}>
            ATENÇÃO: GRUPO DO APP LIBERADO PARA CONVIDADOS!
          </h2>

          {/* Instruction Text */}
          <p className="text-neutral-400 text-sm mb-8">
            Assista o vídeo para entender e clica no botão para entrar, lotando não criaremos outro.
          </p>

          {/* Group Join Button */}
          <div className="mb-16">
            <a 
              href="https://chat.whatsapp.com/CfAtoZbYlntDJGZ7aD2Tjr?mode=ac_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium text-lg transition-all duration-200 transform hover:scale-105"
              style={buttonGreen}
            >
              ENTRAR NO GRUPO DO APP
            </a>
          </div>

          {/* Video Container */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe 
                id="panda-14bb38cd-7651-4c0d-84ed-959cb4964d37" 
                src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=14bb38cd-7651-4c0d-84ed-959cb4964d37"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowFullScreen={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">
          Futuros Tech
        </p>
      </footer>
    </div>
  );
} 