"use client";

import React, { useContext, useState } from "react";
import { MentionsInput } from "./MentionsInput";
import { ConversationContext } from "@/contexts/conversation";
import { WebSocketContext } from "@/contexts/websocket";
import { Button } from "flowbite-react";
import { BsSend } from "react-icons/bs";

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const ws = useContext(WebSocketContext);
  const [message, setMessage] = useState("");
  const conversationContext = useContext(ConversationContext);

  const sendMessage = () => {
    if (!ws?.socket) return;

    const data = {
      event: "message",
      data: message,
    };

    ws.socket.send(JSON.stringify(data));
    setMessage("");
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
        className="flex flex-1 overflow-x-hidden"
      >
        <div>
          <dl className="bg-slate-200 p-2">
            <dt className="text-lg font-bold">
              {conversationContext.current?.name}{" "}
              {conversationContext.current?.surname}
            </dt>
            <dd>{conversationContext.current?.description}</dd>
          </dl>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <MentionsInput
          onKeyDown={handleKeyPress}
          disabled={!conversationContext.current}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="flex-1"
          AtList={<>AtList</>}
          HashList={<>HashList</>}
          onArrowUp={() => alert("up")}
          onArrowDown={() => alert("down")}
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!conversationContext.current}
        >
          <BsSend />
        </Button>
      </div>
    </div>
  );
}
