import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Course' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 md:px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold tracking-widest text-[18px] md:text-[20px] shrink-0">
          ARSHA<span className="text-violet-600 dark:text-violet-500">.CODES</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition min-h-[40px] flex items-center ${isActive(l.to)? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:text-zinc-900 dark:text-white/60 dark:hover:text-white'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/10 transition"
          >
            {theme === 'dark'? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            className="hidden md:flex min-h-[44px] px-6 items-center justify-center bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-11 h-11 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center"
            aria-label="Menu"
          >
            <span className="text-[18px]">{open? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] px-4 py-4 space-y-2">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex min-h-[48px] items-center px-4 rounded-xl text-[15px] font-medium ${isActive(l.to)? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-white/70'}`}
            >
              {l.label}
            </Link>
          ))}
          <button className="w-full mt-2 min-h-[48px] bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold">
            Login
          </button>
        </div>
      )}
    </header>
  )
}
