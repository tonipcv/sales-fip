import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo Section */}
      <div className="w-full flex justify-center mb-12">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>

      {/* Closed Registration Message */}
      <div className="text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Vagas Encerradas
        </h1>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 mb-8">
          <div className="text-red-400 text-6xl mb-4">
            ⚠️
          </div>
          <p className="text-white text-xl md:text-2xl font-medium mb-4">
            As inscrições foram encerradas
          </p>
          <p className="text-gray-300 text-lg">
            Infelizmente, todas as vagas para esta liberação já foram preenchidas.
          </p>
        </div>

        <div className="text-gray-400 text-base">
          <p>Fique atento aos nossos canais oficiais para futuras oportunidades.</p>
        </div>
      </div>
    </div>
  );
} 