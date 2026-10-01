export type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"
const listeners = new Set<() => void>()
const systemDark = () =>
  typeof matchMedia === "function"
    ? matchMedia("(prefers-color-scheme: dark)")
    : null

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // storage unavailable
  }
  return "system"
}

function apply(theme: Theme) {
  const dark =
    theme === "dark" || (theme === "system" && !!systemDark()?.matches)
  document.documentElement.classList.toggle("dark", dark)
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // storage unavailable
  }
  apply(theme)
  listeners.forEach((listener) => listener())
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  const media = systemDark()
  const onSystemChange = () => apply(getTheme())
  media?.addEventListener("change", onSystemChange)
  return () => {
    listeners.delete(listener)
    media?.removeEventListener("change", onSystemChange)
  }
}
