import { Session } from "@/types/models";
import { useLocalStorage } from "./useLocalStore";
import { useEffect, useState } from "react";
import { getSession } from "@/services/auth";

export function useSession() {
  const [session, setSession] = useLocalStorage<Session | null>(
    "session",
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (!session) {
        setIsLoading(false);
        return;
      }

      // Evitar que se ejecute más de una vez al montar el componente
      if (isLoading) {
        const result = await getSession(session.token);

        setSession(result);
        setIsLoading(false);
      }
    }

    getData();
  }, [session, isLoading, setSession]);

  return { session, setSession, isLoading, setIsLoading };
}
