import { useKeyPress } from "@/hooks/use-key-press";
import { cn } from "@/utils/tw";
import React from "react";

type KbdProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
  keyname: string;
  callback?: () => void;
};

export function Kbd({
  keyname,
  callback,
  children,
  className,
  ...props
}: KbdProps) {
  useKeyPress(keyname, () => {
    callback?.();
  });

  return (
    <kbd
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs font-medium text-gray-600 shadow-inner",
        "whitespace-nowrap",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
