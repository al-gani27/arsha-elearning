import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register(){
  const navigate = useNavigate()
  const [form,setForm]=useState({fullName:'',email:'',password:'',confirmPassword:'',role:'siswa'})
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
  const [loading,setLoading]=useState(false)

  const validate=()=>{
    if(!form.fullName.trim()) return 'Nama wajib diisi'
    if(!form.email.trim()) return 'Email wajib diisi'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Format email tidak valid'
    if(form.password.length < 6) return 'Password minimal 6 karakter'
    if(form.password!==form.confirmPassword) return 'Konfirmasi password tidak sama'
    return null
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('');setSuccess('')
    const errMsg = validate(); if(errMsg){setError(errMsg);return}
    setLoading(true)
    try{
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName, role: form.role, username: form.fullName.toLowerCase().replace(/\s+/g,'') } }
      })
      if(error) throw error
      if(data.user){
        // profiles akan dibuat trigger, tapi kita update rolenya biar pasti
        await new Promise(r=>setTimeout(r,800))
        await supabase.from('profiles').update({ role: form.role, full_name: form.fullName }).eq('id', data.user.id)
        if(data.session){
          setSuccess('Akun berhasil dibuat! Mengarahkan ke dashboard...');
          setTimeout(()=>navigate('/dashboard'),800)
        } else {
          setSuccess('Akun berhasil dibuat! Silakan cek email untuk verifikasi, lalu login.');
          setTimeout(()=>navigate('/login'),1500)
        }
      }
    }catch(err){
      let msg = err.message
      if(msg.includes('already registered')) msg = 'Email sudah terdaftar. Silakan login.'
      if(msg.includes('violates check constraint')) msg = 'Role tidak valid, hubungi admin.'
      setError(msg)
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="text-[24px] font-bold">Register</h1>
      <p className="text-[13px] opacity-60 mt-1">Buat akun baru arsha.codes</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Nama lengkap" value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})}/>
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>

        <div className="flex gap-2">
          <button type="button" onClick={()=>setForm({...form,role:'siswa'})} className={`flex-1 border rounded-xl py-3 text-[14px] font-bold ${form.role==='siswa'?'bg-black text-white':'bg-white'}`}>Siswa</button>
          <button type="button" onClick={()=>setForm({...form,role:'guru'})} className={`flex-1 border rounded-xl py-3 text-[14px] font-bold ${form.role==='guru'?'bg-black text-white':'bg-white'}`}>Guru</button>
        </div>

        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Konfirmasi password" type="password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/>
        {error && <p className="text-red-500 text-[13px]">{error}</p>}
        {success && <p className="text-green-600 text-[13px]">{success}</p>}
        <button disabled={loading} className="w-full bg-black text-white rounded-xl py-3 text-[14px] font-bold disabled:opacity-50">{loading?'Memuat...':'Daftar'}</button>
      </form>
      <p className="text-[13px] mt-4 text-center">Sudah punya akun? <Link to="/login" className="font-bold underline">Login</Link></p>
    </div>
  )
}
