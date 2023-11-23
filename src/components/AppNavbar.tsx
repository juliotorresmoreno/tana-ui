"use client";

import { Navbar } from "flowbite-react";
import { useContext } from "react";
import { MenuContext } from "@/contexts/menu";
import { ConversationContext } from "@/contexts/conversation";

export function AppNavbar() {
  const menuContext = useContext(MenuContext);
  const conversationContext = useContext(ConversationContext);
  return (
    <div className="flex flex-1 h-11">
      <Navbar className="fixed sm:static w-full z-50 bg-white" fluid rounded>
        <Navbar.Brand onClick={menuContext.toggle} className="cursor-pointer">
          <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            BuildHub
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="bg-white">
          <Navbar.Link as="button" disabled={!conversationContext.current}>
            Call
          </Navbar.Link>
          <Navbar.Link as="button" disabled={!conversationContext.current}>
            VideoCall
          </Navbar.Link>
          <Navbar.Link as="button" disabled={!conversationContext.current}>
            Attach
          </Navbar.Link>
          <Navbar.Link as="button" disabled={!conversationContext.current}>
            Documents
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
