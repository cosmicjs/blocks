/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import SignupForm from "@/components/user-management/SignupForm"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

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
    // app/verify-email/page.tsx
    "use client";

    import { verifyEmail } from "@/cosmic/blocks/user-management/actions";
    import { useSearchParams, useRouter } from "next/navigation";
    import { useEffect } from "react";
    import { Loader2 } from "lucide-react";
    export default function VerifyPage() {
      const searchParams = useSearchParams();
      const router = useRouter();

      useEffect(() => {
        const verifyUserEmail = async () => {
          const code = searchParams.get("code");

          if (!code) {
            router.push("/login?error=Invalid verification link");
            return;
          }

          try {
            await verifyEmail(code);
            router.push(
              "/login?success=Email verified successfully. You may now log in."
            );
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Verification failed";
            router.push(\`/login?error=\${encodeURIComponent(errorMessage)}\`);
            }
          };

          verifyUserEmail();
      }, [searchParams, router]);

      return (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
            <Loader2 className="text-cosmic-blue w-8 h-8 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">
              Verifying your email...
            </p>
          </div>
        </div>
      );
    }
    \`\`\`
    `

  const addAuthProviderCode = dedent`
    \`\`\`jsx
    // app/layout.tsx
    import { AuthProvider } from "@/cosmic/blocks/user-management/AuthContext";

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
          <body>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
      );
    }
    \`\`\`
    `

  const loginExampleCode = dedent`
    \`\`\`jsx
    // app/login/page.tsx
    import LoginClient from "@/cosmic/blocks/user-management/LoginClient";
    import { login } from "@/cosmic/blocks/user-management/actions";

    export default function LoginPage() {
      return (
        <div className="container mx-auto py-8 px-4">
          <LoginClient onSubmit={login} />
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
      return <ForgotPasswordForm onSubmit={forgotPassword} />;
    }
    \`\`\`
    `
  const resetPasswordExampleCode = dedent`
    \`\`\`jsx
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
    "use client";
    import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
    import { UserProfileForm } from "@/cosmic/blocks/user-management/UserProfileForm";
    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { getUserData } from "@/cosmic/blocks/user-management/actions";
    import { Loader2 } from "lucide-react";

    export default function DashboardPage() {
      const { user, isLoading, logout } = useAuth();
      const [userData, setUserData] = useState<any>(null);
      const [error, setError] = useState<string | null>(null);
      const router = useRouter();

      useEffect(() => {
        let isMounted = true;

        const checkUserAndFetchData = async () => {
          if (isLoading) return;

          if (!user) {
            router.push("/login");
            return;
          }

          try {
            const { data, error } = await getUserData(user.id);

            if (!isMounted) return;

            if (error) {
              if (error === "Account is not active") {
                logout();
                router.push("/login?error=Your account is no longer active");
                return;
              }
              setError(error);
            } else {
              setUserData(data);
            }
          } catch (err) {
            if (!isMounted) return;
            setError("Failed to fetch user data");
          }
        };

        checkUserAndFetchData();

        return () => {
          isMounted = false;
        };
      }, [user, isLoading, logout, router]);

      if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-[50vh] p-4">
            <Loader2 className="w-8 h-8 text-cosmic-blue animate-spin" />
          </div>
        );
      }

      if (!user) {
        return null;
      }

      if (error === "Account is not active") {
        return null; // Don't show anything while redirecting
      }

      if (error) {
        return (
          <div className="flex justify-center items-center min-h-[50vh] p-4">
            <div className="text-red-500">Error: {error}</div>
          </div>
        );
      }

      if (!userData) {
        return (
          <div className="flex justify-center items-center min-h-[50vh] p-4">
            <Loader2 className="w-8 h-8 text-cosmic-blue animate-spin" />
          </div>
        );
      }

      return (
        <main className="py-4">
          <section className="pb-8 m-auto">
            <div className="flex flex-col items-center gap-2 px-4">
              <h1 className="mb-4 text-3xl md:text-4xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
                Welcome, {userData.metadata.first_name}!
              </h1>
              <UserProfileForm user={userData} />
            </div>
          </section>
        </main>
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
        "This will add the components `SignUpClient.tsx`, `LoginClient.tsx`, `ForgotPasswordForm.tsx`, etc. and `actions.ts` server actions file and components to your blocks folder located in `cosmic/blocks/user-management`.",
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
        "Create a new file at `app/verify-email/page.tsx` and add the following code.",
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
      description:
        "Create a new file at `app/dashboard/page.tsx` and add the following code. This uses the auth context to check if the user is logged in and fetches the user data from Cosmic.",
    },
    {
      title: "Usage: Navigation menu",
      code: authButtonsExampleCode,
      description:
        "Add the `AuthButtons` component to your navigation menu. This will show the login/logout buttons and user dashboard menu items.",
    },
    {
      title: "Example: Agency Website",
      description: (
        <>
          Check out a full-featured working example{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-cosmic-blue-link dark:text-cosmic-blue"
            href="https://cosmic-agency-template.vercel.app/"
          >
            Agency Website
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
