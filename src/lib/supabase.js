import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
let supabase = null
let configError = null
if (!supabaseUrl || !supabaseAnonKey) {
  configError = 'Belum diisi di file .env'
} else {
  try { supabase = createClient(supabaseUrl, supabaseAnonKey) } catch (e) { configError = e.message }
}
export { supabase, configError }
