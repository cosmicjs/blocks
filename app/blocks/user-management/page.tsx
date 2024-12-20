/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"
import SignupForm from "@/components/user-management/SignupForm"

export async function generateMetadata() {
  return {
    title: `User Management`,
  }
}

export default async function UserManagement({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <SignupForm />
    </div>
  )
}
function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add user-management
  \`\`\`
  `
  const signupExampleCode = dedent`
    \`\`\`jsx
    // app/signup/page.tsx
    import SignUpClient from "@/cosmic/blocks/user-management/SignUpClient";
    import { signUp } from "@/cosmic/blocks/user-management/actions";

    export default function SignUpPage() {
      return (
        <div className="container mx-auto py-8 px-4">
          <SignUpClient onSubmit={signUp} />
        </div>
      );
    }
    \`\`\`
    `

  const verifyEmailPageCode = dedent`
    \`\`\`jsx
    // app/verify/page.tsx
    import { Suspense } from "react";
    import VerifyClient from "@/cosmic/blocks/user-management/VerifyClient";
    import { Loader2 } from "lucide-react";

    export default function VerifyPage() {
      return (
        <Suspense fallback={<Loader2 className="text-blue-600 mx-auto w-8 h-8 animate-spin" />}>
          <VerifyClient />
        </Suspense>
      );
    }
    \`\`\`
    `

  const addAuthProviderCode = dedent`
    \`\`\`jsx
    // app/layout.tsx
    import { AuthProvider } from "@/cosmic/blocks/user-management/AuthContext";
    import "./globals.css";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body className="dark:bg-black bg-white">
            <AuthProvider>
              {children}
            </AuthProvider>
          </body>
        </html>
      );
    }    
    \`\`\`
    `

  const loginExampleCode = dedent`
    \`\`\`jsx
    // app/login/page.tsx
    import { Suspense } from "react";
    import LoginClient from "@/cosmic/blocks/user-management/LoginClient";
    import { login } from "@/cosmic/blocks/user-management/actions";
    import { Loader2 } from "lucide-react";

    export default function LoginPage() {
      return (
        <div className="container mx-auto py-8 px-4">
          <Suspense fallback={<Loader2 className="text-blue-600 mx-auto w-8 h-8 animate-spin" />}>
            <LoginClient onSubmit={login} redirect="/dashboard" />
          </Suspense>
        </div>
      );
    }
    \`\`\`
    `
  const forgotPasswordExampleCode = dedent`
    \`\`\`jsx
    // app/forgot-password/page.tsx
    import ForgotPasswordForm from "@/cosmic/blocks/user-management/ForgotPasswordForm";
    import { forgotPassword } from "@/cosmic/blocks/user-management/actions";

    export default function ForgotPasswordPage() {
      return (
        <div className="container mx-auto py-8 px-4">
          <ForgotPasswordForm onSubmit={forgotPassword} />
        </div>
      );
    }
    \`\`\`
    `
  const resetPasswordExampleCode = dedent`
    \`\`\`jsx
    // app/reset-password/page.tsx
    import { redirect } from "next/navigation";
    import ResetPasswordForm from "@/cosmic/blocks/user-management/ResetPasswordForm";
    import { resetPassword } from "@/cosmic/blocks/user-management/actions";

    export default function ResetPasswordPage({
      searchParams,
    }: {
      searchParams: { token?: string };
    }) {
      const token = searchParams.token;

      if (!token) {
        redirect("/login");
      }

      return (
        <div className="container mx-auto py-8 px-4">
          <ResetPasswordForm token={token} onSubmit={resetPassword} />
        </div>
      );
    }
    \`\`\`
    `
  const dashboardExampleCode = dedent`
    \`\`\`jsx
    // app/dashboard/page.tsx
    import { Suspense } from "react";
    import DashboardClient from "@/cosmic/blocks/user-management/DashboardClient";
    import { Loader2 } from "lucide-react";

    export default function DashboardPage() {
      return (
        <div className="container mx-auto py-8 px-4">
          <Suspense fallback={<Loader2 className="text-blue-600 mx-auto w-8 h-8 animate-spin" />}>
            <DashboardClient />
          </Suspense>
        </div>
      );
    }
    \`\`\`
    `
  const authButtonsExampleCode = dedent`
    \`\`\`jsx
    import { AuthButtons } from "@/cosmic/blocks/user-management/AuthButtons";
    
    export default function NavMenu() {
      return (
        <div className="container mx-auto py-8 px-4 flex justify-end">
          {/* YOUR_NAV_ITEMS_HERE */}
          <AuthButtons />
        </div>
      );
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      code: blockCommand,
      description: "This will create the `users` Object type in your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the components `SignUpClient.tsx`, `LoginClient.tsx`, `ForgotPasswordForm.tsx`, etc. and `actions.ts` server actions file to your blocks folder located in `cosmic/blocks/user-management`.",
    },
    {
      title: "Add Resend key and app details",
      description: (
        <>
          We will use the Resend email service to send emails (installed
          automatically). Learn more about sending emails with Resend on the{" "}
          <a
            href="https://resend.com"
            target="_blank"
            className="text-cosmic-blue"
            rel="noreferrer"
          >
            Resend website
          </a>
          . Add the following keys to the `.env.local` file. Change the values
          to your Resend key and app details. Find your Resend API key in the{" "}
          <a
            href="https://resend.com/login"
            target="_blank"
            rel="noreferrer"
            className="text-cosmic-blue"
          >
            Resend dashboard
          </a>
          .
        </>
      ),
      code: dedent(`\`\`\`jsx
      // .env.local
      ...
      RESEND_API_KEY=re_123456
      NEXT_PUBLIC_APP_URL=http://your-website.com
      NEXT_PUBLIC_APP_NAME="Your App Name"
      SUPPORT_EMAIL=support@your-website.com
      \`\`\`
      `),
    },
    {
      title: "Add the AuthProvider to layout.tsx",
      code: addAuthProviderCode,
      description:
        "Add the `AuthProvider` component to your `layout.tsx` file. This will provide the auth context to your app.",
    },
    {
      title: "Usage: Signup page",
      code: signupExampleCode,
      description: (
        <>
          Create a new file at `app/signup/page.tsx` and add the following code.
          Then go to `http://localhost:3000/signup` to see the form.
        </>
      ),
    },
    {
      title: "Usage: Verify email page",
      code: verifyEmailPageCode,
      description:
        "Create a new file at `app/verify/page.tsx` and add the following code.",
    },
    {
      title: "Usage: Login page",
      code: loginExampleCode,
      description:
        "Create a new file at `app/login/page.tsx` and add the following code.",
    },
    {
      title: "Usage: Forgot password page",
      code: forgotPasswordExampleCode,
      description:
        "Create a new file at `app/forgot-password/page.tsx` and add the following code.",
    },
    {
      title: "Usage: Reset password page",
      code: resetPasswordExampleCode,
      description:
        "Create a new file at `app/reset-password/page.tsx` and add the following code.",
    },
    {
      title: "Usage: Dashboard page",
      code: dashboardExampleCode,
      description: (
        <>
          Create a new file at <code>app/dashboard/page.tsx</code> and add the
          following code. This uses the auth context to check if the user is
          logged in and fetches the user data from Cosmic. Note: You will need
          to add <code>imgix.cosmicjs.com</code> to the <code>images</code>{" "}
          section of your <code>next.config.ts</code> file to enable the avatar
          image. For larger images, you will need to enable larger body sizes
          for server actions. See the{" "}
          <a
            rel="noreferrer"
            target="_blank"
            className="text-cosmic-blue"
            href="https://nextjs.org/docs/app/api-reference/next-config-js/serverActions#bodysizelimit"
          >
            Next.js docs
          </a>{" "}
          for more details.
        </>
      ),
    },
    {
      title: "Usage: Navigation menu",
      code: authButtonsExampleCode,
      description:
        "Add the `AuthButtons` component to your navigation menu. This will show the login/logout buttons and user dashboard menu items.",
    },
    {
      title: "Example: Podcast Network Website",
      description: (
        <>
          Check out a full-featured working example{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-cosmic-blue-link dark:text-cosmic-blue"
            href="https://cosmic-podcast-network.vercel.app/"
          >
            Cosmic Podcast Network
          </a>
          .
        </>
      ),
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} writeKey featureKey="users" />
    </>
  )
}
