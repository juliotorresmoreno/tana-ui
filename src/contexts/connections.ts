import React from "react";
import { Connection } from "@/types/common";

type ConnectionsContext = {
  connections: Connection[];
  isLoaded: boolean;
};

const initialValue: ConnectionsContext = {
  connections: [],
  isLoaded: false,
};

export const ConnectionsContext =
  React.createContext<ConnectionsContext>(initialValue);
