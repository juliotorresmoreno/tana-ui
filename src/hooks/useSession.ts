import { Session } from "@/types/models";
import { useEffect, useState } from "react";
import { getSession } from "@/services/auth";
import { useRouter } from "next/navigation";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        if (isLoading) {
          const result = await getSession();
          setSession(result);
        }
      } catch (error) {
        setSession(null);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [session, isLoading, setSession]);

  return { session, setSession, isLoading, setIsLoading };
}
