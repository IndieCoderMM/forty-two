"use client";

import { Kbd } from "@/components/atoms/kbd";
import IconPlus from "@/components/icons/plus";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Shortcut = {
  name: string;
  link: string;
};

const STORAGE_KEY = "shortcuts";

export default function LinkShortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setShortcuts(JSON.parse(saved));
  }, []);

  const saveShortcuts = (items: Shortcut[]) => {
    setShortcuts(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const handleAdd = () => {
    const name = nameRef.current?.value.trim() ?? "";
    const link = linkRef.current?.value.trim() ?? "";
    if (!name || !link) {
      toast.error("Please provide both name and link.");
      return;
    }

    const newShortcut = { name, link };
    const updated = [...shortcuts, newShortcut];
    saveShortcuts(updated);
    setIsOpen(false);
  };

  const handleLink = (link: string) => {
    const target = link.startsWith("http") ? link : `https://${link}`;
    window.open(target, "_blank");
  };

  return (
    <div className="relative max-w-full">
      <div className="flex flex-wrap items-center gap-3 px-4">
        {shortcuts.map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
            title={s.name}
          >
            <Kbd
              keyname={`${i + 1}`}
              className="h-4 w-4"
              callback={() => handleLink(s.link)}
            >
              {i + 1}
            </Kbd>
            <span className="text-md capitalize text-dark underline hover:text-blue-400">
              {s.name.slice(0, 2)}
            </span>
          </a>
        ))}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center justify-center rounded-lg bg-gray-50 p-1 hover:bg-white"
        >
          <IconPlus className="h-4 w-4 text-dark" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 rounded-md border border-gray-100 bg-white p-4 shadow-lg">
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="mb-2 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            ref={linkRef}
            type="url"
            placeholder="https://example.com"
            className="mb-2 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-1">
              <Kbd
                keyname="Escape"
                callback={() => setIsOpen(false)}
                className="mt-2 text-xs text-gray-500"
              >
                Esc
              </Kbd>
              <span className="mt-2 text-xs text-gray-500">Close</span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <Kbd
                keyname="Enter"
                callback={handleAdd}
                className="mt-2 text-xs text-gray-500"
              >
                Enter
              </Kbd>
              <span className="mt-2 text-xs text-gray-500">Add</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
