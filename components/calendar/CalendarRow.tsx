import { useJournals } from "@/context/JournalContext";
import CalendarCell from "./CalendarCell";
import type { Day } from "@/types/types";
import {
  addDays,
  addWeeks,
  format,
  isSameMonth,
  isToday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

function weekStartDate(index: number, startIndex: number): Date {
  const thisWeekStart = startOfWeek(new Date());
  const offset = index - startIndex;
  return offset >= 0
    ? addWeeks(thisWeekStart, offset)
    : subWeeks(thisWeekStart, -offset);
}

type CalendarRowProps = {
  index: number;
  startIndex: number;
  isActive: boolean;
};

const CalendarRow = ({ index, startIndex, isActive }: CalendarRowProps) => {
  const { eventsParsed } = useJournals();
  const weekStart = weekStartDate(index, startIndex);
  let days: Day[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const key = format(date, "dd/MM/yyyy");
    const day = format(date, "d");

    days.push({
      date: key,
      day,
      isCurrentMonth: isSameMonth(new Date(), date),
      isToday: isToday(date),
      isSelected: false,
      journal: eventsParsed[key],
    });
  }

  return (
    <div
      className={twMerge(
        "grid grid-cols-7 gap-px",
        isActive && "border-2 border-indigo-600",
      )}
    >
      {days.map((day) => (
        <CalendarCell key={day.date} {...day} />
      ))}
    </div>
  );
};

export default memo(CalendarRow);
