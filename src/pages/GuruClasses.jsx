import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function GuruClasses() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', subject: '', description: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchClasses() }, [])

  const fetchClasses = async () => {
    try {
      const { data } = await supabase.from('classes').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false })
      if (data) setClasses(data)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let c = ''
    for (let i = 0; i < 5; i++) c += chars[Math.floor(Math.random() * chars.length)]
    return c
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Nama kelas wajib')
    try {
      const { data, error } = await supabase.from('classes').insert([{
        name: form.name,
        subject: form.subject,
        description: form.description,
        teacher_id: user.id,
        class_code: generateCode()
      }]).select().single()
      if (error) throw error
      setClasses([data, ...classes])
      setForm({ name: '', subject: '', description: '' })
      setShowForm(false)
    } catch (err) { alert('Gagal: ' + err.message) }
  }

  if (loading) return <div style={{padding:20}}>Loading...</div>

  return (
    <div style={{padding:20, maxWidth:800, margin:'0 auto'}}>
      <h1 style={{fontSize:24, fontWeight:'bold'}}>Kelas Saya</h1>
      <button onClick={()=>setShowForm(!showForm)} style={{margin:'16px 0', background:'#2563eb', color:'white', padding:'8px 16px', borderRadius:8, border:'none'}}>
        {showForm ? 'Batal' : '+ Buat Kelas'}
      </button>

      {showForm && (
        <form onSubmit={handleCreate} style={{border:'1px solid #ddd', padding:16, borderRadius:8, marginBottom:16}}>
          <input placeholder="Nama Kelas *" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{width:'100%', padding:8, marginBottom:8, border:'1px solid #ccc', borderRadius:6}}/>
          <input placeholder="Mata Pelajaran" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} style={{width:'100%', padding:8, marginBottom:8, border:'1px solid #ccc', borderRadius:6}}/>
          <textarea placeholder="Deskripsi" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{width:'100%', padding:8, marginBottom:8, border:'1px solid #ccc', borderRadius:6}}/>
          <button type="submit" style={{background:'#16a34a', color:'white', padding:'8px 16px', borderRadius:6, border:'none'}}>Buat Kelas</button>
        </form>
      )}

      {classes.length === 0 ? <p>Belum ada kelas. Buat kelas pertama!</p> : classes.map(c=>(
        <div key={c.id} style={{border:'1px solid #ddd', padding:12, borderRadius:8, marginBottom:8}}>
          <b>{c.name}</b> - {c.subject}<br/>
          <span style={{background:'#eee', padding:'2px 6px', borderRadius:4, fontFamily:'monospace'}}>Kode: {c.class_code}</span>
        </div>
      ))}
    </div>
  )
}
