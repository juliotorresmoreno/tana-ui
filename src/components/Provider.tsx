"use client";

import { ConnectionsContext } from "@/contexts/connections";
import { ConversationContext } from "@/contexts/conversation";
import { MenuContext } from "@/contexts/menu";
import { SessionContext } from "@/contexts/session";
import { useConnections } from "@/hooks/useConnections";
import { useSession } from "@/hooks/useSession";
import { useState } from "react";

interface ProviderProps extends React.PropsWithChildren {}

export default function Provider(props: ProviderProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [current, setCurrent] = useState(null);
  const { connections, isLoaded: connectionsIsLoaded } = useConnections();
  const { session } = useSession();

  if (session) {
    return (
      <SessionContext.Provider value={{ session: session }}>
        {props.children}
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider value={{ session: session }}>
      <ConnectionsContext.Provider
        value={{ connections, isLoaded: connectionsIsLoaded }}
      >
        <ConversationContext.Provider value={{ current, setCurrent }}>
          <MenuContext.Provider value={{ isOpen, toggle }}>
            {props.children}
          </MenuContext.Provider>
        </ConversationContext.Provider>
      </ConnectionsContext.Provider>
    </SessionContext.Provider>
  );
}
