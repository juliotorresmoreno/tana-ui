import { Session } from "@/types/models";
import { useEffect, useState } from "react";
import { getSession } from "@/services/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        if (isLoading) {
          const result = await getSession();
          setSession(result);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [session, isLoading, setSession]);

  return { session, setSession, isLoading, setIsLoading };
}
