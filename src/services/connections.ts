import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getConnections() {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/connections`, {
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
