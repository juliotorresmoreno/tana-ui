import { Metadata } from "next";
import AuthenticationPage from "@/components/AuthenticationPage";
import { UserRegisterForm } from "@/components/forms/UserRegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unlock the Power of our Bot",
  description:
    "Discover the potential of our bot, designed to streamline tasks and enhance productivity with cutting-edge components.",
};

export default function SignUp() {
  return (
    <AuthenticationPage
      link={
        <Link
          href="/auth/sign-in"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Login
        </Link>
      }
      title={
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
      }
    >
      <UserRegisterForm />
    </AuthenticationPage>
  );
}
