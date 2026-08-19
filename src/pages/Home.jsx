import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/60 mb-6">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        TAHAP 2B LIVE - Router + Components
      </div>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
        ARSHA <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
          E-LEARNING
        </span>
      </h1>
      <p className="text-white/50 max-w-xl mb-8 text-sm md:text-base">
        Platform e-learning modern. Dibangun di Termux, di-push dari HP, live di Netlify.
        Sekarang sudah pakai struktur components & router.
      </p>
      <div className="flex gap-3">
        <Link to="/courses" className="bg-violet-600 hover:bg-violet-700 px-7 py-3 rounded-full text-sm font-semibold transition">
          Mulai Belajar
        </Link>
        <a href="https://github.com/al-gani27/arsha-elearning" target="_blank" className="bg-white/10 hover:bg-white/15 border border-white/10 px-7 py-3 rounded-full text-sm font-semibold transition">
          Lihat GitHub
        </a>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-8 text-center border-t border-white/10 pt-8 w-full max-w-2xl">
        <div>
          <h3 className="text-2xl font-bold">100%</h3>
          <p className="text-xs text-white/40">HP Only</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Router</h3>
          <p className="text-xs text-white/40">Active</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Live</h3>
          <p className="text-xs text-white/40">Netlify</p>
        </div>
      </div>
    </div>
  )
}
