import { List } from "react-window";
import CalendarRow from "./CalendarRow";

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

interface CalendarTableProps {
  days: Day[];
}

export default function CalendarTable({ days }: CalendarTableProps) {
  // Split into weeks of 7
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="w-full grid grid-rows-6">
      <List
        rowComponent={CalendarRow}
        rowCount={weeks.length}
        rowHeight={150}
        rowProps={{ weeks }}
      />
    </div>
  );
}
