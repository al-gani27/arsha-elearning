import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Courses(){
  const [courses,setCourses]=useState([])
  useEffect(()=>{
    supabase.from('courses').select('*').eq('is_published',true).order('created_at',{ascending:false}).then(({data})=>setCourses(data||[]))
  },[])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Kursus</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(c=>(
          <Link key={c.id} to={`/courses/${c.id}`} className="border rounded-xl overflow-hidden hover:shadow-lg bg-white">
            <img 
              src={c.thumbnail || `https://placehold.co/400x225?text=${c.title}`} 
              alt={c.title}
              className="w-full h-40 object-cover bg-gray-100"
              onError={(e)=>{e.target.onerror=null; e.target.src=`https://placehold.co/400x225/2563eb/white?text=${encodeURIComponent(c.title)}`}}
            />
            <div className="p-4">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{c.category} • {c.level}</span>
              <h3 className="font-bold mt-2">{c.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
              <p className="mt-3 font-semibold">Rp {c.price?.toLocaleString('id-ID')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
