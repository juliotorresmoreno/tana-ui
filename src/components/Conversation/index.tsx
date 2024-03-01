"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ConversationContext } from "@/contexts/conversation";
import { Button, Modal } from "flowbite-react";
import { BsSend } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { SessionContext } from "@/contexts/session";
import * as mmlu from "@/services/mmlu";
import { getConfig } from "@/config";
import { Message, Response } from "@/types/models";
import { Input } from "../Input";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";
import "./styles.css";

interface ChatProps extends Message {}

const Chat = ({
  getData,
  ...message
}: ChatProps & { getData: () => Promise<void> }) => {
  const [openModalForDelete, setOpenModalForDelete] = useState(false);

  const handleDelete = async () => {
    if (openModalForDelete === null) return;
    const response = await mmlu.deleteMessage(message.mmlu.id, message.id);
    const data: Response = await response.json();
    toast.success(data.message);
    setOpenModalForDelete(false);
    getData();
  };

  return (
    <>
      <Toaster />
      <Modal
        show={openModalForDelete}
        onClose={() => setOpenModalForDelete(false)}
      >
        <Modal.Header>Delete message</Modal.Header>
        <Modal.Body>
          Do you really want to delete this message?
          <div className="w-full">
            <span>{message.content.substring(0, 100) + " ..."}</span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleDelete}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModalForDelete(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="flex flex-row gap-2 mt-2">
        <div className="flex flex-1 flex-col  gap-1 p-2">
          <div className="text-lg flex-col font-bold wh-normal m-0 p-0">
            {message.role}:
          </div>
          <pre className="flex-1 comments">{message.content}</pre>
        </div>
        <div className="p-2 pr-4">
          <span
            className="text-red-700 cursor-pointer text-xl"
            onClick={() => setOpenModalForDelete(true)}
          >
            <RiDeleteBin2Fill />
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

interface ConversationProps {}

export function Conversation(props: ConversationProps) {
  const config = getConfig();
  const { session } = useContext(SessionContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { current, history, setHistory } = useContext(ConversationContext);
  const conversationRef = useRef<HTMLDivElement>(null);
  const apiUrl = useMemo(() => config.apiUrl, [config]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function getData() {
    if (!current || current?.id === 0) return;
    const data = await (await mmlu.getMessages(current.id)).json();
    setHistory(data);
  }

  useEffect(() => {
    getData();
  }, [session, current?.id]);

  useEffect(() => {
    const sse = new EventSource(apiUrl + "/events", {
      withCredentials: true,
    });
    function getRealtimeData(data: Message) {
      if (data.mmlu.id !== current?.id) return;

      setHistory((history) => [...history, data]);
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
    return () => sse.close();
  }, [apiUrl, current?.id]);

  useEffect(() => {
    if (conversationRef.current)
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [history]);

  const sendMessage = async () => {
    try {
      if (!current) return;
      setIsLoading(true);
      setMessage("");

      await mmlu.sendMessage({
        bot_id: current.id,
        content: message,
      });
      await getData();
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
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

        await mmlu.attach({
          bot_id: current.id,
          attachment: content,
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

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
          {history.map((item) => (
            <Chat key={item.id} {...item} getData={getData} />
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          className="rounded-none"
          onClick={() => handleAttachment()}
          disabled={!current || isLoading}
        >
          <CgAttachment />
        </Button>
        <Input
          type="text"
          onKeyDown={handleKeyPress}
          disabled={!current || isLoading}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
        />
        <Button
          className="rounded-none"
          onClick={() => sendMessage()}
          disabled={!current || isLoading || !message}
        >
          <BsSend />
        </Button>
      </div>
    </div>
  );
}
