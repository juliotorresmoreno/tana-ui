import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

export async function getConversation(id: string): Promise<any> {
  return [];
}

export async function sendMessage(token: string, data: any) {
  const config = getConfig();

  const response = await fetch(`${config.apiUrl}/mmlu/answer`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
  }

  return response;
}
