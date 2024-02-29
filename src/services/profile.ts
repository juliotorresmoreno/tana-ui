import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getProfile() {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
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

export interface UpdateProfileData {
  name: string;
  last_name: string;
  business: string;
  position_name: string;
  url: string;
  description: string;
}

export async function updateProfile(data: UpdateProfileData) {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
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
