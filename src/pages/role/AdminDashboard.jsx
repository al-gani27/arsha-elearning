import { useAuth } from "../../context/AuthContext"
export default function AdminDashboard(){
  const { profile } = useAuth()
  return <div className="max-w-6xl mx-auto p-6"><h1 className="text-2xl font-bold">Admin Dashboard</h1><p className="mt-2 text-sm opacity-70">Role: {profile?.role} | Email: {profile?.email}</p><div className="mt-6 grid grid-cols-3 gap-4"><div className="border rounded-xl p-4">Kelola Users</div><div className="border rounded-xl p-4">Kelola Courses</div><div className="border rounded-xl p-4">Laporan</div></div></div>
}
