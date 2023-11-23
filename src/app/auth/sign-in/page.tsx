import { Metadata } from "next";
import { UserLoginForm } from "@/components/forms/UserLoginForm";
import AuthenticationPage from "@/components/AuthenticationPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simplify Your Access with our Bot",
  description:
    "Experience seamless logins with our advanced bot components, making access easier and more efficient than ever before.",
};

export default function SignIn() {
  return (
    <AuthenticationPage
      link={
        <Link
          href="/auth/sign-up"
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
        >
          Register
        </Link>
      }
      title={
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to sign in
          </p>
        </div>
      }
    >
      <UserLoginForm />
    </AuthenticationPage>
  );
}
