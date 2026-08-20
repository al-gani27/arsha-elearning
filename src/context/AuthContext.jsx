import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)
export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (!error && data) {
        setProfile(data)
        return data
      }
      // kalau profiles belum ada (trigger telat), ambil dari metadata dulu
      if(user?.user_metadata){
        setProfile({ id: userId, role: user.user_metadata.role || 'siswa', full_name: user.user_metadata.full_name, email: user.email })
      }
    } catch(e){ console.log('fetchProfile err', e.message) }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setUser(session?.user?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session); setUser(session?.user?? null)
      if (session?.user) await fetchProfile(session.user.id)
      else setProfile(null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, session, profile, role: profile?.role, loading }}>{children}</AuthContext.Provider>
}
export const useAuthContext2 = () => useContext(AuthContext)
