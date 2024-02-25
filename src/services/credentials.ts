import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getCredentials() {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/credentials`, {
    method: "GET",
  });

  if (!response.ok || response.body === null) {
    throw new FetchError({
      cause: await response.json(),
    });
  }

  return response;
}

export async function generateCredential() {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/credentials/generate`, {
    method: "POST",
  });

  if (!response.ok || response.body === null) {
    throw new FetchError({
      cause: await response.json(),
    });
  }

  return response;
}

export async function deleteCredential(id: number) {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/credentials/generate/${id}`, {
    method: "DELETE",
  });

  if (!response.ok || response.body === null) {
    throw new FetchError({
      cause: await response.json(),
    });
  }

  return response;
}
