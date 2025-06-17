import { cn } from "@/utils/tw";
import { InputHTMLAttributes } from "react";

type ProgressBarInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function ProgressBarInput({
  className = "",
  value,
  max,
  ...props
}: ProgressBarInputProps) {
  value = Number(value);
  max = Number(max);

  if (isNaN(value) || isNaN(max) || max <= 0) {
    value = 0;
    max = 100;
  }

  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        `relative flex h-2 w-full max-w-xs items-center rounded-lg bg-gray-200`,
        className,
      )}
    >
      <div
        className="absolute left-0 top-0 h-2 rounded-lg bg-black/80"
        style={{ width: `${percent}%` }}
      />
      <input
        {...props}
        type="range"
        step={1}
        value={value}
        className="relative z-10 h-2 w-full cursor-pointer appearance-none bg-transparent accent-black focus:outline-none"
      />
    </div>
  );
}
