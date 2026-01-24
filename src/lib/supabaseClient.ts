
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_TOKEN!

if (!supabaseUrl || !supabaseAnonKey) {
    // Warn only in development, maybe throw in production
    console.warn('Missing Supabase Environment Variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
