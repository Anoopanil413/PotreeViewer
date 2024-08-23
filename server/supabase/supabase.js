import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('process.env.SUPABASE_URL',process.env.SUPABASE_URL)


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

