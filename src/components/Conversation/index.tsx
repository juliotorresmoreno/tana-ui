"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { MentionsInput } from "@/components/MentionsInput";
import { ConversationContext } from "@/contexts/conversation";
import { Button } from "flowbite-react";
import { BsSend } from "react-icons/bs";
import { SessionContext } from "@/contexts/session";
import * as conversation from "@/services/conversation";
import { Utf8ArrayToStr } from "@/lib/utf8";
import { User } from "@/types/models";
import "./styles.css";

interface ChatProps {
  system: string;
  user: User;
  answer: string;
  response: string;
}

const Chat = ({ system, user, answer, response }: ChatProps) => {
  return (
    <div key={answer} className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col bg-green-100 gap-2 p-2">
        <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
          {user.name}:
        </div>
        <pre className="flex-1">{answer}</pre>
      </div>

      <div className="flex flex-col bg-blue-100 gap-1 p-2">
        <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
          {system}:
        </div>
        <pre className="flex-1 comments">{response}</pre>
      </div>
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

  const sendMessage = async () => {
    try {
      if (!current) return;
      setIsLoading(true);

      answer = message;
      setMessage("");

      const data = {
        id: current.id.toString(),
        prompt: message,
      };

      if (answerRef.current) answerRef.current.textContent = answer;
      if (windowRef.current) {
        windowRef.current?.classList.remove("hidden");
        windowRef.current.style.width = windowRef.current.clientWidth + "px";
      }

      const response = await conversation.sendMessage(
        session?.token as string,
        data
      );
      const reader = (response.body as ReadableStream<Uint8Array>).getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done || !value) {
          break;
        }

        const data = Utf8ArrayToStr(value);

        chunks = chunks + data;
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
        { answer, response: chunks.trim() },
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
          <dl className="bg-slate-200 p-2">
            <dt className="text-lg font-bold">
              {current?.name} {current?.surname}
            </dt>
            <dd>{current?.description}</dd>
          </dl>
        </div>
        <div>
          {history.map((item) =>
            Chat({
              user: session?.user as User,
              system: current?.name ?? "",
              answer: item.answer,
              response: item.response,
            })
          )}

          <div ref={windowRef} className={"flex flex-col gap-2 mt-2 hidden"}>
            <div className="flex flex-col bg-green-100 gap-2 p-2">
              <span className="text-lg font-bold">{session?.user.name}:</span>
              <pre className="flex-1" ref={answerRef}>
                {answer}
              </pre>
            </div>

            <div className="flex flex-col bg-blue-100 gap-1 p-2">
              <span className="text-lg font-bold">{current?.name}:</span>
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
