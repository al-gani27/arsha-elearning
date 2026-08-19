import { useAuth } from '../context/AuthContext'
export default function Profile() {
  const { user, profile, loading } = useAuth()
  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[13px] opacity-60">Memuat...</div>
  return (
    <div className="max-w-[600px] mx-auto px-4 py-10">
      <h1 className="text-[24px] font-bold">Profil</h1>
      <div className="mt-6 border rounded-2xl p-5 space-y-3">
        <p className="text-[13px]"><span className="opacity-60">Nama lengkap:</span> <span className="font-bold">{profile?.full_name || '-'}</span></p>
        <p className="text-[13px]"><span className="opacity-60">Email:</span> <span className="font-bold">{user?.email}</span></p>
        <p className="text-[11px] opacity-40 mt-4">ID: {user?.id}</p>
      </div>
    </div>
  )
}
