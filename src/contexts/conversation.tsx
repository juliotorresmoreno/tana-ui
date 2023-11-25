import { Connection } from "@/types/common";
import { Message } from "@/types/models";
import React, { PropsWithChildren, useState } from "react";

type ConversationContext = {
  current: Connection | null;
  setCurrent(conversaition: any): void;

  history: Array<Message>;
  setHistory: React.Dispatch<React.SetStateAction<Message[]>>;
};

const initialValue: ConversationContext = {
  current: null,
  setCurrent(conversaition) {},
  history: [],
  setHistory(history) {},
};

export const ConversationContext =
  React.createContext<ConversationContext>(initialValue);

export const ConversationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState<Message[]>([]);

  return (
    <ConversationContext.Provider
      value={{ current, setCurrent, history, setHistory }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
