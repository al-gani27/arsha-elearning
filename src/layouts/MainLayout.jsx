import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
