import { useAuth } from '../context/AuthContext'
export default function Dashboard() {
  const { user, profile, loading } = useAuth()
  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[13px] opacity-60">Memuat...</div>
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-[24px] font-bold">Selamat datang</h1>
      <p className="text-[13px] mt-2 opacity-70">Email: {user?.email}</p>
      {profile && <p className="text-[13px] mt-1 opacity-70">Nama: {profile.full_name}</p>}
      <p className="text-[11px] mt-6 opacity-50">Ini dashboard sementara TAHAP 3C. Tidak ada role Admin/Guru/Siswa.</p>
    </div>
  )
}
