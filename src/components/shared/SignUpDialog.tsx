import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { siteConfig } from "@/config/site"

/** Shown when a signed-out visitor tries to save or apply. */
export function SignUpDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h3">
            Create a free account to continue
          </DialogTitle>
          <DialogDescription className="text-body-sm text-muted-foreground">
            Save roles, see how well each one fits you, and track every
            application on one board.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" asChild>
            <a href={siteConfig.routes.logIn}>Log in</a>
          </Button>
          <Button asChild>
            <a href={siteConfig.routes.signUp}>Create free account</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
