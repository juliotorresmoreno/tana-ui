"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MentionsInput } from "@/components/MentionsInput";
import { ConversationContext } from "@/contexts/conversation";
import { Button } from "flowbite-react";
import { BsSend } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { SessionContext } from "@/contexts/session";
import * as conversation from "@/services/conversation";
import { Utf8ArrayToStr } from "@/lib/utf8";
import { getConfig } from "@/config";
import { Message } from "@/types/models";
import "./styles.css";
import { Input } from "../Input";

interface ChatProps extends Message {}

const Chat = ({ id, content, rol }: ChatProps) => {
  return (
    <div key={id} className="flex flex-col gap-2 mt-2">
      {rol === "human" && (
        <div className="flex flex-col bg-green-100 gap-2 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {rol}:
          </div>
          <pre className="flex-1">{content}</pre>
        </div>
      )}
      {rol === "ai" && (
        <div className="flex flex-col bg-blue-100 gap-1 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {rol}:
          </div>
          <pre className="flex-1 comments">{content}</pre>
        </div>
      )}
      {rol === "system" && (
        <div className="flex flex-col bg-purple-200 gap-1 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {rol}:
          </div>
          <pre className="flex-1 comments">{content}</pre>
        </div>
      )}
    </div>
  );
};

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const config = getConfig();
  const { session } = useContext(SessionContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { current, history, setHistory } = useContext(ConversationContext);
  const answerRef = useRef<HTMLPreElement>(null);
  const responseRef = useRef<HTMLPreElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const apiUrl = useMemo(() => config.apiUrl, [config]);
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

  useEffect(() => {
    const sse = new EventSource(apiUrl + "/events", {
      withCredentials: true,
    });
    function getRealtimeData(data: Message) {
      setHistory((history) => [...history, data]);
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
    return () => sse.close();
  }, [apiUrl]);

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

  const handleAttachment = () => {
    if (!current) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;

        if (current?.id === undefined) return;

        await conversation.attach({
          bot_id: current.id,
          attachment: content,
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
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
        <Button
          onClick={() => handleAttachment()}
          disabled={!current || isLoading}
        >
          <CgAttachment />
        </Button>
        <Input
          onKeyDown={handleKeyPress}
          disabled={!current || isLoading}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!current || isLoading || !message}
        >
          <BsSend />
        </Button>
      </div>
    </div>
  );
}
