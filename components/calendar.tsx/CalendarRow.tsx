import type { RowComponentProps } from "react-window";
import CalendarCell from "./CalendarCell";
import { twMerge } from "tailwind-merge";

interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  href: string;
}

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Event[];
}

interface CalendarRowProps {
  weeks: Day[][];
}

export default function CalendarRow({ index, weeks, style }: RowComponentProps<CalendarRowProps>) {
  return (
    <div className={twMerge("grid grid-cols-7 gap-px", style)}>
      {weeks[index].map((day) => (
        <CalendarCell key={day.date} {...day} />
      ))}
    </div>
  );
}
