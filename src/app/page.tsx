"use client";

import { useContext } from "react";
import Link from "next/link";
import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Conversation } from "@/components/Conversation";
import { SessionContext } from "@/contexts/session";
import AuthenticationPage from "@/components/AuthenticationPage";
import { UserRegisterForm } from "@/components/forms/UserRegisterForm";

export default function Home() {
  const { session, isLoading } = useContext(SessionContext);

  if (isLoading) return null;

  if (session === null)
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

  return (
    <main className="flex">
      <AppLayout connections={<AppConnections />}>
        <Conversation />
      </AppLayout>
    </main>
  );
}
