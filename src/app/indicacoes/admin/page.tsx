'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Item = {
  rank: number
  referrerId: string | null
  name: string
  whatsapp: string
  referralCode: string
  totalIndicacoes: number
  ultimoConvite: string | null
}

function formatDate(dt?: string | null) {
  if (!dt) return '—'
  try {
    const d = new Date(dt)
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(d)
  } catch {
    return '—'
  }
}

function maskPhone(phone: string) {
  const d = (phone || '').replace(/\D/g, '')
  if (d.length < 10) return phone || '—'
  const area = d.slice(0, 2)
  const first = d.slice(2, 7)
  const last = d.slice(7)
  return `(${area}) ${first}-${last}`
}

export default function AdminTopIndicadoresPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [limit, setLimit] = useState('20')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const queryString = useMemo(() => {
    const p = new URLSearchParams()
    if (limit) p.set('limit', limit)
    if (from) p.set('from', from)
    if (to) p.set('to', to)
    return p.toString()
  }, [limit, from, to])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
      if (!token) {
        router.push('/admin/login')
        return
      }
      const res = await fetch(`/api/top-indicadores?${queryString}`, {
        cache: 'no-store',
        headers: { 'x-admin-token': token }
      })
      if (res.status === 401) {
        try { localStorage.removeItem('admin_token') } catch {}
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Falha ao carregar ranking')
      const data = await res.json()
      const mapped: Item[] = (data?.items || []).map((x: any) => ({
        ...x,
        ultimoConvite: x.ultimoConvite ? new Date(x.ultimoConvite).toISOString() : null,
      }))
      setItems(mapped)
    } catch (e: any) {
      setError(e.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const exportCsv = () => {
    const header = ['#', 'Nome', 'WhatsApp', 'ReferralCode', 'Indicações', 'Último Convite']
    const rows = items.map(i => [
      i.rank,
      i.name,
      i.whatsapp,
      i.referralCode,
      i.totalIndicacoes,
      formatDate(i.ultimoConvite)
    ])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `top-indicadores-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="w-full px-4 py-4 border-b border-neutral-900 flex items-center gap-3">
        <Image src="/logo1.png" alt="Futuros Tech" width={28} height={28} className="brightness-0 invert" />
        <h1 className="text-lg font-semibold">Admin • Top Indicadores</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <section className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-1">
              <label className="block text-xs text-neutral-400 mb-1">Limite</label>
              <input value={limit} onChange={e => setLimit(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">De (YYYY-MM-DD)</label>
              <input value={from} onChange={e => setFrom(e.target.value)} placeholder="2025-10-01" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">Até (YYYY-MM-DD)</label>
              <input value={to} onChange={e => setTo(e.target.value)} placeholder="2025-11-03" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={load} className="px-4 py-2 text-sm rounded bg-green-600 hover:bg-green-500">Atualizar</button>
            <button onClick={exportCsv} className="px-4 py-2 text-sm rounded bg-neutral-800 hover:bg-neutral-700">Exportar CSV</button>
          </div>
        </section>

        <section className="bg-neutral-950/70 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-900 text-neutral-300">
                <tr>
                  <th className="text-left px-3 py-2">#</th>
                  <th className="text-left px-3 py-2">Nome</th>
                  <th className="text-left px-3 py-2">WhatsApp</th>
                  <th className="text-left px-3 py-2">Referral</th>
                  <th className="text-left px-3 py-2">Indicações</th>
                  <th className="text-left px-3 py-2">Último Convite</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={6} className="px-3 py-8 text-center text-neutral-400">Carregando...</td></tr>
                )}
                {error && !loading && (
                  <tr><td colSpan={6} className="px-3 py-8 text-center text-red-400">{error}</td></tr>
                )}
                {!loading && !error && items.length === 0 && (
                  <tr><td colSpan={6} className="px-3 py-8 text-center text-neutral-400">Nenhum indicador encontrado.</td></tr>
                )}
                {!loading && !error && items.map((it) => (
                  <tr key={it.referrerId ?? `rank-${it.rank}`} className="border-t border-neutral-900">
                    <td className="px-3 py-2 text-neutral-400">{it.rank}</td>
                    <td className="px-3 py-2 font-medium">{it.name}</td>
                    <td className="px-3 py-2">{maskPhone(it.whatsapp)}</td>
                    <td className="px-3 py-2">
                      <code className="bg-neutral-900 px-2 py-1 rounded border border-neutral-800 text-xs">{it.referralCode}</code>
                    </td>
                    <td className="px-3 py-2">{it.totalIndicacoes}</td>
                    <td className="px-3 py-2">{formatDate(it.ultimoConvite)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
