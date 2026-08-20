import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const validate = () => {
    if (!form.fullName.trim()) return 'Nama wajib diisi'
    if (!form.email.trim()) return 'Email wajib diisi'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Format email tidak valid'
    if (form.password.length < 6) return 'Password minimal 6 karakter'
    if (form.password!== form.confirmPassword) return 'Konfirmasi password tidak sama'
    return null
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    const errMsg = validate(); if (errMsg) { setError(errMsg); return }
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password })
      if (error) throw error
      if (data.user) {
        const { error: pErr } = await supabase.from('profiles').insert({ id: data.user.id, role: 'siswa', full_name: form.fullName, email: form.email })
        if (pErr) throw pErr
        if (data.session) { setSuccess('Akun berhasil dibuat! Mengarahkan...'); setTimeout(()=>navigate('/dashboard'),800) }
        else { setSuccess('Akun berhasil dibuat! Silakan cek email untuk verifikasi, lalu login.'); setTimeout(()=>navigate('/login'),1500) }
      }
    } catch (err) {
      let msg = err.message
      if (msg.includes('already registered')) msg = 'Email sudah terdaftar. Silakan login.'
      setError(msg)
    } finally { setLoading(false) }
  }
  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="text-[24px] font-bold">Register</h1>
      <p className="text-[13px] opacity-60 mt-1">Buat akun baru arsha.codes</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Nama lengkap" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3 text-[14px]" placeholder="Konfirmasi password" type="password" value={form.confirmPassword} onChange={e=>setForm({...form, confirmPassword:e.target.value})} />
        {error && <p className="text-[13px] text-red-500">{error}</p>}
        {success && <p className="text-[13px] text-green-600">{success}</p>}
        <button disabled={loading} className="w-full bg-black text-white dark:bg-white dark:text-black rounded-xl py-3 text-[14px] font-bold disabled:opacity-50">{loading? 'Memuat...' : 'Daftar'}</button>
      </form>
      <p className="text-[13px] mt-4 text-center">Sudah punya akun? <Link to="/login" className="font-bold underline">Login</Link></p>
    </div>
  )
}
