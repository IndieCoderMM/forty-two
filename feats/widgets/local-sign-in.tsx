"use client";

import IconArchive from "@/components/icons/archive";
import { useAuth } from "@/utils/auth-context";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LocalSignIn({ buttonText }: { buttonText?: string }) {
  const [name, setName] = useState("");
  const { localSignIn } = useAuth();

  const handleSignIn = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your username");
      return;
    }

    localSignIn(trimmed);
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="mb-3 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />
      <button
        onClick={handleSignIn}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-dark px-4 py-2 text-sm text-white transition hover:bg-gray-800"
      >
        <IconArchive className="h-4 w-4" />
        <span>{buttonText || "Sign In Locally"}</span>
      </button>
    </div>
  );
}
