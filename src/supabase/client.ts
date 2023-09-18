import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const apikey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient<Database>(supabaseUrl, apikey)