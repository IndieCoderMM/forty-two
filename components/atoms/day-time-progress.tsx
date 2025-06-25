"use client";

import { cn } from "@/utils/tw";
import { useEffect, useState } from "react";
import IconCalendar from "../icons/calendar";
import IconHourglass from "../icons/hourglass";

const DayTimeProgress = ({ containerStyle }: { containerStyle?: string }) => {
  const [progress, setProgress] = useState(100);
  const [weekday, setWeekday] = useState("DDD");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const secondsInDay = 86400;
      const secondsPassed =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      setProgress(Number(((secondsPassed / secondsInDay) * 100).toFixed(1)));
    };

    update();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setWeekday(days[new Date().getDay()]);

    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-4 text-dark/80",
        containerStyle,
      )}
    >
      <IconCalendar className="h-4 w-4 text-gray-400" />
      <span>{weekday}</span>
      <IconHourglass className="h-4 w-4 text-gray-400" />
      <span>{progress}%</span>
    </div>
  );
};

export default DayTimeProgress;
