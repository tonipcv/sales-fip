/* eslint-disable */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { countries } from '@/lib/countries'

// ConverteAI vturb player component (SSR-safe): render placeholder and init on client
function VturbPlayer({ accountId, playerId }: { accountId: string; playerId: string }) {
  const containerId = `vturb-container-${playerId}`
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = document.getElementById(containerId)
    if (!container) return

    // Reset container and inject custom element
    container.innerHTML = ''
    const playerEl = document.createElement('vturb-smartplayer') as any
    playerEl.id = `vid-${playerId}`
    ;(playerEl as HTMLElement).style.display = 'block'
    ;(playerEl as HTMLElement).style.margin = '0 auto'
    ;(playerEl as HTMLElement).style.width = '100%'
    container.appendChild(playerEl)

    // Remove previous scripts for this playerId
    try {
      const prev = Array.from(document.querySelectorAll(`script[data-vturb-player="${playerId}"]`))
      prev.forEach((n) => n.parentElement?.removeChild(n))
    } catch {}

    // Inject script (re-executes even if cached)
    const s = document.createElement('script')
    s.src = `https://scripts.converteai.net/${accountId}/players/${playerId}/v4/player.js`
    s.async = true
    s.setAttribute('data-vturb-player', playerId)
    document.head.appendChild(s)

    return () => {
      try { document.head.removeChild(s) } catch {}
      try { container.innerHTML = '' } catch {}
    }
  }, [playerId, containerId])

  return <div id={containerId} className="w-full" />
}

// Small copy badge component
function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      className="px-2 py-1 text-xs rounded bg-orange-800/40 hover:bg-orange-700/50 border border-orange-700 text-orange-200"
      title="Copiar"
    >
      {copied ? 'Copiado!' : text}
    </button>
  )
}

// Build a referral link for this site
function ReferralLink({ referralCode }: { referralCode: string }) {
  const [href, setHref] = useState('')
  useEffect(() => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      if (origin && referralCode) setHref(`${origin}/indicacoes?indicacao=${encodeURIComponent(referralCode)}`)
    } catch {}
  }, [referralCode])
  if (!referralCode) return null
  return <CopyBadge text={href || referralCode} />
}

// Modal content for showing the referral link and warning
function ReferralModalContent({ referralCode }: { referralCode: string }) {
  const [href, setHref] = useState('')
  useEffect(() => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      if (origin && referralCode) setHref(`${origin}/indicacoes?indicacao=${encodeURIComponent(referralCode)}`)
    } catch {}
  }, [referralCode])

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-gray-400 mb-1">Link de indicação</label>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={href}
            className="flex-1 bg-black/40 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200"
          />
          <button
            type="button"
            onClick={() => { try { navigator.clipboard.writeText(href) } catch {} }}
            className="px-2 py-1 text-[11px] rounded border border-orange-700 text-orange-300 hover:bg-orange-900/20"
            title="Copiar"
          >
            Copiar
          </button>
        </div>
      </div>
      <div className="text-[11px] text-gray-400 leading-relaxed">
        <p className="font-semibold text-amber-300 mb-1">Atenção:</p>
        <p>
          Indique amigos para testar a Automação Gratuitamente e tenha benefícios!
        </p>
        <p className="mt-1">
          (Válido somente para quem estiver no grupo. Pedimos o número e testamos para ver se o membro está no grupo.)
        </p>
      </div>
    </div>
  )
}

interface Episode {
  id: number
  number: number
  title: string
  playerId: string
  accountId: string
  duration?: string
}

