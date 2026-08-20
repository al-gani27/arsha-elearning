import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && profile?.role) {
      if (profile.role === 'admin') navigate('/admin', { replace: true })
      else if (profile.role === 'guru') navigate('/guru', { replace: true })
      else navigate('/siswa', { replace: true })
    }
  }, [profile, loading, navigate])

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[13px] opacity-60">Memuat...</div>
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-[24px] font-bold">Selamat datang {profile?.full_name || ''}! </h1>
      <p className="text-[13px] mt-1 opacity-70">Email: {user?.email}</p>
      {profile && <p className="text-[13px] mt-1 opacity-70">Role: {profile.role} - mengarahkan...</p>}
    </div>
  )
}
