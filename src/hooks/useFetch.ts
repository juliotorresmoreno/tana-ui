import { FetchError } from "@/common/errors";
import { useState } from "react";

interface FetchHookProps {
  url: string;
  options?: RequestInit;
}

interface FetchHookResult<T> {
  isLoading: boolean;
  fetchData: () => Promise<T>;
}

export const useFetch = <T>({
  url,
  options,
}: FetchHookProps): FetchHookResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<T> => {
    setIsLoading(true);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new FetchError(
          `HTTP error! Status: ${response.status}`,
          response.status
        );
      }

      return response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData };
};
