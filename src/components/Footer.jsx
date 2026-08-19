export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[13px] text-zinc-500 dark:text-white/40 text-center">
          © 2016 arsha.codes
        </p>
        <div className="flex items-center gap-4 text-[12px] text-zinc-400 dark:text-white/30">
          <span>100% Termux</span>
          <span className="w-1 h-1 bg-zinc-300 dark:bg-white/20 rounded-full"></span>
          <span>Vite + React</span>
          <span className="w-1 h-1 bg-zinc-300 dark:bg-white/20 rounded-full"></span>
          <span>Netlify</span>
        </div>
      </div>
    </footer>
  )
}
