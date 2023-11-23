import React, { useContext } from "react";
import { AppNavbar } from "./AppNavbar";
import { SessionContext } from "@/contexts/session";
import { redirect } from "next/navigation";

interface AppLayoutProps extends React.PropsWithChildren {
  connections: React.ReactNode;
}

export function AppLayout(props: AppLayoutProps) {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext.session) {
    redirect("/auth/sign-in");
  }
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
