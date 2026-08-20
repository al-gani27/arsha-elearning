import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminCourses(){
  const [courses,setCourses]=useState([])
  const [form,setForm]=useState({title:'',description:'',instructor:'',price:0,category:'Programming',thumbnail_url:''})
  const [editingId,setEditingId]=useState(null)

  const load = async ()=>{
    const {data}=await supabase.from('courses').select('*').order('created_at',{ascending:false})
    setCourses(data||[])
  }
  useEffect(()=>{load()},[])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {data:{user}}=await supabase.auth.getUser()
    if(editingId){
      await supabase.from('courses').update(form).eq('id',editingId)
    } else {
      await supabase.from('courses').insert({...form, created_by:user.id})
    }
    setForm({title:'',description:'',instructor:'',price:0,category:'Programming',thumbnail_url:''})
    setEditingId(null)
    load()
  }

  const handleEdit = (c)=>{
    setForm({title:c.title,description:c.description,instructor:c.instructor,price:c.price,category:c.category,thumbnail_url:c.thumbnail_url})
    setEditingId(c.id)
    window.scrollTo(0,0)
  }
  const handleDelete = async (id)=>{
    if(!confirm('Hapus kursus ini?')) return
    await supabase.from('courses').delete().eq('id',id)
    load()
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin - Kelola Kursus</h1>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl mt-6 grid gap-3">
        <input className="border p-2 rounded" placeholder="Judul" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
        <textarea className="border p-2 rounded" placeholder="Deskripsi" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Instruktur" value={form.instructor} onChange={e=>setForm({...form,instructor:e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Thumbnail URL https://..." value={form.thumbnail_url} onChange={e=>setForm({...form,thumbnail_url:e.target.value})}/>
        <div className="flex gap-3">
          <input type="number" className="border p-2 rounded w-1/2" placeholder="Harga" value={form.price} onChange={e=>setForm({...form,price:parseInt(e.target.value)||0})}/>
          <select className="border p-2 rounded w-1/2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            <option>Programming</option><option>Design</option><option>Business</option><option>Marketing</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white py-2 rounded font-bold">{editingId? 'Update' : 'Tambah'} Kursus</button>
        {editingId && <button type="button" onClick={()=>{setEditingId(null);setForm({title:'',description:'',instructor:'',price:0,category:'Programming',thumbnail_url:''})}} className="bg-gray-300 py-2 rounded">Batal Edit</button>}
      </form>

      <div className="mt-8 grid gap-3">
        {courses.map(c=>(
          <div key={c.id} className="flex justify-between items-center border p-3 rounded">
            <div><b>{c.title}</b><p className="text-xs text-gray-500">{c.category} - Rp{c.price}</p></div>
            <div className="flex gap-2">
              <button onClick={()=>handleEdit(c)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button onClick={()=>handleDelete(c.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
