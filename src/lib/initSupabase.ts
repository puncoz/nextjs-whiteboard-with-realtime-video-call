import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin access
const supabaseWithAdminRole = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})


// Access auth admin api
export const adminAuthClient = supabaseWithAdminRole.auth.admin
