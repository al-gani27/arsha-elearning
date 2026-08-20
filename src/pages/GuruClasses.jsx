import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
function generateClassCode(){
  const chars="ABCDEFGHJKMNPQRSTUVWXYZ23456789"
  let code="ARS"
  for(let i=0;i<3;i++){code+=chars.charAt(Math.floor(Math.random()*chars.length))}
  return code
}
export default function GuruClasses(){
  const { user }=useAuth()
  const [classes,setClasses]=useState([])
  const [loading,setLoading]=useState(true)
  const [showForm,setShowForm]=useState(false)
  const [form,setForm]=useState({class_name:"",subject:"",description:""})
  const [submitting,setSubmitting]=useState(false)
  const fetchClasses=async()=>{
    if(!user)return
    setLoading(true)
    const {data}=await supabase.from("classes").select("*").eq("teacher_id",user.id).order("created_at",{ascending:false})
    setClasses(data||[])
    setLoading(false)
  }
  useEffect(()=>{fetchClasses()},[user])
  const handleCreate=async(e)=>{
    e.preventDefault()
    if(!form.class_name||!form.subject)return alert("Nama kelas & mapel wajib")
    setSubmitting(true)
    let code=""
    for(let i=0;i<5;i++){
      const cand=generateClassCode()
      const {data}=await supabase.from("classes").select("id").eq("class_code",cand).maybeSingle()
      if(!data){code=cand;break}
    }
    if(!code)code=generateClassCode()+Math.floor(Math.random()*9)
    const {error}=await supabase.from("classes").insert({teacher_id:user.id,class_name:form.class_name,subject:form.subject,description:form.description,class_code:code})
    setSubmitting(false)
    if(error)return alert(error.message)
    setForm({class_name:"",subject:"",description:""})
    setShowForm(false)
    fetchClasses()
  }
  return(
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelas Saya</h1>
        <button onClick={()=>setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">+ Buat Kelas</button>
      </div>
      {showForm&&(
        <form onSubmit={handleCreate} className="border rounded-2xl p-4 mb-6 bg-white">
          <input className="w-full border rounded-xl p-3 mb-3 text-sm" placeholder="Nama Kelas: Pembelajaran Matematika" value={form.class_name} onChange={e=>setForm({...form,class_name:e.target.value})}/>
          <input className="w-full border rounded-xl p-3 mb-3 text-sm" placeholder="Mata Pelajaran: Matematika" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/>
          <textarea className="w-full border rounded-xl p-3 mb-3 text-sm" rows={3} placeholder="Deskripsi" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <button disabled={submitting} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm">{submitting?"Menyimpan...":"Buat Kelas"}</button>
        </form>
      )}
      {loading?<p>Memuat...</p>:classes.length===0?<div className="text-center py-16 border rounded-2xl border-dashed"><p>Tidak ada kelas.</p></div>:<div className="grid md:grid-cols-2 gap-4">{classes.map(c=><div key={c.id} className="border rounded-2xl p-4 bg-white"><h3 className="font-bold">{c.class_name}</h3><p className="text-sm opacity-70">{c.subject}</p><div className="mt-2 inline-block bg-zinc-100 px-3 py-1 rounded-full text-xs font-mono font-bold">Kode: {c.class_code}</div><p className="text-sm mt-2 opacity-80">{c.description}</p></div>)}</div>}
    </div>
  )
}
