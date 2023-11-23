"use client";

import Provider from "@/components/Provider";
import { WebLayout } from "@/components/WebLayout";

export default function About() {
  return (
    <main className="flex">
      <Provider>
        <WebLayout>About</WebLayout>
      </Provider>
    </main>
  );
}
