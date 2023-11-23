"use client";

import React, { useContext, useState } from "react";
import { Button } from "flowbite-react";
import { ConversationContext } from "@/contexts/conversation";
import { MentionsInput } from "./MentionsInput";
import { BsSend } from "react-icons/bs";

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const [message, setMessage] = useState("");
  const conversationContext = useContext(ConversationContext);
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
          disabled={!conversationContext.current}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="flex-1"
          AtList={<>AtList</>}
          HashList={<>HashList</>}
          onArrowUp={() => alert("up")}
          onArrowDown={() => alert("down")}
        />
        <Button disabled={!conversationContext.current}>
          <BsSend />
        </Button>
      </div>
    </div>
  );
}
