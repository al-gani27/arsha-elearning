import { Navigate } from 'react-router-dom'
import { useAuth, useAuthContext } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles }) {
  // support dua nama hook
  const hook = (()=>{ try{ return useAuth() } catch{ return useAuthContext() } })()
  const { user, profile, loading } = hook

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[13px] opacity-60">Memuat session...</div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && profile &&!allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}
