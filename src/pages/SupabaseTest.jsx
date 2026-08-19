import { supabase, configError } from '../lib/supabase'
export default function SupabaseTest() {
  const ok = !!supabase && !configError
  const url = import.meta.env.VITE_SUPABASE_URL
  const hasKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">SUPABASE CONNECTION TEST</h1>
      <div className={`mt-6 border rounded-2xl p-5 ${ok?'bg-green-50 border-green-200':'bg-amber-50 border-amber-200'}`}>
        <p className="font-bold">{ok?'Supabase client berhasil dikonfigurasi.':'Supabase belum dikonfigurasi.'}</p>
        {configError && <p className="text-sm mt-2">{configError}</p>}
      </div>
      <div className="mt-4 bg-white border rounded-2xl p-5">
        <p>URL: {url?'TERISI':'KOSONG'}</p>
        <p>KEY: {hasKey?'TERISI':'KOSONG'}</p>
      </div>
    </div>
  )
}
