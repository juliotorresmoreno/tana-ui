import { getConfig } from "@/config";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionContext } from "./session";

interface WebSocketProviderProps extends React.PropsWithChildren {}

export interface WebSocketContextType {
  socket: WebSocket | null;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { session } = useContext(SessionContext);
  const url = `${getConfig().wsUrl}?token=${session?.token}`;

  useEffect(() => {
    let newSocket = new WebSocket(
      `${url}?token=${session?.token}`,
      "websocket"
    );

    const handleOpen = () => {
      console.log("WebSocket connection opened.");
      setSocket(newSocket);
    };

    const handleClose = (event: CloseEvent) => {
      console.log(
        `WebSocket connection closed with code: ${event.code}, reason: ${event.reason}`
      );
      setSocket(null);
    };

    const handleMessage = (event: any) => {
      console.log(
        `WebSocket connection closed with code: ${event.code}, reason: ${event.reason}`
      );
      setSocket(null);
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("close", handleClose);

    newSocket.addEventListener("message", handleMessage);

    const reconnectInterval = 3000;
    let reconnectIntervalId: NodeJS.Timeout | null = null;

    const startReconnectInterval = () => {
      reconnectIntervalId = setInterval(() => {
        if (newSocket.readyState === WebSocket.CLOSED) {
          console.log("Attempting to reconnect...");
          newSocket = new WebSocket(url);
          newSocket.addEventListener("open", handleOpen);
          newSocket.addEventListener("close", handleClose);
        }
      }, reconnectInterval);
    };

    startReconnectInterval();

    return () => {
      newSocket.close();
      if (reconnectIntervalId) {
        clearInterval(reconnectIntervalId);
      }
    };
  }, [url]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
