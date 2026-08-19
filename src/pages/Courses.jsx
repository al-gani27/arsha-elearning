export default function Courses() {
  const courses = [
    { id: 1, title: "React Dasar", desc: "Belajar React dari 0 pakai HP", tag: "Frontend" },
    { id: 2, title: "Tailwind Mastery", desc: "Styling cepat tanpa pusing CSS", tag: "Design" },
    { id: 3, title: "Git & GitHub", desc: "Push project dari Termux", tag: "Tools" },
    { id: 4, title: "Netlify Deploy", desc: "Deploy otomatis dari GitHub", tag: "DevOps" },
  ]
  return (
    <div className="px-6 md:px-12 py-12">
      <h1 className="text-3xl font-bold mb-2">Daftar Course</h1>
      <p className="text-white/50 text-sm mb-8">Tahap 2B - Dummy data dulu, nanti connect Supabase di Tahap 3</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white/[0.05] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition">
            <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2.5 py-1 rounded-full">{c.tag}</span>
            <h3 className="text-lg font-semibold mt-4">{c.title}</h3>
            <p className="text-sm text-white/50 mt-1">{c.desc}</p>
            <button className="mt-4 text-sm bg-white text-black px-4 py-2 rounded-full font-semibold">Lihat Detail</button>
          </div>
        ))}
      </div>
    </div>
  )
}
