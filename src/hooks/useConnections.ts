import { getConnections } from "@/services/connections";
import { Connection } from "@/types/common";
import { useEffect, useState } from "react";

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPeople() {
      try {
        const response = await getConnections();
        if (!response.ok) {
          throw new Error("Error fetching connections");
        }

        const connectionsData: Connection[] = await response.json();
        setConnections(connectionsData);
        setIsLoaded(true);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      }
    }

    getPeople();
  }, []);

  return { connections, isLoaded, error };
}
