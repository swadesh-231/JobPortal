import { useEffect, useRef, useState } from "react"

/**
 * True once the page has scrolled past the sentinel element.
 * Uses IntersectionObserver instead of a scroll listener.
 */
export function useScrolled<T extends HTMLElement = HTMLDivElement>() {
  const sentinelRef = useRef<T>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return [sentinelRef, scrolled] as const
}
