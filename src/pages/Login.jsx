import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
export default function Login() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(()=>{ if(!authLoading && user) navigate('/dashboard') },[user,authLoading,navigate])
  if (authLoading) return <div className="min-h-[60vh] flex items-center justify-center text-[13px] opacity-60">Memuat...</div>
  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (!form.email ||!form.password) { setError('Email dan password wajib diisi'); return }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (error) throw error
      navigate('/dashboard')
    } catch (err) {
      let msg = err.message
      if (msg.includes('Invalid login credentials')) msg = 'Email atau password salah.'
      if (msg.includes('Email not confirmed')) msg = 'Email belum diverifikasi. Cek inbox email kamu.'
      setError(msg)
    } finally { setLoading(false) }
  }
  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="text-[24px] font-bold">Login</h1>
      <p className="text-[13px] opacity-60 mt-1">Masuk ke akun kamu</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        {error && <p className="text-[13px] text-red-500">{error}</p>}
        <button disabled={loading} className="w-full bg-black text-white dark:bg-white dark:text-black rounded-xl py-3 text-[14px] font-bold disabled:opacity-50">{loading? 'Memuat...' : 'Login'}</button>
      </form>
      <p className="text-[13px] mt-4 text-center">Belum punya akun? <Link to="/register" className="font-bold underline">Register</Link></p>
    </div>
  )
}
