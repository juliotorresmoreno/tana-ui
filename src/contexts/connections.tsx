import React, { PropsWithChildren } from "react";
import { Connection } from "@/types/common";
import { useConnections } from "@/hooks/useConnections";

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

export const ConnectionsContextProvider = ({ children }: PropsWithChildren) => {
  const { connections, isLoaded: connectionsIsLoaded } = useConnections();

  return (
    <ConnectionsContext.Provider
      value={{ connections, isLoaded: connectionsIsLoaded }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
