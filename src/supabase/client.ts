import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const apikey = import.meta.env.VITE_SUPABASE_API_KEY

export const client = createClient(supabaseUrl, apikey)