export default function SeriesPagePublic() {
  const [activeEpisode, setActiveEpisode] = useState<number>(1)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [aula1CtaVisible, setAula1CtaVisible] = useState(false)
  const [aula2CtaVisible, setAula2CtaVisible] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Gate: block page until WhatsApp is submitted
  const [gated, setGated] = useState(true)
  const [whatsInput, setWhatsInput] = useState("")
  const [gateLoading, setGateLoading] = useState(false)
  const [gateError, setGateError] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState("")
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(
    countries.find(c => c.code === 'BR') || countries[0]
  )

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('testeAutomacaoWhatsapp') : null
      const savedReferral = typeof window !== 'undefined' ? localStorage.getItem('testeAutomacaoReferralCode') : null
      if (saved) setGated(false)
      if (savedReferral) setReferralCode(savedReferral)
    } catch {}
  }, [])

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (selectedCountry.code !== 'BR') {
      return digits.slice(0, 20) // internacional sem máscara
    }
    const br = digits.slice(0, 11)
    if (br.length <= 2) return br
    if (br.length <= 7) return `(${br.slice(0,2)}) ${br.slice(2)}`
    return `(${br.slice(0,2)}) ${br.slice(2,7)}-${br.slice(7)}`
  }

  const submitWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault()
    setGateError(null)
    const digits = whatsInput.replace(/\D/g, '')
    if (digits.length < 8) {
      setGateError('Informe um WhatsApp válido.')
      return
    }
    setGateLoading(true)
    try {
      const dialDigits = selectedCountry.dial.replace(/\D/g, '')
      const fullDigits = digits.startsWith(dialDigits) ? digits : `${dialDigits}${digits}`
      const res = await fetch('/api/capture-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp: fullDigits, source: 'teste-automacao', country: selectedCountry.code })
      })
      if (!res.ok) throw new Error('Falha ao salvar seu WhatsApp. Tente novamente.')
      // Upsert Member and generate/retrieve coupon
      const upsert = await fetch('/api/membros-teste-automacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Visitante', whatsapp: fullDigits, indicacao: '' })
      })
      if (!upsert.ok) throw new Error('Não foi possível gerar seu cupom agora. Tente novamente.')
      const data = await upsert.json()
      try {
        localStorage.setItem('testeAutomacaoWhatsapp', fullDigits)
        localStorage.setItem('testeAutomacaoReferralCode', data?.member?.referralCode || '')
      } catch {}
      setReferralCode(data?.member?.referralCode || '')
      setGated(false)
    } catch (err: any) {
      setGateError(err.message || 'Erro inesperado.')
    } finally {
      setGateLoading(false)
    }
  }

  useEffect(() => {
    // Countdown to 08 Sep 2025 19:00 (UTC-3)
    const target = new Date('2025-09-08T19:00:00-03:00').getTime()
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ d, h, m, s })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const episodes: Episode[] = [
    { id: 1, number: 1, title: 'Começando do Absoluto Zero e Instalando a Automação pelo Celular', playerId: '68f8d1e9077f8febd9bea317', accountId: '17e2196c-5794-49ef-bd61-857538a02fa6' },
    { id: 2, number: 2, title: 'Instalando a Estratégia da Automação do Zero', playerId: '68f8d6d8c376aaf61f78271a', accountId: '17e2196c-5794-49ef-bd61-857538a02fa6' },
    { id: 3, number: 3, title: 'Ativando a Automação no Celular', playerId: '68f8cb427e181d1f6b405915', accountId: '17e2196c-5794-49ef-bd61-857538a02fa6' },
    { id: 4, number: 4, title: 'Como aumentar a perfomance da Automação', playerId: '68f8cddabdc66d89c2c0fef1', accountId: '17e2196c-5794-49ef-bd61-857538a02fa6' },
  ]

  const currentEpisode = episodes.find((e) => e.id === activeEpisode)!
  
  // Troca de episódio
  const handleEpisodeChange = (id: number) => {
    if (id === activeEpisode) return
    setActiveEpisode(id)
  }

  // Mostrar CTA após delay por aula: Aula 1 -> 30s, Aula 2 -> 20s
  useEffect(() => {
    setAula1CtaVisible(false)
    setAula2CtaVisible(false)
    let timer: any
    if (activeEpisode === 1) {
      timer = setTimeout(() => setAula1CtaVisible(true), 30000)
    } else if (activeEpisode === 2) {
      timer = setTimeout(() => setAula2CtaVisible(true), 20000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [activeEpisode])

  return (
    <div className={`min-h-screen bg-[#111] text-gray-200 ${gated ? 'overflow-hidden' : ''}`}>
      {/* Gate Modal - Blocks content until WhatsApp is provided */}
      {gated && (
        <div className="fixed inset-0 z-[9999]" style={{ zIndex: 2147483647 }}>
          <div className="absolute inset-0 bg-black/90" />
          <div className="relative h-full flex items-center justify-center p-4">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-center mb-6">
                <Image src="/logo1.png" alt="Futuros Tech" width={96} height={96} className="rounded brightness-0 invert" />
              </div>
              <p className="text-center text-gray-400 text-sm mb-6">Informe seu WhatsApp para liberar o teste da Automação exclusivo para você.</p>
              <form onSubmit={submitWhatsapp} className="space-y-4">
                <div>
                  <label htmlFor="gate-whats" className="block text-sm text-gray-300 mb-2">WhatsApp</label>
                  <div className="flex gap-2">
                    <select
                      aria-label="País"
                      className="bg-black border border-gray-800 rounded-lg px-3 py-2.5 text-white text-base md:text-sm focus:outline-none focus:border-gray-700"
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const c = countries.find(x => x.code === e.target.value) || countries[0]
                        setSelectedCountry(c)
                      }}
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>
                      ))}
                    </select>
                    <input
                      id="gate-whats"
                      type="tel"
                      value={whatsInput}
                      onChange={(e) => setWhatsInput(formatWhatsapp(e.target.value))}
                      placeholder={selectedCountry.code === 'BR' ? '(00) 00000-0000' : 'Somente números'}
                      maxLength={selectedCountry.code === 'BR' ? 15 : 20}
                      className="flex-1 bg-black border border-gray-800 rounded-lg px-4 py-2.5 text-white text-base md:text-sm focus:outline-none focus:border-gray-700"
                      required
                    />
                  </div>
                </div>
                <p className="text-[11px] text-amber-300 mt-1">Coloque o seu número correto, os benefícios serão liberados para esse número.</p>
                {gateError && <div className="text-red-400 text-sm">{gateError}</div>}
                <button
                  type="submit"
                  disabled={gateLoading}
                  className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                >
                  {gateLoading ? 'Enviando...' : 'Liberar acesso'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start">
          <div className="flex items-center">
            <Image src="/logo1.png" alt="Futuros Tech Logo" width={40} height={40} className="brightness-0 invert" />
          </div>
        </div>
      </header>

      {/* Referral Link Bottom Bar */}

      {/* Main Content */}
      <main className="pt-14 pb-28">
        {/* Mobile-only Countdown at Top */}
        <div className="block md:hidden px-4 mt-2">
          <section className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
            {referralCode ? (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowReferralModal(true)}
                  className="px-4 py-2 text-xs rounded border border-orange-700 text-orange-300 hover:bg-orange-900/20"
                >
                  Ver meu link de indicação
                </button>
              </div>
            ) : (
              <>
                <p className="text-center text-sm text-gray-300 font-semibold mb-3">Versão 10x será liberada em:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Dias', value: timeLeft.d },
                    { label: 'Horas', value: timeLeft.h },
                    { label: 'Min', value: timeLeft.m },
                    { label: 'Seg', value: timeLeft.s },
                  ].map((item) => (
                    <div key={item.label} className="text-center bg-black/40 rounded-lg py-2 border border-gray-800">
                      <div className="text-3xl font-bold text-orange-400 leading-none">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-xs uppercase tracking-wide text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
        {/* Video Player Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto px-4 mt-4">
          {/* Title above video */}
          <h2 className="text-lg md:text-xl font-bold text-white text-center mt-5 mb-5 md:mt-8 md:mb-6">{currentEpisode.title}</h2>
          <div className="bg-black">
            <VturbPlayer key={currentEpisode.playerId} accountId={currentEpisode.accountId} playerId={currentEpisode.playerId} />
          </div>
          <div className="px-0 py-4">
            {activeEpisode === 1 && aula1CtaVisible && (
              <div className="mt-4 flex flex-col items-center gap-4">
                <a
                  href="https://one.exnesstrack.org/a/jo986i1iel?platform=mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl border border-orange-500 bg-orange-700 text-white text-base font-semibold shadow-[0_0_28px_rgba(249,115,22,0.35)] hover:bg-orange-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M5 20h14v-2H5v2Zm7-3 5-5h-3V4h-4v8H7l5 5Z" />
                  </svg>
                  BAIXAR APP
                </a>
              </div>
            )}
            {activeEpisode === 2 && aula2CtaVisible && (
              <div className="mt-4 flex flex-col items-center gap-4">
                {/* Filled green MT5 button (neon) */}
                <a
                  href="https://www.exness.com/pt/metatrader-5/?utm_source=partners&campaign=34785&track1=Baixar&ex_ol=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl border border-orange-500 bg-orange-700 text-white text-base font-semibold shadow-[0_0_28px_rgba(249,115,22,0.35)] hover:bg-orange-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M5 20h14v-2H5v2Zm7-3 5-5h-3V4h-4v8H7l5 5Z" />
                  </svg>
                  BAIXAR MT5
                </a>
                {/* Outlined green GOLD SYSTEM button (neon outline) */}
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(true)}
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl border-2 border-orange-500 text-orange-200 text-base font-semibold hover:bg-orange-600/10 shadow-[0_0_28px_rgba(249,115,22,0.25)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M8 5v14l11-7L8 5Z" />
                  </svg>
                  BAIXAR V2
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Episodes List and Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto gap-0">
          {/* Episodes List */}
          <div className="md:h-[calc(100vh-11rem)] lg:h-[calc(100vh-11rem)] md:overflow-y-auto lg:overflow-y-auto px-4 pb-2 md:p-4 lg:p-4 episode-list">
            <div className="space-y-1 lg:space-y-2">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => handleEpisodeChange(episode.id)}
                  className={`w-full flex gap-3 p-3 rounded-lg transition-colors ${
                    activeEpisode === episode.id ? 'bg-gray-400/30 border-l-4 border-orange-300' : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-orange-300 text-lg md:text-sm">Aula {episode.number}</h3>
                    <p className="text-base md:text-xs text-gray-200">{episode.title}</p>
                    {episode.duration && <p className="text-xs text-gray-400 mt-1">{episode.duration}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content and Materials */}
          <div className="hidden md:space-y-4 lg:space-y-4 px-4 md:p-4 lg:p-4 md:block">
            <section className="bg-gray-900/40 p-3 lg:p-4 rounded-lg border border-gray-800">
              {referralCode ? (
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setShowReferralModal(true)}
                    className="px-4 py-2 text-xs rounded border border-orange-700 text-orange-300 hover:bg-orange-900/20"
                  >
                    Ver meu link de indicação
                  </button>
                </div>
              ) : (
                <>
                  {/* Countdown only */}
                  <p className="text-center text-sm md:text-base text-gray-300 font-semibold mb-3">Versão 10x será liberada em:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Dias', value: timeLeft.d },
                      { label: 'Horas', value: timeLeft.h },
                      { label: 'Min', value: timeLeft.m },
                      { label: 'Seg', value: timeLeft.s },
                    ].map((item) => (
                      <div key={item.label} className="text-center bg-black/40 rounded-lg py-2 border border-gray-800">
                        <div className="text-3xl md:text-2xl font-bold text-orange-400 leading-none">{String(item.value).padStart(2, '0')}</div>
                        <div className="text-xs md:text-[10px] uppercase tracking-wide text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        </div>

        {/* Fixed Bottom Actions removed */}

        <a
          href={`https://wa.me/5511958072826?text=${encodeURIComponent('Olá! Quero ajuda com a Automação Teste e receber o acesso oficial no dia 3 de Novembro.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg shadow-orange-900/30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.17 1.6 5.99L0 24l6.23-1.67a11.86 11.86 0 005.83 1.55h.01c6.59 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.19-3.49-8.46zM12.07 21.3h-.01a9.35 9.35 0 01-4.77-1.31l-.34-.2-3.7.99.99-3.6-.22-.37a9.28 9.28 0 01-1.42-4.88c0-5.16 4.2-9.36 9.37-9.36a9.3 9.3 0 019.35 9.36c0 5.16-4.2 9.37-9.35 9.37zm5.33-6.99c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.6-2-.17-.29-.02-.45.13-.6.13-.12.29-.33.43-.49.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.45 0 1.45 1.03 2.85 1.18 3.05.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.33.19 1.83.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
          </svg>
        </a>

        {/* Download Terms Modal */}
        {showDownloadModal && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
          >
            <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-xl shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex items-start justify-between">
                <h3 id="download-modal-title" className="text-base font-semibold text-gray-100">
                  Leia os Termos antes de baixar
                </h3>
                <button
                  aria-label="Fechar"
                  onClick={() => {
                    setShowDownloadModal(false)
                    setAcceptedTerms(false)
                  }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-3 text-sm text-gray-300">
                <p>
                  Esta é uma versão de teste destinada apenas a fins de avaliação. A leitura e concordância com os
                  <Link href="/termos-automatizador" className="ml-1 text-orange-400 hover:text-orange-300 underline">Termos de Uso</Link>
                  são obrigatórias antes de prosseguir.
                </p>
              </div>
              {/* Terms acceptance checkbox */}
              <div className="px-4 pb-2">
                <label className="flex items-start gap-2 text-xs text-gray-300">
                  <input
                    id="accept-terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-black/40"
                  />
                  <span>
                    Declaro que li e concordo com os
                    <Link href="/termos-automatizador" className="ml-1 text-orange-400 hover:text-orange-300 underline">Termos de Uso</Link>.
                  </span>
                </label>
              </div>
              <div className="px-4 pb-4 pt-2 flex items-center gap-3">
                <a
                  href="https://drive.google.com/drive/folders/1CtFOIF3mxnxoVrR0BvDlaWYRdhcx4Ld9?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!acceptedTerms}
                  className={`inline-flex items-center justify-center text-white text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    acceptedTerms ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-600/60 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!acceptedTerms) {
                      e.preventDefault()
                      e.stopPropagation()
                      return
                    }
                    setShowDownloadModal(false)
                    setAcceptedTerms(false)
                  }}
                >
                  Concordo e baixar no Drive
                </a>
                <button
                  type="button"
                  className="text-sm text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    setShowDownloadModal(false)
                    setAcceptedTerms(false)
                  }}
                >
                  Cancelar
                </button>
              </div>
              <div className="px-4 pb-4">
                <p className="text-[10px] leading-snug text-gray-400">
                  ESTE SOFTWARE É UM ARQUIVO DIGITAL E NÃO CONSTITUI CONSULTORIA, ASSESSORIA OU PROMESSA DE RENTABILIDADE.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Referral Modal */}
      {showReferralModal && referralCode && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowReferralModal(false)} />
          <div className="relative h-full flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-100">Seu link de indicação</h3>
                <button
                  aria-label="Fechar"
                  onClick={() => setShowReferralModal(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <ReferralModalContent referralCode={referralCode} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
