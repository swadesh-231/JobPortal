import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleAlert, CircleCheck, Info, LoaderCircle } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <CircleAlert className="size-4" />,
        error: <CircleAlert className="size-4" />,
        loading: <LoaderCircle className="size-4 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-2.5 rounded-lg border border-border bg-popover p-3.5 text-body-sm text-popover-foreground shadow-elevated",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton:
            "ml-auto h-8 shrink-0 rounded-md px-3 text-label text-primary-text hover:bg-accent",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
