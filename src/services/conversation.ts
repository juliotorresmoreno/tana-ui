import { FetchError } from "@/common/errors";
import { getConfig } from "@/config";

type sendMessageArgs = {
  bot_id: number;
  prompt: string;
};

export async function sendMessage(data: sendMessageArgs) {
  const config = getConfig();

  const response = await fetch(`${config.aiUrl}/conversation/${data.bot_id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ prompt: data.prompt }),
  });

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
  }

  return response;
}

export async function getConversation(bot_id: number) {
  const config = getConfig();

  const response = await fetch(`${config.aiUrl}/conversation/${bot_id}`, {
    method: "GET",
    headers: {},
  });

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
  }

  return response;
}

interface AttachArgs {
  bot_id: number;
  attachment: string;
}

export async function attach(data: AttachArgs) {
  const config = getConfig();

  const response = await fetch(
    `${config.aiUrl}/conversation/${data.bot_id}/attach`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ attachment: data.attachment }),
    }
  );

  if (!response.ok || response.body === null) {
    throw new FetchError("Unexpected error");
  }

  return response;
}
