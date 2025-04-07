"use client";

import Image from "next/image";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={200}
            height={100}
            className="w-auto h-12"
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">TERMOS DE USO – PRODUTO DO FUTUROS TECH</h1>
          <p className="text-neutral-400 text-center mb-12">Última atualização: 07 de Abril de 2025</p>
          
          <p className="mb-8">
            Por favor, leia estes Termos de Uso com atenção antes de utilizar nosso serviço. Ao adquirir e utilizar o produto do Futuros Tech, você declara que leu, entendeu e concorda com todas as cláusulas abaixo.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">1. OBJETO</h2>
              <p>
                O presente Termo de Uso regula as condições de acesso e uso do produto 100% online de Sinais de Trade, fornecido por LYS Metaverse, inscrita no CNPJ sob nº 32.563.274/0001-85, doravante denominada "EMPRESA".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">2. FUNCIONALIDADE DO SERVIÇO</h2>
              <div className="space-y-4">
                <p>2.1. A EMPRESA fornece sinais de trade baseados em análise técnica e/ou algorítmica, com o objetivo de auxiliar o cliente em suas operações no mercado financeiro.</p>
                <p>2.2. Os sinais são disponibilizados em tempo real através de canais de comunicação previamente informados (aplicativo, plataforma web, Telegram, etc).</p>
                <p>2.3. A execução dos sinais é de inteira responsabilidade do CLIENTE.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">3. ACESSO AO PRODUTO</h2>
              <div className="space-y-4">
                <p>3.1. Para acessar o produto, o CLIENTE deve realizar cadastro e efetuar o pagamento conforme plano adquirido.</p>
                <p>3.2. O acesso é pessoal, intransferível e vinculado ao CPF ou e-mail cadastrado.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">4. GARANTIA DE RESULTADOS – "DESAFIO DE 1 ANO"</h2>
              <div className="space-y-4">
                <p>4.1. A EMPRESA oferece uma garantia de devolução de 100% do valor investido no aplicativo, caso o CLIENTE não obtenha resultado positivo após 12 meses, desde que sejam cumpridos os seguintes critérios:</p>
                
                <h3 className="text-xl font-bold mt-6 mb-4">4.2. Regras para elegibilidade da garantia:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>O CLIENTE deve aplicar no mínimo 80% dos sinais fornecidos ao longo do período de 12 meses;</li>
                  <li>As operações devem respeitar margem máxima de 10% por operação;</li>
                  <li>O CLIENTE deve estar com assinatura ativa e em dia durante todo o período;</li>
                  <li>O CLIENTE deve operar exclusivamente os sinais fornecidos ou informar caso utilize estratégias adicionais.</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-4">4.3. Requisitos para solicitação da garantia:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Apresentação de extrato da corretora comprovando o uso dos sinais;</li>
                  <li>Histórico de operações com datas e horários compatíveis com os sinais emitidos;</li>
                  <li>Prova de que as margens de operação não ultrapassaram 10%;</li>
                  <li>Comprovação de que, mesmo seguindo os critérios, não houve lucro ao final do período.</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-4">4.4. Exclusões:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Se o CLIENTE não seguir os critérios descritos acima;</li>
                  <li>Se houver uso de alavancagem fora do permitido;</li>
                  <li>Se houver interrupção na assinatura;</li>
                  <li>Se houver manipulação dos dados ou falsificação de extratos.</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-4">4.5. Observações:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A devolução cobre apenas o valor investido no aplicativo, não cobrindo prejuízos com operações de trade;</li>
                  <li>A solicitação da garantia deve ser feita somente ao final dos 12 meses, com documentação enviada em até 15 dias após o término do período.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">5. LIMITAÇÃO DE RESPONSABILIDADE</h2>
              <div className="space-y-4">
                <p>5.1. O CLIENTE declara estar ciente de que o mercado de criptomoedas e ativos financeiros envolve riscos inerentes, e que os sinais fornecidos são apenas sugestões e não garantem lucro.</p>
                <p>5.2. A EMPRESA não se responsabiliza por perdas financeiras, falhas de execução, erros de corretora ou decisões do CLIENTE fora do escopo dos sinais.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">6. DIREITOS AUTORAIS E PROPRIEDADE INTELECTUAL</h2>
              <p>6.1. Todo o conteúdo fornecido, incluindo sinais, textos, gráficos, códigos e marca da EMPRESA, é protegido por direitos autorais e não pode ser copiado, distribuído ou utilizado comercialmente sem autorização.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">7. CANCELAMENTO E REEMBOLSO</h2>
              <p>7.1. O CLIENTE pode cancelar a assinatura a qualquer momento, mas não haverá reembolso proporcional, salvo exceções previstas na legislação de proteção ao consumidor ou na cláusula de garantia.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">8. PRIVACIDADE E SEGURANÇA</h2>
              <p>8.1. As informações fornecidas pelo CLIENTE são armazenadas com segurança e utilizadas conforme nossa Política de Privacidade.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">9. MODIFICAÇÕES NOS TERMOS</h2>
              <p>9.1. A EMPRESA se reserva o direito de alterar estes termos a qualquer momento, notificando os usuários com antecedência razoável.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">10. FORO</h2>
              <p>10.1. As partes elegem o foro da comarca de Cajamar, Estado de São Paulo, como competente para resolver eventuais conflitos decorrentes destes Termos, com renúncia a qualquer outro.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 