import { useEffect } from "react";

function isTyping(element: Element | null): boolean {
  if (!element) return false;
  const tag = element.tagName;
  const editable = (element as HTMLElement).isContentEditable;

  return tag === "INPUT" || tag === "TEXTAREA" || editable;
}

export const useKeyPress = (key: string, callback: () => void) => {
  const handler = (event: KeyboardEvent) => {
    if (key !== "Escape" && isTyping(document.activeElement)) {
      // Ignore key presses if the user is typing in an input or textarea
      // Except for Escape key
      return;
    }

    if (event.key === key) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, callback]);
};
