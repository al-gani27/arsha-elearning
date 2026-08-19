import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
export default function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/login') }
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between">
        <Link to="/" className="font-bold tracking-widest text-[16px]">ARSHA<span className="text-violet-600">.CODES</span></Link>
        <div className="flex items-center gap-4 text-[13px] font-medium">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          {!user? (
            <><Link to="/about">About</Link><Link to="/login" className="px-3 py-1.5 rounded-full border">Login</Link><Link to="/register" className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">Register</Link></>
          ) : (
            <><Link to="/dashboard">Dashboard</Link><Link to="/profile">Profil</Link><button onClick={handleLogout} className="px-3 py-1.5 rounded-full border">Logout</button></>
          )}
        </div>
      </div>
    </nav>
  )
}
