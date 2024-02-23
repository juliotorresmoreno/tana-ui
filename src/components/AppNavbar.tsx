"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";

export function AppNavbar() {
  return (
    <div className="flex flex-1 h-11">
      <Navbar className="fixed sm:static w-full z-50 bg-white" fluid rounded>
        <Navbar.Brand as={Link} href="/" className="cursor-pointer">
          <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
