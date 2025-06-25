"use client";

import { Kbd } from "@/components/atoms/kbd";
import { useKeyPress } from "@/hooks/use-key-press";
import { useState } from "react";

type CommandItem = {
  label: string;
  keys: string;
  onTrigger?: () => void;
};

const COMMANDS: CommandItem[] = [
  { label: "Add new skill", keys: "S" },
  { label: "Add new project", keys: "P" },
  { label: "Add new inbox", keys: "I" },
];

const simulateKey = (key: string, options: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  window.dispatchEvent(event);
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useKeyPress("h", () => {
    setOpen((prev) => !prev);
    if (!open) {
      setQuery("");
    }
  });

  useKeyPress("Escape", () => {
    if (open) {
      setOpen(false);
      setQuery("");
    }
  });

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24">
          <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-xl">
            <input
              autoFocus
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Search commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="mt-2 flex max-h-64 flex-col overflow-y-auto">
              {filtered.map((cmd, i) => (
                <li key={i} className="flex p-1">
                  <button
                    className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                    onClick={() => {
                      setOpen(false);
                      simulateKey(cmd.keys);
                    }}
                  >
                    <span>{cmd.label}</span>
                    <Kbd keyname={cmd.keys} className="lowercase">
                      {cmd.keys}
                    </Kbd>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-400">
                  No commands found.
                </li>
              )}
            </ul>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>
                Press <Kbd keyname="Escape">Esc</Kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
