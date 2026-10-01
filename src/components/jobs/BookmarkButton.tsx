import { useState } from "react"
import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { SignUpDialog } from "@/components/shared/SignUpDialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  title: string
  company: string
  defaultSaved?: boolean
  /** Signed-out visitors get the sign-up dialog instead of a save */
  signedIn?: boolean
  /** Persists the change. Reject to revert and show the error toast. */
  onSavedChange?: (saved: boolean) => Promise<void> | void
  className?: string
}

export function BookmarkButton({
  title,
  company,
  defaultSaved = false,
  signedIn = false,
  onSavedChange,
  className,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(defaultSaved)
  const [dialogOpen, setDialogOpen] = useState(false)

  async function update(next: boolean, announce: boolean) {
    setSaved(next)
    try {
      await onSavedChange?.(next)
      if (announce && next) {
        toast("Role saved", {
          action: { label: "Undo", onClick: () => update(false, false) },
        })
      }
    } catch {
      setSaved(!next)
      toast.error("Couldn't save this role. Try again.")
    }
  }

  function handleClick() {
    if (!signedIn) return setDialogOpen(true)
    void update(!saved, true)
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-pressed={saved}
        aria-label={`${saved ? "Remove saved" : "Save"} ${title} at ${company}`}
        onClick={handleClick}
        // The pseudo-element extends the 32px button to a 40px hit area.
        className={cn(
          "z-10 text-muted-foreground after:absolute after:-inset-1 after:content-[''] hover:text-foreground aria-pressed:text-primary-text",
          className
        )}
      >
        <Bookmark
          key={String(saved)}
          className={cn(
            "size-4.5",
            saved && "animate-bookmark-pop fill-current"
          )}
          aria-hidden
        />
      </Button>
      <SignUpDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
