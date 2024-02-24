import { AppLayout } from "./AppLayout";

export function Loading() {
  return (
    <main className="flex">
      <AppLayout connections={null}>
        <div className="flex-1"></div>
      </AppLayout>
    </main>
  );
}
