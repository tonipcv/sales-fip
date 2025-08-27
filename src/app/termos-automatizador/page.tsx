/* eslint-disable */

import Link from 'next/link'

export default function TermosAutomatizadorPage() {
  return (
    <main className="min-h-screen bg-[#111] text-gray-200 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Termos de Uso da Versão de Teste – LYS Metaverse</h1>
          <p className="text-xs text-gray-400">Data: 26 de agosto de 2025</p>
        </header>

        <p className="text-sm text-gray-300">
          A versão de teste do software/estratégia (“Versão Teste”) é disponibilizada pela LYS Metaverse, exclusivamente para fins de avaliação temporária. Ao baixar, instalar ou utilizar a Versão Teste, o usuário declara que leu, entendeu e concorda integralmente com estes Termos de Uso.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1. Natureza da Versão Teste</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>A Versão Teste consiste em um arquivo digital de estratégia automatizada, destinado unicamente para avaliação experimental.</li>
            <li>A Versão Teste é fornecida “no estado em que se encontra”, podendo apresentar limitações, falhas técnicas e instabilidades.</li>
            <li>O objetivo é permitir que o usuário conheça o funcionamento básico do software antes de eventual aquisição da versão oficial/paga.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">2. Isenção de Responsabilidade</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>A LYS Metaverse não garante qualquer nível de desempenho, resultado ou compatibilidade da Versão Teste.</li>
            <li>A empresa não é responsável por perdas financeiras, falhas operacionais, erros de configuração, mau uso ou quaisquer danos decorrentes da utilização da Versão Teste.</li>
            <li>O uso é exclusiva responsabilidade do usuário, que reconhece os riscos inerentes às operações financeiras.</li>
            <li>Recomenda-se que a Versão Teste seja utilizada somente em conta de simulação (conta demo), nunca com capital real.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">3. Ausência de Consultoria ou Assessoria</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>A LYS Metaverse não é corretora, banco, consultoria financeira ou assessoria de investimentos.</li>
            <li>O software é apenas um arquivo digital automatizador e não constitui recomendação de investimento, análise de valores mobiliários, gestão de carteira, consultoria ou promessa de rentabilidade.</li>
            <li>O usuário declara estar ciente de que qualquer operação no mercado financeiro é feita por sua conta e risco.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4. Licença de Uso</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>O usuário recebe uma licença pessoal, limitada, temporária, não exclusiva e intransferível para utilização da Versão Teste.</li>
            <li>É proibida a revenda, redistribuição, modificação, cópia, engenharia reversa ou uso comercial não autorizado da Versão Teste.</li>
            <li>Todos os direitos autorais e de propriedade intelectual pertencem exclusivamente à LYS Metaverse.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">5. Limitação de Suporte</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>A Versão Teste é disponibilizada sem obrigação de suporte técnico individualizado.</li>
            <li>Qualquer suporte eventualmente prestado será limitado e opcional, sem comprometer a continuidade do serviço.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">6. Revogação e Alterações</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>A LYS Metaverse poderá suspender, alterar ou revogar o acesso à Versão Teste a qualquer momento, sem aviso prévio.</li>
            <li>A empresa não tem obrigação de manter a Versão Teste ativa por prazo determinado.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">7. Coleta de Feedback (opcional)</h2>
          <p className="text-sm text-gray-300">Caso o usuário forneça feedback, sugestões ou relatórios de erro, a LYS Metaverse poderá utilizá-los livremente para melhorias do Produto, sem obrigação de remuneração ou reconhecimento.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">8. Aviso de Risco</h2>
          <p className="text-sm text-gray-300">O usuário reconhece que operações em mercados financeiros envolvem risco elevado, podendo resultar em perda parcial ou total do capital investido. A LYS Metaverse não se responsabiliza por quaisquer decisões de investimento tomadas pelo usuário com base na Versão Teste.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">9. Foro e Legislação Aplicável</h2>
          <p className="text-sm text-gray-300">Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Paulo/SP, com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir eventuais controvérsias.</p>
        </section>

        <section className="bg-gray-900/60 border border-gray-800 rounded-lg p-4">
          <p className="text-[11px] leading-relaxed text-gray-200 font-semibold">
            ESTA É UMA VERSÃO DE TESTE, FORNECIDA APENAS PARA FINS DE AVALIAÇÃO. <br />
            A LYS METAVERSE NÃO GARANTE RESULTADOS E NÃO SE RESPONSABILIZA POR PERDAS FINANCEIRAS OU DECISÕES DE INVESTIMENTO. <br />
            ESTE SOFTWARE É UM ARQUIVO DIGITAL E NÃO CONSTITUI CONSULTORIA, ASSESSORIA OU PROMESSA DE RENTABILIDADE.
          </p>
        </section>

        <div className="pt-2">
          <Link href="/automacao-publica" className="text-green-400 hover:text-green-300 text-sm">
            ← Voltar para Automação Pública
          </Link>
        </div>
      </div>
    </main>
  )
}
