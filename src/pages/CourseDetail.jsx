import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
export default function CourseDetail(){
  const {id}=useParams()
  const [course,setCourse]=useState(null)
  useEffect(()=>{supabase.from('courses').select('*').eq('id',id).single().then(({data})=>setCourse(data))},[id])
  if(!course) return <div className="p-8">Loading...</div>
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/courses" className="text-blue-600">← Kembali</Link>
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-80 object-cover rounded-xl mt-4 bg-gray-100"
        onError={(e)=>{e.target.onerror=null; e.target.src=`https://placehold.co/800x400/2563eb/white?text=${encodeURIComponent(course.title)}`}}
      />
      <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
      <p className="text-gray-500 mt-1">{course.category} • {course.level}</p>
      <p className="text-xl font-bold mt-4">Rp {course.price?.toLocaleString('id-ID')}</p>
      <p className="mt-6 leading-relaxed">{course.description}</p>
      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl w-full">Enroll Sekarang</button>
    </div>
  )
}
