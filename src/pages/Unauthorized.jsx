import { Link } from "react-router-dom"
export default function Unauthorized(){
  return <div className="max-w-xl mx-auto p-10 text-center"><h1 className="text-3xl font-bold">403 - Akses Ditolak</h1><p className="mt-3 opacity-70">Role kamu tidak punya akses ke halaman ini.</p><Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded-xl">Kembali</Link></div>
}
