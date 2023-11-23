import { Connection } from "@/types/common";
import React from "react";

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
