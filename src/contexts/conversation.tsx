import { Connection } from "@/types/common";
import React, { PropsWithChildren, useState } from "react";

type ConversationContext = {
  current: Connection | null;
  setCurrent(conversaition: any): void;
};

const initialValue: ConversationContext = {
  current: null,
  setCurrent(conversaition) {},
};

export const ConversationContext =
  React.createContext<ConversationContext>(initialValue);

export const ConversationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [current, setCurrent] = useState(null);

  return (
    <ConversationContext.Provider value={{ current, setCurrent }}>
      {children}
    </ConversationContext.Provider>
  );
};
