"use client";

import { AppLayout } from "@/components/AppLayout";
import { Loading } from "@/components/Loading";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex">
        <AppLayout connections={null}>
          <div className="flex flex-1 flex-col gap-2">
            <section className="bg-gray-50 p-3 sm:p-5 flex flex-1">
              <ProfileForm />
            </section>
          </div>
        </AppLayout>
      </main>
    </Suspense>
  );
}
