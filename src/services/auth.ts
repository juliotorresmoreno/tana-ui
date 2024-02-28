import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";
import { Session } from "@/types/models";


type signUpPayload = {
  name: string
  last_name: string
  email: string,
  password: string,
}

export async function signUp(payload: signUpPayload): Promise<Session> {
  const config = getConfig();
  const response = await fetch(`${config.apiUrl}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        cause: `HTTP error! Status: ${response.status}`,
      });

    throw new FetchError({
      cause: await response.json()
    });
  }

  return response.json();
}

type signInPayload = {
  email: string,
  password: string,
}

export async function signIn(payload: signInPayload): Promise<Session> {
  const config = getConfig();
  const response = await fetch(`${config.apiUrl}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        cause: `HTTP error! Status: ${response.status}`,
      });

    throw new FetchError({
      cause: await response.json()
    });
  }

  return response.json();
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
        cause: `HTTP error! Status: ${response.status}`,
      });

    throw new FetchError({
      cause: await response.json()
    });
  }

  return response.json();
}
