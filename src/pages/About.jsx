export default function About() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Tentang ARSHA.CODES</h1>
      <p className="text-white/60 leading-relaxed mb-4">
        ARSHA E-LEARNING dibangun 100% dari HP Android menggunakan Termux.
        Tidak pakai laptop, tidak pakai VS Code desktop.
      </p>
      <div className="bg-white/[0.05] border border-white/10 p-6 rounded-2xl mt-6">
        <h3 className="font-semibold mb-2">Tech Stack Tahap 2B:</h3>
        <ul className="text-sm text-white/50 space-y-1 list-disc pl-5">
          <li>React + Vite</li>
          <li>Tailwind CSS v4 (@tailwindcss/vite)</li>
          <li>React Router DOM</li>
          <li>GitHub + Netlify Auto Deploy</li>
          <li>100% Termux HP Only</li>
        </ul>
      </div>
    </div>
  )
}
