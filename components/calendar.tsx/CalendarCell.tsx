import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  href: string;
}

interface CalendarCellProps {
  date: string; // ISO string
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Event[];
}

export default function CalendarCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
}: CalendarCellProps) {
  const parsedDate = parseISO(date);
  const day = format(parsedDate, "d"); // no leading zero

  return (
    <div
      className={twMerge(
        "relative px-3 py-2 h-[150px] border-r border-t border-neutral-200",
        isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
      )}
    >
      <time
        dateTime={date}
        className={twMerge(
          isToday &&
            "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white",
        )}
      >
        {day}
      </time>
      {events.length > 0 && (
        <ol className="mt-2">
          {events.slice(0, 2).map((event) => (
            <li key={event.id}>
              <a href={event.href} className="group flex">
                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                  {event.name}
                </p>
                <time
                  dateTime={event.datetime}
                  className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                >
                  {event.time}
                </time>
              </a>
            </li>
          ))}
          {events.length > 2 && (
            <li className="text-gray-500">+ {events.length - 2} more</li>
          )}
        </ol>
      )}
    </div>
  );
}
