"use client";

import { SessionContext } from "@/contexts/session";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function AppNavbar() {
  const router = useRouter();
  const { setSession } = useContext(SessionContext);

  const handlerSignOut = () => {
    setSession(null);
    router.push("/");
  };

  return (
    <div className="flex flex-1 h-11">
      <Navbar className="fixed sm:static w-full z-50 bg-white" fluid rounded>
        <Navbar.Brand as={Link} href="/" className="cursor-pointer">
          <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            BuildHub
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="bg-white">
          <Navbar.Link as={Link} href="/bots">
            Bots
          </Navbar.Link>
          <Navbar.Link as={Link} href="/credentials">
            Api Key
          </Navbar.Link>
          <Navbar.Link as={Link} href="/profile">
            Profile
          </Navbar.Link>
          <Navbar.Link as={"button"} onClick={handlerSignOut}>
            Sign Out
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
