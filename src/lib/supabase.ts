import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/** Null when the Supabase env vars are missing, so the landing page still renders. */
export const supabase = url && key ? createClient(url, key) : null

export const AUTH_UNAVAILABLE =
  "Accounts aren't set up in this environment. Add the Supabase keys to .env and restart."

export async function logOut() {
  await supabase?.auth.signOut()
}
