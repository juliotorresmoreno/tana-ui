import { FetchError } from "@/common/errors";
import { useState } from "react";

interface FetchProps {
  url: string;
  options?: RequestInit;
}

interface FetchHookResult<T = any, B = Object | FormData> {
  isLoading: boolean;
  fetch: (body?: B) => Promise<T>;
}

export const useFetch = <T = any, B = Object | FormData>(
  props: FetchProps
): FetchHookResult<T, B> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (body?: B): Promise<T> => {
    setIsLoading(true);

    try {
      const opts = { ...props.options };
      if (body) {
        if (body instanceof FormData) {
          opts.body = body;
        } else {
          opts.body = JSON.stringify(body);
          opts.headers = {
            ...opts.headers,
            "Content-Type": "application/json",
          };
        }
      }

      const response = await fetch(props.url, opts);
      const contentType = response.headers.get("content-type") ?? "";

      if (!response.ok) {
        if (contentType.indexOf("application/json") === -1)
          throw new FetchError({
            message: `HTTP error! Status: ${response.status}`,
            statusCode: 400,
          });

        throw new FetchError(await response.json());
      }

      // @ts-ignore
      if (contentType.indexOf("application/json") === -1) return;

      return response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetch: fetchData };
};
