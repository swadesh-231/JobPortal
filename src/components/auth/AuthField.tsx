import { useState, type ComponentProps, type ReactNode } from "react"
import { CircleAlert, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AuthFieldProps extends ComponentProps<typeof Input> {
  id: string
  label: string
  error?: string
  hint?: string
  /** Right-aligned content on the label row, such as a help link */
  labelAction?: ReactNode
}

/** Labelled input with its hint and error wired up. Password fields get a show toggle. */
export function AuthField({
  id,
  label,
  error,
  hint,
  labelAction,
  type,
  className,
  ...props
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === "password"
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-label">
          {label}
        </Label>
        {labelAction}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && visible ? "text" : type}
          inputSize="lg"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn("h-11 text-body-sm", isPassword && "pr-11", className)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0.5 right-0.5 flex w-10 items-center justify-center rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        )}
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-label font-normal text-destructive"
        >
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-label font-normal text-muted-foreground">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

/** Form-level failure, such as wrong credentials. */
export function AuthError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive-soft px-3 py-2.5 text-body-sm text-destructive dark:text-status-rejected"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {children}
    </p>
  )
}
