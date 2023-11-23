import React from "react";
import { WebNavbar } from "./WebNavbar";

interface WebLayoutProps extends React.PropsWithChildren {}

export function WebLayout(props: WebLayoutProps) {
  return (
    <div className="w-full flex flex-col">
      <header>
        <WebNavbar />
      </header>

      <div className="flex flex-1 gap-4 p-2">
        <div className="flex flex-1 p-2">{props.children}</div>
      </div>
    </div>
  );
}
