import { useAuth } from "../../context/AuthContext"
export default function GuruDashboard(){
  const { profile } = useAuth()
  return <div className="max-w-6xl mx-auto p-6"><h1 className="text-2xl font-bold">Guru Dashboard</h1><p className="mt-2 text-sm opacity-70">Role: {profile?.role}</p><div className="mt-6 border rounded-xl p-4">Materi & Kelas yang diajar</div></div>
}
