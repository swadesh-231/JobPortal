import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import type { Theme } from "@/lib/theme"
import { cn } from "@/lib/utils"

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex gap-0.5 rounded-md border border-border bg-card p-0.5",
        className
      )}
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
          className="inline-flex h-9 items-center gap-1.5 rounded-sm px-2.5 text-label text-muted-foreground transition-colors duration-120 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-foreground"
        >
          <Icon className="size-3.5" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  )
}
