"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { MentionsInput } from "@/components/MentionsInput";
import { ConversationContext } from "@/contexts/conversation";
import { Button } from "flowbite-react";
import { BsSend } from "react-icons/bs";
import { SessionContext } from "@/contexts/session";
import * as conversation from "@/services/conversation";
import { Utf8ArrayToStr } from "@/lib/utf8";
import "./styles.css";

interface ChatProps {
  id: string;
  content: string;
  user: string;
}

const Chat = ({ id, content, user }: ChatProps) => {
  return (
    <div key={id} className="flex flex-col gap-2 mt-2">
      {user === "human" && (
        <div className="flex flex-col bg-green-100 gap-2 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {user}:
          </div>
          <pre className="flex-1">{content}</pre>
        </div>
      )}
      {user === "ai" && (
        <div className="flex flex-col bg-blue-100 gap-1 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {user}:
          </div>
          <pre className="flex-1 comments">{content}</pre>
        </div>
      )}
      {user === "system" && (
        <div className="flex flex-col bg-purple-200 gap-1 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {user}:
          </div>
          <pre className="flex-1 comments">{content}</pre>
        </div>
      )}
    </div>
  );
};

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const { session } = useContext(SessionContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { current, history, setHistory } = useContext(ConversationContext);
  const answerRef = useRef<HTMLPreElement>(null);
  const responseRef = useRef<HTMLPreElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  let answer: string = "";
  let chunks: string = "";

  useEffect(() => {
    async function getData() {
      if (!current || current?.id === 0) return;
      const data = await (
        await conversation.getConversation(current.id)
      ).json();
      setHistory(data);
    }
    getData();
  }, [session, current?.id]);

  const sendMessage = async () => {
    try {
      if (!current) return;
      setIsLoading(true);

      answer = message;
      setMessage("");

      const data = {
        bot_id: current.id,
        prompt: message,
      };

      if (answerRef.current) answerRef.current.textContent = answer;
      if (windowRef.current) {
        windowRef.current?.classList.remove("hidden");
        windowRef.current.style.width = windowRef.current.clientWidth + "px";
      }
      if (conversationRef.current)
        conversationRef.current.scrollTop =
          conversationRef.current.scrollHeight;

      const response = await conversation.sendMessage(data);
      const reader = (response.body as ReadableStream<Uint8Array>).getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done || !value) {
          break;
        }

        const data = Utf8ArrayToStr(value);

        chunks = chunks + data;
        console.log(responseRef.current, chunks);
        if (responseRef.current) {
          responseRef.current.innerHTML = chunks.trim();
        }
        if (conversationRef.current)
          conversationRef.current.scrollTop =
            conversationRef.current.scrollHeight;
      }
      if (responseRef.current) responseRef.current.innerHTML = "";
      if (windowRef.current) {
        windowRef.current?.classList.add("hidden");
        windowRef.current.style.width = "";
      }

      setHistory((history) => [
        ...history,
        { id: (Date.now() + 2).toString(), content: answer, user: "human" },
        { id: (Date.now() + 5).toString(), content: chunks.trim(), user: "ai" },
      ]);

      chunks = "";
      answer = "";
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (conversationRef.current)
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div
        ref={conversationRef}
        style={{
          width: "calc(100vw - 275px)",
          maxHeight: "calc(100vh - 60px)",
        }}
        className="flex flex-1 flex-col overflow-x-hidden"
      >
        <div>
          {history.map((item) => Chat(item))}

          <div ref={windowRef} className={"flex flex-col gap-2 mt-2 hidden"}>
            <div className="flex flex-col bg-green-100 gap-2 p-2">
              <span className="text-lg font-bold">human:</span>
              <pre className="flex-1" ref={answerRef}>
                {answer}
              </pre>
            </div>

            <div className="flex flex-col bg-blue-100 gap-1 p-2">
              <span className="text-lg font-bold">ai:</span>
              <pre className="flex-1 comments" ref={responseRef}></pre>
            </div>
          </div>
        </div>
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
