export interface Day {
  date: string;
  day: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
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
  index: number;
}
