export const MIN_PASSWORD_LENGTH = 8

export const authLinkClass =
  "rounded-sm font-medium text-primary-text underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"

export function validateEmail(email: string) {
  if (!email) return "Enter your email address."
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Enter a valid email address, like name@example.com."
  }
}

export function validateNewPassword(password: string) {
  if (!password) return "Choose a password."
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters.`
  }
}

/** Moves focus to the first field the form marked invalid. */
export function focusFirstInvalid(form: HTMLFormElement) {
  requestAnimationFrame(() =>
    form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus()
  )
}
