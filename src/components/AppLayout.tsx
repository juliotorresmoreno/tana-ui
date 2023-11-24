import React, { useContext, useEffect } from "react";
import { AppNavbar } from "./AppNavbar";
import { SessionContext } from "@/contexts/session";

interface AppLayoutProps extends React.PropsWithChildren {
  connections: React.ReactNode;
}

export function AppLayout(props: AppLayoutProps) {
  const { isLoading } = useContext(SessionContext);
  if (isLoading) return null;
  return (
    <div className="w-full flex flex-col">
      <header>
        <AppNavbar />
      </header>

      <div className="flex flex-1 gap-4 p-2">
        <div className="flex">{props.connections}</div>

        <div className="flex flex-1 border border-solid border-gray-200 p-2">
          {props.children}
        </div>
      </div>
    </div>
  );
}
