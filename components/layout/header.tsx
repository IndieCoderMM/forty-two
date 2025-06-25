"use client";

import LinkShortcuts from "@/feats/widgets/link-shortcut";
import LocalSignIn from "@/feats/widgets/local-sign-in";
import { useAuth } from "@/utils/auth-context";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import DayTimeProgress from "../atoms/day-time-progress";
import { Kbd } from "../atoms/kbd";
import IconCloud from "../icons/cloud";
import IconFingerprint from "../icons/fingerprint";

const Header = () => {
  const { userId, name, mode, localSignOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    localSignOut();
    setIsOpen(false);
  };

  return (
    <div className="w-full border-b">
      <header className="relative mx-auto flex h-12 w-full max-w-[1100px] items-center justify-between border-x bg-light">
        <div className="right-full px-4 xl:absolute">
          <h1>
            <span className="text-xl font-bold">42</span>
            <span className="text-gray-500">OS</span>
          </h1>
        </div>
        <DayTimeProgress containerStyle="hidden md:flex" />
        <LinkShortcuts />
        <div className="left-full px-4 xl:absolute">
          <SignedOut>
            {mode === "local" && userId ? (
              <button
                onClick={() => setIsOpen(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200"
              >
                <span>{name?.[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IconFingerprint />
              </button>
            )}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 rounded-md border border-gray-100 bg-white p-4 shadow-lg">
          {mode === "local" && userId ? (
            <>
              <p className="mb-2 text-center text-xs text-gray-500">
                You are in local mode. Your data will not sync across devices.
              </p>
              <button
                onClick={handleSignOut}
                className="w-full cursor-pointer rounded-sm bg-gray-200 px-3 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
              >
                Connect Account (Sync)
              </button>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                <span>Press</span>
                <Kbd
                  keyname="Escape"
                  callback={() => setIsOpen(false)}
                  className="text-xs text-gray-500"
                >
                  Esc
                </Kbd>
                <span>to close</span>
              </div>
            </>
          ) : mode === "clerk" ? (
            <div className="flex flex-col items-center gap-2">
              <SignInButton>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-1 rounded-md border bg-dark px-4 py-2 text-sm text-white hover:brightness-125"
                >
                  <IconCloud /> Cloud Sign In
                </button>
              </SignInButton>
              <div className="relative w-full text-center text-sm text-gray-400">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
                <span className="relative bg-white px-2">or</span>
              </div>
              <LocalSignIn />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Header;
