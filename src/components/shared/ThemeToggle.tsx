import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

/** Sun and moon switch. Follows the system theme until first used. */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  function toggle() {
    const dark = document.documentElement.classList.contains("dark")
    setTheme(dark ? "light" : "dark")
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={cn(
        "size-10 text-muted-foreground hover:text-foreground [&_svg]:size-4.5",
        className
      )}
    >
      {/* The icon shows the theme you switch to */}
      <Moon className="dark:hidden" aria-hidden />
      <Sun className="hidden dark:block" aria-hidden />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="hidden dark:sr-only">Switch to light theme</span>
    </Button>
  )
}
