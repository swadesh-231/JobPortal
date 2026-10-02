import { useState, type FormEvent } from "react"
import { MailCheck } from "lucide-react"
import { Link, Navigate } from "react-router"
import { toast } from "sonner"
import { AuthError, AuthField } from "@/components/auth/AuthField"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useSession } from "@/hooks/useSession"
import {
  authLinkClass,
  focusFirstInvalid,
  MIN_PASSWORD_LENGTH,
  validateEmail,
  validateNewPassword,
} from "@/lib/auth"
import { AUTH_UNAVAILABLE, supabase } from "@/lib/supabase"

interface Errors {
  name?: string
  email?: string
  password?: string
}

export default function SignUpPage() {
  const session = useSession()
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string>()
  const [pending, setPending] = useState(false)
  /** Set when the account needs email confirmation before the first login */
  const [confirmEmail, setConfirmEmail] = useState<string>()

  if (session) return <Navigate to={siteConfig.routes.home} replace />

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")

    const next: Errors = {
      name: name ? undefined : "Enter your name.",
      email: validateEmail(email),
      password: validateNewPassword(password),
    }
    setErrors(next)
    setFormError(undefined)
    if (next.name || next.email || next.password) return focusFirstInvalid(form)

    if (!supabase) return setFormError(AUTH_UNAVAILABLE)
    setPending(true)
    const { data: result, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: location.origin,
      },
    })
    setPending(false)
    if (error) return setFormError(error.message)
    // With a session the listener redirects; without one, the email needs confirming.
    if (result.session) toast.success("Your account is ready.")
    else setConfirmEmail(email)
  }

  if (confirmEmail) {
    return (
      <AuthLayout
        documentTitle={`Confirm your email for ${siteConfig.name}`}
        title="Check your inbox."
        intro={
          <>
            We sent a confirmation link to{" "}
            <span className="font-medium text-foreground">{confirmEmail}</span>.
            Open it to finish creating your account.
          </>
        }
        footer={
          <>
            Wrong address?{" "}
            <button
              type="button"
              onClick={() => setConfirmEmail(undefined)}
              className={authLinkClass}
            >
              Use a different email
            </button>
          </>
        }
      >
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-body-sm text-muted-foreground">
          <MailCheck className="mt-0.5 size-5 shrink-0 text-primary-text" aria-hidden />
          The link can take a minute to arrive. If you don't see it, check
          your spam folder.
        </div>
        <Button size="lg" variant="outline" className="mt-4 w-full" asChild>
          <Link to={siteConfig.routes.logIn}>Go to log in</Link>
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      documentTitle={`Create your ${siteConfig.name} account`}
      title="Create your account."
      intro="Free for job seekers. Add your resume next to see how well each role fits you."
      footer={
        <>
          Already have an account?{" "}
          <Link to={siteConfig.routes.logIn} className={authLinkClass}>
            Log in
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        {formError && <AuthError>{formError}</AuthError>}
        <AuthField
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          error={errors.name}
        />
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
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
          error={errors.password}
        />
        <Button type="submit" size="lg" loading={pending} className="mt-2">
          Create free account
        </Button>
        <p className="text-label font-normal text-muted-foreground">
          By creating an account you agree to the{" "}
          <a href="/terms" className={authLinkClass}>
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className={authLinkClass}>
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </AuthLayout>
  )
}
