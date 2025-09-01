import { twMerge } from "tailwind-merge";

export default function CalendarHeader() {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed w-full top-0 z-20 grid grid-cols-7 border-b border-neutral-200">
      {dayNames.map((day, idx) => (
        <div
          key={day}
          className={twMerge(
            "flex items-center py-4 justify-center text-xs font-semibold text-gray-600 bg-gray-50 border-t border-r border-neutral-200"
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
