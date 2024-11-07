import { Button } from "../ui/button"

export default function SignupForm() {
  return (
    <div className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          placeholder="Enter your first name"
          className="w-full rounded border p-2"
          autoFocus
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

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="w-full rounded border p-2"
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
        <p className="mt-1 text-sm text-gray-500">
          Password must be at least 8 characters long and contain both letters
          and numbers
        </p>
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm">
        Already have an account?
        <div className="cursor-pointer text-cosmic-blue">Login</div>
      </div>
    </div>
  )
}
