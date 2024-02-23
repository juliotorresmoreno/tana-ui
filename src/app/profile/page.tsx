"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Loading } from "@/components/Loading";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex">
        <AppLayout connections={<AppConnections />}>
          <div className="flex flex-1 flex-col gap-2">
            <section className="bg-white p-3">
              <ProfileForm />
            </section>
          </div>
        </AppLayout>
      </main>
    </Suspense>
  );
}
