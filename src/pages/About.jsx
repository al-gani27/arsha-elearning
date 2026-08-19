export default function About() {
  return (
    <div className="px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-2xl">
        <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight">Tentang arsha.codes</h1>
        <p className="text-[14px] leading-6 text-zinc-600 dark:text-white/60 mt-3">
          ARSHA E-LEARNING dibangun 100% dari HP Android menggunakan Termux.
          Fokus kami adalah pengalaman mobile-first: tombol besar, tidak ada horizontal scroll,
          dark/light mode rapi, dan performa ringan.
        </p>

        <div className="mt-8 bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 p-6 rounded-2xl">
          <h3 className="font-semibold text-[14px]">Tech Stack Tahap 2C</h3>
          <ul className="mt-3 space-y-2.5 text-[13px] text-zinc-600 dark:text-white/50">
            <li className="flex gap-2"><span className="text-zinc-300 dark:text-white/20">•</span> React + Vite - tetap ringan</li>
            <li className="flex gap-2"><span className="text-zinc-300 dark:text-white/20">•</span> Tailwind CSS v4 - styling mobile-first</li>
            <li className="flex gap-2"><span className="text-zinc-300 dark:text-white/20">•</span> React Router DOM - routing aman</li>
            <li className="flex gap-2"><span className="text-zinc-300 dark:text-white/20">•</span> localStorage - simpan tema dark/light</li>
            <li className="flex gap-2"><span className="text-zinc-300 dark:text-white/20">•</span> 100% Termux HP Only - tanpa laptop</li>
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20">
          <p className="text-[12px] text-violet-700 dark:text-violet-300 leading-5">
            Catatan: Tombol Login saat ini hanya tampilan saja (display only) sesuai instruksi Tahap 2C.
            Fitur autentikasi akan dikerjakan di tahap selanjutnya.
          </p>
        </div>
      </div>
    </div>
  )
}
