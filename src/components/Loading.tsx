import { AppConnections } from "./AppConnections";
import { AppLayout } from "./AppLayout";

export function Loading() {
  return (
    <main className="flex">
      <AppLayout connections={<AppConnections />}>
        <div className="flex-1"></div>
      </AppLayout>
    </main>
  );
}
