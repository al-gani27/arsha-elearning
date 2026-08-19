import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
      <Link to="/" className="text-xl font-bold tracking-widest">
        ARSHA<span className="text-violet-500">.CODES</span>
      </Link>
      <div className="hidden md:flex gap-8 text-sm text-white/60">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/courses" className="hover:text-white transition">Course</Link>
        <Link to="/about" className="hover:text-white transition">About</Link>
      </div>
      <Link to="/courses" className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition">
        Login
      </Link>
    </nav>
  )
}
