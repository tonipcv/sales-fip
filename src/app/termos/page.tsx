"use client";

import { useState } from "react";
import Image from "next/image";

export default function TermosPage() {
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
          <p className="text-neutral-400 text-center mb-8">Última atualização: 07 de Abril de 2025</p>
          
          <div className="mb-6">
            <p className="font-medium">
              Atenção! Antes da contratação, você deverá ler atentamente os termos e as condições do
              presente declarando o seu aceite, pelo qual manifestará sua ciência expressa e concordância
              integral a todas as cláusulas. Caso você não concorde com os termos propostos, deverá se
              abster de realizar a contratação.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">1. PARTES</h2>
              <p>
                LYS METAVERSE LTDA., sociedade limitada constituída e existente sob as leis do Brasil, inscrita
                no CNPJ sob o nº 32.563.274/0001-85, doravante denominada ("PRODUTORA") e o beneficiário
                do uso do INFOPRODUTO (conforme definido abaixo), identificado através das informações
                prestadas à plataforma em pagamento, doravante denominado "USUÁRIO".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">2. OBJETO</h2>
              <p>
                O presente instrumento ("Termos") regula os direitos e as obrigações relacionados à aquisição e
                utilização do infoproduto Futuros Tech ("INFOPRODUTO") e seus respectivos conteúdos
                complementares, ofertados, criados, administrados e de titularidade da PRODUTORA,
                consistente nas seguintes entregas: acesso a aplicativo desenvolvido ou fornecido pela
                PRODUTORA, através do qual são fornecidos Sinais de Trading automatizados, baseados em
                análise técnica e/ou algorítmica, com o objetivo de auxiliar o USUÁRIO nas suas próprias
                análises e operações realizadas com criptpoativos.
              </p>
              <p className="mt-4 font-bold">
                O FORNECIMENTO DE SINAIS DE TRADING ATRAVÉS DO INFOPRODUTO NÃO SÃO
                RECOMENDAÇÕES DE INVESTIMENTO E SERVEM EXCLUSIVAMENTE AO PROPÓSITO DE
                AUXILIAR O USUÁRIO COM INFORMAÇÕES AUTOMATIZADAS BASEADAS EM ANÁLISE
                TÉNICAS E ALGORÍTMICA DO COMPORTAMENTO DE DETERMINADOS ATIVOS. O
                USUÁRIO DECLARA E RECONHECE QUE A UTILIZAÇÃO OU NÃO DOS SINAIS DE TRADING
                FORNECIDOS ATRAVÉS DO INFOPRODUTO DEPENDERÁ EXCLUSIVAMENTE DA SUA
                PRÓPRIA ANÁLISE E ASSUNÇÃO DE RISCOS. NENHUMA COMUNICAÇÃO OU
                INFORMAÇÃO FORNECIDA AO USUÁRIO PELA PRODUTORA TEM A INTENÇÃO DE SER,
                OU DEVE SER CONSIDERADA OU INTERPRETADA COMO, RECOMENDAÇÃO DE
                INVESTIMENTO, ASSESSORIA FINANCEIRA, OU QUALQUER OUTRO TIPO DE CONSELHO
                OU RECOMENDAÇÃO.
              </p>
              <p className="mt-4 font-bold">
                A PRODUTORA NÃO É E NÃO ATUA COMO CORRETORA, INTERMEDIÁRIA, AGENTE OU
                ASSESSORA DO USUÁRIO E NÃO TEM NENHUMA RELAÇÃO FIDUCIÁRIA OU OBRIGAÇÃO
                COM O USUÁRIO EM RELAÇÃO A QUAISQUER NEGOCIAÇÕES OU OUTRAS DECISÕES OU
                ATIVIDADES REALIZADAS PELO USUÁRIO, INCLUSIVE CONSIDERANDO OS SINAIS DE
                TRADING FORNECIDOS PELA PRODUTORA. A PRODUTORA NÃO MONITORA SE O USO
                DO INFOPRODUTO É CONSISTENTE COM AS METAS E OBJETIVOS PESSOAIS DO
                USUÁRIO. CABE AO USUÁRIO AVALIAR SE QUALQUER ATIVIDADE REALIZADA
                CONSIDERANDO OS SINAIS DE TRADING FORNECIDOS PELO INFOPRODUTO É
                APROPRIADA DE ACORDO COM SUA POSIÇÃO FINANCEIRA E APETITE POR RISCOS.
              </p>
              <p className="mt-4 font-bold">
                O USUÁRIO AINDA DECLARA E RECONHECE QUE O INVESTIMENTO EM UM CRIPTOATIVO
                ESTÁ EXPOSTO A UM RISCO SIGNIFICATIVO, DE MODO QUE O VALOR DE UM
                INVESTIMENTO E QUAISQUER RETORNOS PODEM SUBIR OU DESCER, E O USUÁRIO
                PODE PERDER TODO OU PARTE DE SEU INVESTIMENTO E NÃO RECEBER DE VOLTA A
                QUANTIA QUE INVESTIU. SE O USUÁRIO FOR INICIANTE EM CRIPTOATIVOS, CONSIDERE
                INVESTIR APENAS UMA PEQUENA QUANTIA. INVISTA SOMENTE O QUE VOCÊ PODE SE
                DAR AO LUXO DE PERDER. É IMPORTANTE FAZER SUA PRÓPRIA PESQUISA PARA
                ENTENDER OS RISCOS DE INVESTIR EM CRIPTOATIVOS. A NEGOCIAÇÃO DE
                CRIPTOATIVOS É ESPECULATIVA, OS PREÇOS SÃO VOLÁTEIS E OS MOVIMENTOS DO
                MERCADO SÃO DIFÍCEIS DE PREVER. A OFERTA E A DEMANDA POR CRIPTOATIVOS
                PODEM MUDAR RAPIDAMENTE SEM AVISO PRÉVIO E PODEM SER AFETADAS POR UMA
                VARIEDADE DE FATORES QUE PODEM NÃO SER PREVISÍVEIS, INCLUINDO
                REGULAMENTAÇÃO, TENDÊNCIAS ECONÔMICAS GERAIS E DESENVOLVIMENTOS NO
                ECOSSISTEMA DE CRIPTOATIVOS. TODOS OS INVESTIMENTOS EM ATIVOS DIGITAIS
                APRESENTAM RISCO DE PERDA.
              </p>
              <p className="mt-4 font-bold">
                O MERCADO DE CRIPTOATIVOS É UM MERCADO NÃO REGULAMENTADO, EXPOSTO A
                RISCOS DE MERCADO, RISCOS DE LIQUIDEZ, RISCOS SISTÊMICO, RISCOS
                OPERACIONAIS, DENTRE OUTROS RELACIONADOS AOS CRIPTOATIVOS, CORRETORAS
                E EMISSORAS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">3. ACESSO AO PRODUTO</h2>
              <div className="space-y-3">
                <p>3.1. A aquisição do INFOPRODUTO se dará mediante a plataforma HOTMART, doravante
                denominada simplesmente "Plataforma".</p>
                <p>3.2. O INFOPRODUTO é disponibilizado pela PRODUTORA mediante a assinatura anual, a ser
                realizada pelo USUÁRIO através da Plataforma, de acordo com as condições de pagamento
                disponibilizadas pela Plataforma. O USUÁRIO deverá realizar o cadastro e efetuar o pagamento,
                conforme o plano adquiridos, nos termos e condições da Plataforma.</p>
                <p>3.3. O acesso ao INFOPRODUTO será disponibilizado através do endereço de e-mail e/ou
                número de whatsapp cadastrado pelo USUÁRIO na Plataforma.</p>
                <p>3.4. Para acesso ao INFOPRODUTO e demais materiais e conteúdos de apoio, o USUÁRIO
                deverá efetuar cadastro, com todas as informações obrigatórias solicitadas pela PRODUTORA
                e/ou pela Plataforma, mediante criação de login e senha de acesso.</p>
                <p>3.5. O INFOPRODUTO poderá ser disponibilizado através do ambiente Web, Android e iOS,
                conforme condições técnicas e operacionais.</p>
                <p>3.6. O acesso ao INFOPRODUTO é pessoal, intransferível e vinculado ao CPF ou endereço de e-
                mail cadastrado na Plataforma. A PRODUTORA se reserva ao direito de revogar o acesso do
                USUÁRIO, sem qualquer ônus ou devolução, caso constatado o compartilhamento indevido do
                acesso ao INFOPRODUTO a terceiros.</p>
                <p>3.7. O USUÁRIO é o único responsável pelas informações por ele fornecidas quando de seu
                cadastro e declara a veracidade e exatidão. A PRODUTORA não se responsabiliza por
                informações incorretas ou inverídicas fornecidas pelo USUÁRIO e este reconhece que, na
                hipótese de inconsistência nas informações fornecidas, o seu acesso ao INFOPRODUTO, poderá
                ser prejudicado até a correção junto à Plataforma.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">4. PAGAMENTO</h2>
              <div className="space-y-3">
                <p>4.1. O investimento total do INFOPRODUTO é aquele ofertado na página de pagamento
                (checkout) da plataforma e pago pelo USUÁRIO no momento da aquisição.</p>
                <p>4.2. Na hipótese de optar pelo pagamento parcelado o USUÁRIO fica ciente e concorda que o
                uso do INFOPRODUTO não guarda relação com a quantidade de parcelas assumidas, desta
                feita, e conclusão do mesmo não será considerada motivo para interromper o pagamento de
                quaisquer parcelas ainda devidas, bem como não haverá qualquer ressarcimento caso não
                conclua dentro do período de acesso ao INFOPRODUTO.</p>
                <p>4.2.1 Ao optar pelo parcelamento, o USUÁRIO fica ciente que o prazo para compensação do
                boleto é de até 72 horas úteis. É procedimento automático da Plataforma bloquear o acesso
                mensalmente, no mesmo dia de cada mês (tendo como data de referência, a data de aquisição do
                curso), ainda que o boleto do mês seguinte não esteja vencido. A liberação acontecerá
                automaticamente após a compensação do boleto pago.</p>
                <p>4.3. Algumas formas de pagamento estarão sujeitas a cobrança de determinadas taxas pela
                instituição financeira responsável pela transação e/ou Plataforma, devendo o USUÁRIO consultar
                as condições junto à instituição, não cabendo à PRODUTORA, prestar quaisquer esclarecimentos
                neste sentido e/ou arcar com eventuais taxas cobradas.</p>
                <p>4.4. Na escolha pelo parcelamento, fica ajustado que o atraso de quaisquer parcelas acarretará:
                (i) protesto, inscrição nos institutos de proteção ao crédito ou cobrança judicial; (ii) suspensão
                imediata do acesso ao INFOPRODUTO, ou rescisão contratual.</p>
                <p>4.5 De forma alguma – a menos que autorizado pela PRODUTORA – o USUÁRIO poderá
                solicitar chargeback (estorno) da compra realizada em seu cartão, sob pena das medidas judiciais
                cabíveis.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">5. PRAZO DE ACESSO E RENOVAÇÃO</h2>
              <div className="space-y-3">
                <p>5.1. O INFOPRODUTO foi adquirido pelo prazo determinado de 12 (doze) meses, ou seja, não se
                trata de uma prestação de serviço vitalícia. A renovação do acesso ao INFOPRODUTO poderá
                ser solicitada pelo USUÁRIO, mediante nova contratação, conforme ofertado no momento da
                aquisição ou em situação oportuna.</p>
                <p>5.2. O acesso do USUÁRIO ao INFOPRODUTO será de 12 (doze) meses a contar do envio do
                acesso ao endereço de e-mail informado pelo USUÁRIO no cadastro. A suspensão prevista no
                item 11 abaixo não é causa apta a suspender ou interromper o prazo aqui descrito, ou seja, se
                suspenso o acesso por culpa do contratante, o prazo pelo qual perdurou a suspensão não lhe
                será restituído.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">6. DIREITO DE ARREPENDIMENTO</h2>
              <div className="space-y-3">
                <p>6.1. Dentro do prazo de 7 (sete) dias após a o envio do acesso ao INFOPRODUTO pela
                PRODUTORA, o USUÁRIO poderá solicitar a rescisão de contrato e reembolso do valor pago
                diretamente junto à Plataforma, diretamente através do site https://refund.hotmart.com. A
                PRODUTORA não é responsável pelo processamento do reembolso, que é realizado
                exclusivamente pela Plataforma.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">7. GARANTIA CONDICIONAL – "DESAFIO DE 1 ANO"</h2>
              <div className="space-y-3">
                <p>7.1. A PRODUTORA oferece a possibilidade de reembolso integral do preço de aquisição pago
                pelo USUÁRIO em relação ao INFOPRODUTO, após o decurso de 12 (doze) meses após a
                aquisição do INFOPRODUTO, desde que cumpridas cumulativamente todas as seguintes
                condições:</p>
                
                <p className="font-medium">4.2. Regras para elegibilidade da Garantia Condicional:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>O USUÁRIO deverá ter aplicado no mínimo 80% (oitenta por cento) dos sinais fornecidos
                  através do INFOPRODUTO ao longo do período de 12 (doze) meses, de acordo com a
                  estratégia indicada pela PRODUTORA;</li>
                  <li>Todas as operações realizadas pelo USUÁRIO com base nos sinais fornecidos através
                  do INFOPRODUTO devem respeitar margem máxima de 10% (dez por cento) do
                  patrimônio disponível do USUÁRIO por operação (exemplo: se o USUÁRIO tiver uma
                  carteira de recursos disponíveis de R$1.000,00 (mil reais), apenas poderá comprometer
                  R$100,00 (cem reais) a cada operação);</li>
                  <li>O USUÁRIO deverá estar com assinatura válida, ativa e adimplente durante todo o
                  período de 12 (doze) meses de utilização do INFOPRODUTO;</li>
                  <li>O USUÁRIO deverá ter realizado as operações nas plataformas e corretoras indicadas
                  pela PRODUTORA;</li>
                  <li>Ao término do período de 12 (doze) meses, o saldo de operações do USUÁRIO nas quais
                  foram utilizados os sinais fornecidos no INFOPRODUTO deverá ser negativo e deficitário.
                  Não serão considerados neste cálculo operações realizadas pelo USUÁRIO sem a
                  utilização dos sinais e estratégias fornecidas pelo INFOPRODUTO.</li>
                </ul>
                
                <p className="font-medium">4.3. Requisitos para solicitação da Garantia Condicional:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Impreterivelmente dentro de 15 (quinze) dias contados do término do período de 12
                  (doze) meses de utilização do INFOPRODUTO, o USUÁRIO deverá enviar a solicitação
                  da Garantia Condicional para o e-mail contato@k17.com.br, com as seguintes
                  comprovações e evidências do cumprimento das regras de elegibilidade:</li>
                  <li>Apresentação de extrato completo emitido pela corretora, comprovando a realização das
                  operações com a utilização dos sinais providos através do INFOPRODUTO;</li>
                  <li>Histórico de operações realizadas pelo USUÁRIO com datas e horários compatíveis com
                  os sinais emitidos através do INFOPRODUTO;</li>
                  <li>Comprovação de que as margens não ultrapassaram 10% (dez por cento) do patrimônio
                  por operação;</li>
                  <li>Comprovação de que, mesmo seguindo os critérios acima, saldo final de operações do
                  USUÁRIO após os 12 (doze) meses de utilização do INFOPRODUTO foi negativo e
                  deficitário.</li>
                </ul>
                
                <p className="font-medium">4.4. Exclusões:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Se o USUÁRIO não observar os critérios de elegibilidade descritos acima;</li>
                  <li>Se o USUÁRIO realizar operações em corretora através da qual não seja possível emitir
                  extratos e comprovações das operações realizadas e observância dos critérios de
                  elegibilidade indicados acima;</li>
                  <li>Se houver uso de alavancagem nas operações realizadas pelo USUÁRIO;</li>
                  <li>Se houver interrupção na assinatura do INFOPRODUTO, por qualquer motivo;</li>
                  <li>Se o USUÁRIO tiver violado as Regras de Conduta, estes Termos ou a Legislação;</li>
                  <li>Se houver manipulação dos dados ou inveracidade de extratos e documentos
                  comprobatórios.</li>
                </ul>
                
                <p className="font-medium">4.5. Demais Condições e Procedimentos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A Garantia Condicional cobre exclusivamente o valor investido no INFOPRODUTO, não
                  cobrindo-me nenhuma hipótese prejuízos com operações realizadas pelo USUÁRIO,
                  tendo adotado ou não os sinais providos pelo INFOPRODUTO;</li>
                  <li>A solicitação da Garantia Condicional deve ser feita somente ao final dos 12 (doze)
                  meses de utilização do INFOPRODUTO, com documentação comprobatória dos critérios
                  de elegibilidade enviada em até 15 (quinze) dias após o término do período.</li>
                  <li>A PRODUTORA se reserva ao direito de solicitar documentos e esclarecimentos
                  adicionais para fins de verificação do cumprimento dos critérios de elegibilidade.</li>
                  <li>Após o recebimento de todos os documentos necessários para a comprovação do
                  cumprimento dos critérios de elegibilidade, a PRODUTORA terá o prazo de 30 (trinta)
                  dias para analisar a documentação e efetuar a devolução da totalidade do preço pago
                  pelo INFOPRODUTO ao USUÁRIO.</li>
                  <li>Caso o USUÁRIO observe todos os critérios de elegibilidade, após a análise da
                  PRODUTORA, a PRODUTORA realizará o pagamento da totalidade do preço pago pelo
                  INFOPRODUTO ao USUÁRIO, no prazo de 5 (cinco) dias úteis, em conta bancária de
                  titularidade do USUÁRIO indicada no momento da solicitação da Garantia Condicional.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">8. LIMITAÇÃO DE RESPONSABILIDADE</h2>
              <div className="space-y-3">
                <p>5.1. O CLIENTE declara estar ciente de que o mercado de criptomoedas e ativos financeiros
                envolve riscos inerentes, e que os sinais fornecidos são apenas sugestões e não garantem lucro.</p>
                <p>5.2. A EMPRESA não se responsabiliza por perdas financeiras, falhas de execução, erros de
                corretora ou decisões do CLIENTE fora do escopo dos sinais.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">9. OBRIGAÇÕES DA PRODUTORA</h2>
              <div className="space-y-3">
                <p>9.1. São obrigações da PRODUTORA: (i) fornecer o acesso do INFOPRODUTO ao USUÁRIO,
                desde que este cumpra com suas obrigações; (ii) oferecer suporte ao USUÁRIO no que tange às
                questões técnicas e conceituais do conteúdo disponibilizado no INFOPRODUTO; (iii) cumprir com
                as obrigações previstas nestes Termos e na legislação.</p>
                <p>9.2. A PRODUTORA oferecerá suporte em relação a dúvidas teóricas, em até 72 horas úteis,
                apenas na área de membros ou diretamente a cada USUÁRIO, após o recebimento de dúvidas
                relacionadas ao INFOPRODUTO e ao seu conteúdo.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">10. OBRIGAÇÕES DO USUÁRIO</h2>
              <div className="space-y-3">
                <p>10.1. São obrigações do USUÁRIO: (i) possuir acesso à internet, bem como os equipamentos de
                informática necessários para utilização do INFOPRODUTO; (ii) realizar os pagamentos da compra
                do INFOPRODUTO, conforme os termos da aquisição junto a Plataforma; (iii) respeitar as normas
                de convívio social e de conduta, inclusive nos grupos que faça parte relacionados ao
                INFOPRODUTO; (iv) manter seus dados cadastrais atualizados; (v) cumprir com as obrigações
                previstas nestes Termos e na legislação.</p>
                <p>10.2. O USUÁRIO se responsabiliza civil e criminalmente por todos os seus atos, palavras e
                atitudes adotadas perante a PRODUTORA e demais USUÁRIOS, devendo respeitar a legislação,
                os termos e regulamentos da Plataforma e demais sites, não podendo compartilhar conteúdos
                que incentive crimes ou qualquer forma de violência, ofensa, discriminação, hostilização,
                incorporem vírus, mensagens de teor político ou religioso, conteúdos falsos, desrespeitosos, que
                violem, discriminem ou perturbem outros USUÁRIOS, resguardando-se a PRODUTORA no
                direito de excluir conteúdos que forem compartilhados fora das regras, e remover o USUÁRIO
                dos grupos e seu acesso ao INFOPRODUTO, sem aviso prévio e sem prejuízo de eventual
                rescisão contratual ("Regras de Conduta").</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">11. SUSPENSÃO, INTERRUPÇÃO E CANCELAMENTO DO ACESSO</h2>
              <div className="space-y-3">
                <p>11.1. O acesso ao INFOPRODUTO e grupos relacionados, poderá ser suspenso, interrompido ou
                cancelado, sem necessidade de aviso prévio, em casos de: (i) atraso no pagamento (ii) violação à
                regras de condutas, conforme cláusula 10.2 acima; (iii) compartilhamento de senhas e acessos do
                INFOPRODUTO para terceiros; (iv) em caso de atividades suspeitas; (v) para apuração de
                irregularidades; (vi) para manutenção, sem que nada seja devido pela PRODUTORA, em razão
                de tal suspensão, interrupção ou cancelamento, ou seja, não havendo direito a reembolso total ou
                parcial.</p>
                <p>11.1. Nas hipóteses (ii), (iii), (iv) e (v) acima a PRODUTORA poderá proibir a aquisição posterior
                de qualquer infoproduto por si produzido pelo USUÁRIO que já tiver criado transtornos e violado
                regras de conduta.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">12. DIREITOS AUTORAIS E PROPRIEDADE INTELECTUAL</h2>
              <div className="space-y-3">
                <p>12.1. O INFOPRODUTO é disponibilizado para o USUÁRIO, de maneira não exclusiva, e seu uso
                é estritamente pessoal e não comercial, e a aquisição não transfere os direitos de propriedade
                intelectual incidentes sobre o mesmo, sendo que, quaisquer conteúdos, aplicações, programas,
                softwares, materiais de apoio, textos, vídeos, áudios, desenhos, imagens, fotografias, layout,
                gráficos, e-books, logotipos, etc, são de propriedade da PRODUTORA, desta forma, compromete-
                se o USUÁRIO a não indevidamente reproduzi-los, copiá-los, comercializá-los, cedê-los, sem
                autorização sob pena das sanções civis e criminais. O Expert que ministra o INFOPRODUTO
                autoriza a PRODUTORA a utilizar a sua imagem, nome e voz, desse modo, qualquer reprodução
                indevida constitui, além da violação de direitos de propriedade intelectual, violação dos direitos de
                imagem, nome e voz do Expert, o qual será de responsabilidade exclusiva do USUÁRIO.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">13. DADOS PESSOAIS</h2>
              <div className="space-y-3">
                <p>13.1. Mediante a aceitação destes Termos, o USUÁRIO dá inequívoca autorização e
                consentimento a fim de que seus dados pessoais (nome, RG, CPF, e-mail, telefone), sejam
                tratados, pela PRODUTORA, de acordo com a Lei nº 13.709/18 (Lei Geral de Proteção de
                Dados), os quais poderão ser utilizados para as seguintes finalidades: (i) identificação do
                USUÁRIO; (ii) autorização do pagamento, (iii) atender às solicitações e dúvidas, (iv) colaborar
                e/ou cumprir ordem judicial ou requisição por autoridade administrativa. O uso, acesso e
                compartilhamento de dados pessoais serão feitos dentro dos limites e propósitos das atividades
                da PRODUTORA, e o USUÁRIO poderá a qualquer momento, mediante requisição pelo e-mail
                contato@k17.com.br ter acesso aos dados, exigir correções ou revogar o consentimento para
                tratamento, ficando ciente desde já que a revogação poderá implicar em prejuízo ao fornecimento
                adequado do INFOPRODUTO.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">14. CESSÃO DE DIREITOS DE IMAGEM E VOZ</h2>
              <div className="space-y-3">
                <p>14.1. Através da aceitação do presente, o USUÁRIO autoriza a captação e utilização de imagem,
                nome, vídeo, voz, texto e depoimento, decorrentes especialmente da participação do
                INFOPRODUTO e eventos relacionados, podendo a PRODUTORA, gravar, editar, reproduzir sem
                qualquer intenção e sem que nada seja devido ao USUÁRIO.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">15. EXCLUSÃO DE RESPONSABILIDADES</h2>
              <div className="space-y-3">
                <p>15.1. O INFOPRODUTO é disponibilizado de forma digital, desta forma, o USUÁRIO tem ciência
                que a PRODUTORA não poderá garantir o pleno funcionamento destes canais de titularidade de
                terceiros, não sendo responsável por qualquer dano decorrente do acesso à Plataforma e
                aplicativo de ataques hackers, perda de servidores, indisponibilidade e outras causas alheias ao
                controle da PRODUTORA.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">16. CANCELAMENTO E REEMBOLSO</h2>
              <div className="space-y-3">
                <p>16.1. O USUÁRIO pode cancelar a assinatura a qualquer momento, mas não haverá reembolso
                proporcional, salvo exceções previstas na legislação de proteção ao consumidor ou na cláusula
                de garantia.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">17. PRIVACIDADE E SEGURANÇA</h2>
              <div className="space-y-3">
                <p>17.1. As informações fornecidas pelo USUÁRIO são armazenadas com segurança e utilizadas
                conforme nossa Política de Privacidade.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">18. DISPOSIÇÕES GERAIS</h2>
              <div className="space-y-3">
                <p>18.1. A PRODUTORA se reserva o direito de alterar estes termos a qualquer momento, mediante
                publicação na rede mundial de internet.</p>
                <p>18.2. O presente instrumento não implica na constituição de nenhum tipo de sociedade,
                associação ou qualquer relação de trabalho ou emprego, nem estabelece qualquer
                responsabilidade entre as partes.</p>
                <p>18.3. Se qualquer parte deste for considerada inválida ou inexequível as demais disposições
                permanecerão em pleno vigor e efeito.</p>
                <p>18.4. A tolerância de qualquer das partes das obrigações assumidas neste instrumento não
                implicará na renúncia ou dispensa, nem importará em novação.</p>
                <p>18.5. Todas as notificações e comunicações por parte da PRODUTORA ao USUÁRIO serão
                consideradas eficazes, para todos os efeitos, quando forem dirigidas ao e-mail informado no
                momento de seu cadastro e/ou ao número de whatsapp indicado, sendo de sua responsabilidade
                informar eventuais alterações.</p>
                <p>18.6. A PRODUTORA poderá realizar qualquer alteração da plataforma ou infoproduto, conforme
                julgar necessário, sem que isso acarrete em qualquer prejuízo ao USUÁRIO.</p>
                <p>18.2. Esse Termo será regido pelas leis do Brasil, sendo eleito o foro da comarca de Cajamar,
                Estado de São Paulo, como competente para resolver eventuais conflitos decorrentes destes
                Termos, com renúncia a qualquer outro por mais privilegiado que seja ou venha a ser.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#00FF00]">20. ACEITAÇÃO</h2>
              <div className="space-y-3">
                <p>20.1. Ao adquirir o INFOPRODUTO, o USUÁRIO declara ter lido, compreendido e concordado
                com todos os termos e condições descritos nestes Termos.</p>
                <p>Contato<br />
                Em caso de dúvidas ou sugestões sobre este Termo, entre em contato com a PRODUTORA
                através do e-mail contato@k17.com.br.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/recor"
            className="inline-block px-8 py-3 bg-[#00FF00] text-black font-bold rounded-lg hover:bg-[#00FF00]/90 transition-colors"
          >
            Voltar
          </a>
        </div>
      </div>
    </div>
  );
} 