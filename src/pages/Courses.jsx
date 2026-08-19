import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      const { data, error } = await supabase
       .from('courses')
       .select('*')
       .eq('is_published', true)
       .order('created_at', { ascending: false })
      if (error) setError(error.message)
      else setCourses(data || [])
      setLoading(false)
    }
    fetchCourses()
  }, [])

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[26px] font-bold">DAFTAR COURSE</h1>
        <p className="text-[13px] text-zinc-500 dark:text-white/50 mt-1">Data langsung dari Supabase - {courses.length} course</p>
        {loading && <p className="mt-8 text-sm">Loading courses...</p>}
        {error && <p className="mt-8 text-sm text-red-500">Error: {error}</p>}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div key={course.id} className="border border-zinc-200 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-white/[0.05]">
              <p className="text-[11px] font-bold tracking-widest opacity-50">{course.category} • {course.level}</p>
              <h2 className="text-[18px] font-bold mt-2 leading-6">{course.title}</h2>
              <p className="text-[13px] mt-2 text-zinc-600 dark:text-white/60 leading-5 line-clamp-2">{course.description}</p>
              <p className="text-[13px] font-bold mt-4">{course.price === 0? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}</p>
              <p className="text-[10px] mt-2 opacity-40">{course.slug}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
