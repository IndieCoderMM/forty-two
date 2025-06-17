import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string
 * @param args - Class names to combine.
 * @returns A single string of combined class names.
 */
export function cn(...args: (string | undefined)[]) {
  return twMerge(clsx(...args));
}
