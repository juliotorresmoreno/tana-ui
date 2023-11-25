"use client";

import React, { useContext, useState } from "react";
import { MentionsInput } from "./MentionsInput";
import { ConversationContext } from "@/contexts/conversation";
import { Button } from "flowbite-react";
import { BsSend } from "react-icons/bs";
import { SessionContext } from "@/contexts/session";
import * as conversation from "@/services/conversation";
import { Utf8ArrayToStr } from "@/lib/utf8";

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const { session } = useContext(SessionContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { current, history, setHistory } = useContext(ConversationContext);

  const sendMessage = async () => {
    try {
      if (!current) return;
      setIsLoading(true);

      const answer = message;
      setMessage("");

      const data = {
        id: current.id.toString(),
        prompt: message,
      };

      const response = await conversation.sendMessage(data);
      const reader = (response.body as ReadableStream<Uint8Array>).getReader();
      let chunk = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done || !value) {
          break;
        }

        const data = Utf8ArrayToStr(value);
        chunk += data;
      }

      setHistory((history) => [...history, { answer, response: chunk }]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div
        style={{ width: "calc(100vw - 275px)" }}
        className="flex flex-1 flex-col overflow-x-hidden"
      >
        <div>
          <dl className="bg-slate-200 p-2">
            <dt className="text-lg font-bold">
              {current?.name} {current?.surname}
            </dt>
            <dd>{current?.description}</dd>
          </dl>
        </div>
        <div>{JSON.stringify(history)}</div>
      </div>
      <div className="flex flex-row gap-2">
        <MentionsInput
          onKeyDown={handleKeyPress}
          disabled={!current || isLoading}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="flex-1"
          AtList={<>AtList</>}
          HashList={<>HashList</>}
          onArrowUp={() => alert("up")}
          onArrowDown={() => alert("down")}
        />
        <Button onClick={() => sendMessage()} disabled={!current || isLoading}>
          <BsSend />
        </Button>
      </div>
    </div>
  );
}
