import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function getSession() {
      setSession(null);
      setIsLoaded(true);
    }
    getSession();
  });

  return { session, isLoaded };
}
