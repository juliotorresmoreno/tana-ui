"use client";

import { useContext, useState } from "react";
import { MenuContext } from "@/contexts/menu";
import { Input } from "./Input";
import { ConversationContext } from "@/contexts/conversation";
import classNames from "classnames";
import { BsPersonCircle } from "react-icons/bs";
import { ConnectionsContext } from "@/contexts/connections";
import { Connection } from "@/types/common";
import Image from "next/image";

interface AppConnectionsProps {}

function title(person: Connection) {
  return person.name + " " + person.surname;
}

export function AppConnections(props: AppConnectionsProps) {
  const [filter, setFilter] = useState("");
  const { connections, isLoaded } = useContext(ConnectionsContext);
  const menuContext = useContext(MenuContext);
  const conversationContext = useContext(ConversationContext);
  if (!menuContext.isOpen) return null;

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div>
        <Input
          onChange={(evt) => setFilter(evt.target.value)}
          disabled={!isLoaded}
          id="search"
          type="text"
          className="rounded-none"
          autoComplete="off"
        />
      </div>

      {isLoaded ? (
        <ul
          style={{ maxHeight: "calc(100vh - 110px)" }}
          role="list"
          className="w-full divide-y divide-gray-200 dark:divide-gray-700 gap-2 flex flex-col overflow-x-auto"
        >
          {connections
            .filter(
              (item) =>
                filter === "" || title(item).toLowerCase().indexOf(filter) + 1
            )
            .map((item) => {
              const active = classNames({
                "font-medium": conversationContext.current !== item,
                "font-semibold": conversationContext.current === item,
              });
              const status = classNames({
                "text-red-500": true,
                "text-blue-500": true,
                "text-green-500": true,
              });
              return (
                <li
                  key={item.id}
                  onClick={() => conversationContext.setCurrent(item)}
                  className="border-solid border-gray-200 rounded-sm cursor-pointer pt-2"
                >
                  <div className="flex items-center">
                    <div className={"flex-shrink-0 " + status}>
                      {item.image ? (
                        <img src={item.image} alt={title(item)} width={36} height={36} />
                      ) : (
                        <BsPersonCircle />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 ms-4 w-[200px]">
                      <p
                        className={`${active} text-sm text-gray-900 truncate dark:text-white`}
                      >
                        {title(item)}
                      </p>
                      <p
                        className={`${active} text-sm text-gray-900 truncate dark:text-white`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
