"use client";

import { ConnectionsContextProvider } from "@/contexts/connections";
import { ConversationContextProvider } from "@/contexts/conversation";
import { MenuContextProvider } from "@/contexts/menu";
import { SessionContext } from "@/contexts/session";
import { WebSocketProvider } from "@/contexts/websocket";
import { useSession } from "@/hooks/useSession";
import { PropsWithChildren, ReactNode } from "react";

const providers = [
  WebSocketProvider,
  ConnectionsContextProvider,
  ConversationContextProvider,
  MenuContextProvider,
];

type Component =
  | React.FC<React.PropsWithChildren>
  | ((c: PropsWithChildren) => JSX.Element);

const RenderMap = (acc: ReactNode, Comp: Component) => <Comp>{acc}</Comp>;

interface ProviderProps extends React.PropsWithChildren {}

export default function Provider(props: ProviderProps) {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>
      {session
        ? providers.reduceRight(RenderMap, props.children)
        : props.children}
    </SessionContext.Provider>
  );
}
