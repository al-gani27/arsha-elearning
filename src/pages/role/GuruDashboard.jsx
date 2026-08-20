import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
export default function GuruDashboard(){
  const { profile } = useAuth()
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Guru Dashboard</h1>
      <p className="mt-2 text-sm opacity-70">Role: {profile?.role}</p>
      <div className="mt-6 grid gap-4">
        <Link to="/guru/classes" className="border rounded-2xl p-5 bg-blue-600 text-white font-medium">Kelola Kelas →</Link>
        <div className="border rounded-2xl p-5">Total kelas akan muncul di Kelola Kelas</div>
      </div>
    </div>
  )
}
