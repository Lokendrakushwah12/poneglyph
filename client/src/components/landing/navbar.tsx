"use client";

import { ScanText } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../layouts/theme-toggle";

const Navbar = () => {
  return (
    <>
      <header
        className={"sticky inset-x-0 top-0 z-[100] w-full transform px-4 py-2"}
      >
        <div className="mx-auto flex h-fit w-full items-center justify-center p-1 pr-1.5">
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold text-foreground"
            >
              <ScanText strokeWidth={1.5} className="h-6 w-6 text-foreground" />
              Poneglyph
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
