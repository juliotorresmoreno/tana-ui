import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getModels(): Promise<Response> {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/models`, {
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
