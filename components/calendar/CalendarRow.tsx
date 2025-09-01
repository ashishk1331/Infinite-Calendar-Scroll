import CalendarCell from "./CalendarCell";
import type { Day } from "@/types/types";
import {
  addDays,
  addWeeks,
  isSameMonth,
  isToday,
  startOfWeek,
  subWeeks,
} from "date-fns";

function weekStartDate(index: number, startIndex: number): Date {
  const thisWeekStart = startOfWeek(new Date());
  const offset = index - startIndex;
  return offset >= 0
    ? addWeeks(thisWeekStart, offset)
    : subWeeks(thisWeekStart, -offset);
}

function buildDay(date: Date): Day {
  return {
    date: date.toJSON(),
    isCurrentMonth: isSameMonth(new Date(), date),
    isToday: isToday(date),
    isSelected: false,
    events: [],
  };
}

type CalendarRowProps = {
  index: number;
  startIndex: number;
};

export default function CalendarRow({ index, startIndex }: CalendarRowProps) {
  const weekStart = weekStartDate(index, startIndex);
  let days: Day[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(buildDay(addDays(weekStart, i)));
  }

  return (
    <div className="grid grid-cols-7 gap-px">
      {days.map((day) => (
        <CalendarCell key={day.date} {...day} />
      ))}
    </div>
  );
}
