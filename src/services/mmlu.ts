import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getMmlu(): Promise<Response> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/mmlu`, {
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

type createMmluPayload = {
  name: string;
  photo_url: string;
  description: string;
  provider: string;
  model: string;
};

export async function createMmlu(
  payload: createMmluPayload
): Promise<Response> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/mmlu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

type updateMmluPayload = {
  name: string;
  photo_url: string;
  description: string;
  provider: string;
  model: string;
};

export async function updateMmlu(
  id: number,
  payload: updateMmluPayload
): Promise<Response> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/mmlu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

export async function deleteMmlu(id: number): Promise<Response> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/mmlu/${id}`, {
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
