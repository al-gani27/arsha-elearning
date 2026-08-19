import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-20 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-4 animate-pulse">
          <div className="h-6 w-40 mx-auto bg-zinc-200 dark:bg-white/10 rounded-full"></div>
          <div className="h-12 w-full bg-zinc-200 dark:bg-white/10 rounded-2xl"></div>
          <div className="h-20 w-full bg-zinc-200 dark:bg-white/10 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6">
      {/* Hero */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-2 rounded-full text-[11px] tracking-wide text-zinc-600 dark:text-white/60 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          TAHAP 2C - UI FINAL
        </div>

        <h1 className="text-[36px] md:text-[64px] font-bold leading-[0.95] tracking-tight max-w-[320px] md:max-w-2xl">
          Belajar Koding
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400">
            Lebih Mudah
          </span>
        </h1>

        <p className="mt-5 text-[15px] md:text-[17px] leading-6 text-zinc-500 dark:text-white/50 max-w-[340px] md:max-w-xl">
          Platform e-learning ARSHA. Dibuat mobile-first, nyaman di HP, dark/light mode rapi, dan tanpa horizontal scroll.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-2 sm:px-0">
          <Link to="/courses" className="w-full sm:w-auto min-h-[48px] px-8 flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-full text-[14px] font-semibold transition">
            Mulai Belajar
          </Link>
          <Link to="/about" className="w-full sm:w-auto min-h-[48px] px-8 flex items-center justify-center bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-full text-[14px] font-semibold hover:bg-zinc-50 dark:hover:bg-white/15 transition">
            Tentang Kami
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 divide-x divide-zinc-200 dark:divide-white/10 border border-zinc-200 dark:border-white/10 rounded-2xl w-full max-w-[360px] md:max-w-xl overflow-hidden bg-white dark:bg-white/[0.03]">
          <div className="py-4 text-center">
            <p className="text-[18px] font-bold">100%</p>
            <p className="text-[11px] text-zinc-500 dark:text-white/40">HP Only</p>
          </div>
          <div className="py-4 text-center">
            <p className="text-[18px] font-bold">Mobile</p>
            <p className="text-[11px] text-zinc-500 dark:text-white/40">First</p>
          </div>
          <div className="py-4 text-center">
            <p className="text-[18px] font-bold">No Scroll</p>
            <p className="text-[11px] text-zinc-500 dark:text-white/40">Horizontal</p>
          </div>
        </div>
      </section>
    </div>
  )
}
