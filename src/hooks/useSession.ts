import { useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

/** The signed-in session, or null while signed out or still loading. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (!supabase) return
    // Fires once with the stored session, then on every sign-in and sign-out.
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next)
    )
    return () => data.subscription.unsubscribe()
  }, [])

  return session
}
