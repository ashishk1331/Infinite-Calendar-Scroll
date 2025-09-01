export interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  href: string;
}

export interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Event[];
}

export interface CalendarTableProps {
  days: Day[];
}
