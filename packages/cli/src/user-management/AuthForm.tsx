"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/cosmic/elements/Button"

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit?: (data: FormData) => Promise<any>
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login: authLogin } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (onSubmit) {
        const result = await onSubmit(formData)

        if (result.error) {
          throw new Error(result.error)
        }

        if (type === "login" && result.token && result.user) {
          authLogin(result.token, result.user)
          setTimeout(() => {
            router.push("/dashboard")
            router.refresh()
          }, 100)
        }
      }
    } catch (err: any) {
      console.error(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">
        {type === "login" ? "Login" : "Sign Up"}
      </h1>

      {type === "signup" && (
        <>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name"
              className="w-full rounded border p-2"
              autoFocus={type === "signup"}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Enter your last name"
              className="w-full rounded border p-2"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="w-full rounded border p-2"
          autoFocus={type === "login"}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="Enter your password"
          className="w-full rounded border p-2"
        />
        {type === "signup" ? (
          <p className="mt-1 text-sm text-gray-500">
            Password must be at least 8 characters long and contain both letters
            and numbers
          </p>
        ) : (
          <Link
            href="/forgot-password"
            className="mt-1 inline-block text-sm text-cosmic-blue"
          >
            Forgot your password?
          </Link>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm">
        {type === "login" ? (
          <>
            <div className="flex items-center gap-2">
              Don't have an account?
              <Link href="/signup" className="text-cosmic-blue">
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <>
            Already have an account?
            <Link href="/login" className="text-cosmic-blue">
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
