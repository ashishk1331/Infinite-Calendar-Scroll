export interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  href: string;
}

export interface Day {
  date: string;
  day: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Event[];
  journal?: Journal;
}

export interface CalendarTableProps {
  days: Day[];
}

export interface Journal {
  imgUrl: string;
  rating: number;
  categories: string[];
  date: string;
  description: string;
}
