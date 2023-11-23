"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Conversation } from "@/components/Conversation";

export default function Home() {
  return (
    <AppLayout connections={<AppConnections />}>
      <Conversation />
    </AppLayout>
  );
}
