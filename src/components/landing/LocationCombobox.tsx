import { useState } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const ANYWHERE = "Anywhere"
const OPTIONS = [ANYWHERE, "Remote", ...siteConfig.cities]

interface LocationComboboxProps {
  value: string
  onChange: (value: string) => void
  /** Id of the visible or sr-only label */
  labelledBy: string
  className?: string
}

export function LocationCombobox({
  value,
  onChange,
  labelledBy,
  className,
}: LocationComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className={cn(
          "flex items-center gap-2 px-3 text-left text-body outline-none",
          className
        )}
      >
        <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="flex-1 truncate">{value}</span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) min-w-56 p-0"
      >
        <Command>
          <CommandInput placeholder="Search cities" />
          <CommandList>
            <CommandEmpty>No matching city</CommandEmpty>
            <CommandGroup>
              {OPTIONS.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      option !== value && "invisible"
                    )}
                    aria-hidden
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
