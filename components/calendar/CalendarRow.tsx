import CalendarCell from "./CalendarCell";
import type { Day, Journal } from "@/types/types";
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
  eventsParsed: Record<string, Journal>;
};

const CalendarRow = ({ index, startIndex, eventsParsed }: CalendarRowProps) => {
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
      events: [],
      journal: eventsParsed[key],
    });
  }

  return (
    <div className="grid grid-cols-7 gap-px">
      {days.map((day) => (
        <CalendarCell key={day.date} {...day} />
      ))}
    </div>
  );
};

export default memo(CalendarRow);
