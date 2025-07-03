"use client";

import Image from "next/image";

export default function WhatsAppRedirect() {
  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
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
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-8">
            ATENÇÃO: GRUPO DO APP LIBERADO PARA CONVIDADOS!
          </h2>

          {/* Instruction Text */}
          <p className="text-neutral-400 text-sm mb-8">
            Assista o vídeo para entender e clica no botão para entrar, lotando não criaremos outro.
          </p>

          {/* Group Join Button */}
          <div className="mb-16">
            <a 
              href="https://chat.whatsapp.com/IaqTe21ft9H1vApGem7psJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-medium text-lg transition-all duration-200 transform hover:scale-105"
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