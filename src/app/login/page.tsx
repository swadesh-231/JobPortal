import { useState, type FormEvent } from "react"
import { Link, Navigate } from "react-router"
import { toast } from "sonner"
import { AuthError, AuthField } from "@/components/auth/AuthField"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useSession } from "@/hooks/useSession"
import { authLinkClass, focusFirstInvalid, validateEmail } from "@/lib/auth"
import { AUTH_UNAVAILABLE, supabase } from "@/lib/supabase"

export default function LogInPage() {
  const session = useSession()
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string>()
  const [pending, setPending] = useState(false)

  if (session) return <Navigate to={siteConfig.routes.home} replace />

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")

    const next = {
      email: validateEmail(email),
      password: password ? undefined : "Enter your password.",
    }
    setErrors(next)
    setFormError(undefined)
    if (next.email || next.password) return focusFirstInvalid(form)

    if (!supabase) return setFormError(AUTH_UNAVAILABLE)
    setPending(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setPending(false)
    if (error) return setFormError(error.message)
    // The session listener redirects once the sign-in lands.
    toast.success("You're logged in.")
  }

  return (
    <AuthLayout
      documentTitle={`Log in to ${siteConfig.name}`}
      title="Welcome back."
      intro="Log in to see your ranked roles and your application board."
      footer={
        <>
          New to {siteConfig.name}?{" "}
          <Link to={siteConfig.routes.signUp} className={authLinkClass}>
            Create a free account
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        {formError && <AuthError>{formError}</AuthError>}
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="name@example.com"
          error={errors.email}
        />
        <AuthField
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          error={errors.password}
        />
        <Button type="submit" size="lg" loading={pending} className="mt-2">
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
}
