import { useState, useEffect } from 'react'

const allCourses = [
  { id: 1, title: "React Dasar", desc: "Belajar React dari 0 pakai HP Android", tag: "Frontend" },
  { id: 2, title: "Tailwind Mastery", desc: "Styling cepat tanpa pusing CSS", tag: "Design" },
  { id: 3, title: "Git & GitHub", desc: "Push project dari Termux ke Netlify", tag: "Tools" },
  { id: 4, title: "Netlify Deploy", desc: "Deploy otomatis dari GitHub", tag: "DevOps" },
]

export default function Courses() {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const t = setTimeout(() => {
      setCourses(allCourses)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight">Daftar Course</h1>
        <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-white/50 mt-1">
          Koleksi materi yang rapi, mobile-friendly, dan siap dipelajari.
        </p>
      </div>

      {loading? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-[148px] rounded-2xl bg-zinc-100 dark:bg-white/[0.06] animate-pulse border border-zinc-200 dark:border-white/5"></div>
          ))}
        </div>
      ) : courses.length === 0? (
        <div className="border border-dashed border-zinc-300 dark:border-white/10 rounded-2xl p-10 text-center bg-white dark:bg-white/[0.03]">
          <div className="w-12 h-12 mx-auto rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-xl mb-3">📚</div>
          <h3 className="font-semibold text-[15px]">Belum ada course</h3>
          <p className="text-[13px] text-zinc-500 dark:text-white/40 mt-1 max-w-[260px] mx-auto">Course akan muncul di sini setelah ditambahkan. Saat ini masih kosong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="group bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 p-5 rounded-2xl hover:border-zinc-300 dark:hover:border-white/20 transition">
              <span className="inline-flex text-[10px] tracking-wide font-semibold bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 px-2.5 py-1 rounded-full">{c.tag}</span>
              <h3 className="text-[16px] font-semibold mt-4 leading-tight">{c.title}</h3>
              <p className="text-[13px] text-zinc-500 dark:text-white/50 mt-1.5 leading-5">{c.desc}</p>
              <button className="mt-4 w-full min-h-[44px] bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
