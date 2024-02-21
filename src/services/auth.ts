import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";
import { useFetch } from "@/hooks/useFetch";
import { Session } from "@/types/models";

export function useSignUp() {
  const config = getConfig();

  return useFetch<Session>({
    url: `${config.apiUrl}/auth/sign-up`,
    options: {
      method: "POST",
    },
  });
}
export function useSignIn() {
  const config = getConfig();

  return useFetch<Session>({
    url: `${config.apiUrl}/auth/sign-in`,
    options: {
      method: "POST",
    },
  });
}

let sessionPromise: Promise<Session> | null = null;

export async function getSession(): Promise<Session> {
  if (!sessionPromise) {
    sessionPromise = getSessionInternal();
  }

  try {
    return await sessionPromise;
  } finally {
    sessionPromise = null;
  }
}

async function getSessionInternal(): Promise<Session> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/auth/session`, {
    method: "GET",
  });
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        message: `HTTP error! Status: ${response.status}`,
        statusCode: 400,
      });

    throw new FetchError(await response.json());
  }

  return response.json();
}
