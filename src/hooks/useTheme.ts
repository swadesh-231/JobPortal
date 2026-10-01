import { useSyncExternalStore } from "react"
import { getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme"

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getTheme,
    () => "system"
  )
  return { theme, setTheme }
}
