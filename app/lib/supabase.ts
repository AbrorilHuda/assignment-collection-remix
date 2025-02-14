import { createClient } from '@supabase/supabase-js';

//supabase server



// supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

