import { useCallback, useEffect, useState } from "react"
import { getFeaturedJobs } from "@/lib/api"
import type { Job } from "@/types/job"

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; jobs: Job[] }

export function useFeaturedJobs() {
  const [state, setState] = useState<State>({ status: "loading" })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    getFeaturedJobs()
      .then((jobs) => active && setState({ status: "ready", jobs }))
      .catch(() => active && setState({ status: "error" }))
    return () => {
      active = false
    }
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: "loading" })
    setAttempt((n) => n + 1)
  }, [])

  return { state, retry }
}
