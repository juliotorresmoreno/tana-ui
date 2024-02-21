"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";

export default function Page() {
  return (
    <main className="flex">
      <AppLayout connections={<AppConnections />}>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Attach</h1>
        </div>
      </AppLayout>
    </main>
  );
}
