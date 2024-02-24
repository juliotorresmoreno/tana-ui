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

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
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

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
  }

  return response;
}
