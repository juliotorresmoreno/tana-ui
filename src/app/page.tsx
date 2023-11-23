"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Conversation } from "@/components/Conversation";
import { SessionContext } from "@/contexts/session";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { session } = useContext(SessionContext);

  if (!session) redirect("/auth/sign-up");

  return (
    <main className="flex">
      <AppLayout connections={<AppConnections />}>
        <Conversation />
      </AppLayout>
    </main>
  );
}
