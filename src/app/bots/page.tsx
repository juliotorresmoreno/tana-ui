"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex">
        <AppLayout connections={<AppConnections />}>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">bots</h1>
          </div>
        </AppLayout>
      </main>
    </Suspense>
  );
}
