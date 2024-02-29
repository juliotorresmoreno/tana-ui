import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getCredentials() {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/credentials`, {
    method: "GET",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        cause: { message: `HTTP error! Status: ${response.status}` },
      });

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

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        cause: { message: `HTTP error! Status: ${response.status}` },
      });

    throw new FetchError({
      cause: await response.json(),
    });
  }

  return response;
}

export async function deleteCredential(id: number) {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/credentials/${id}`, {
    method: "DELETE",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.indexOf("application/json") === -1)
      throw new FetchError({
        cause: { message: `HTTP error! Status: ${response.status}` },
      });

    throw new FetchError({
      cause: await response.json(),
    });
  }

  return response;
}
