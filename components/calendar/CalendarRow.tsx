import { useJournals } from "@/context/JournalContext";
import CalendarCell from "./CalendarCell";
import type { Day } from "@/types/types";
import {
  addDays,
  addWeeks,
  endOfWeek,
  format,
  getMonth,
  isSameMonth,
  isToday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";
import { Calendar } from "lucide-react";

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
  showMonthIndicator: boolean;
  activeMonth: number;
};

const CalendarRow = ({
  index,
  startIndex,
  isActive,
  showMonthIndicator,
  activeMonth,
}: CalendarRowProps) => {
  const { eventsParsed } = useJournals();
  const weekStart = weekStartDate(index, startIndex);
  const weekEnd = endOfWeek(weekStart);
  const isMonthStart = getMonth(weekStart) < getMonth(weekEnd);
  let days: Day[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const key = format(date, "dd/MM/yyyy");
    const day = format(date, "d");

    days.push({
      date: key,
      day,
      isCurrentMonth: getMonth(date) === activeMonth,
      isToday: isToday(date),
      isSelected: false,
      journal: eventsParsed[key],
    });
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showMonthIndicator && isMonthStart && (
          <motion.div
            key={`month-${format(weekEnd, "MMM-yyyy")}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, transition: { delay: 2 } }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 z-10 p-2 px-4 md:px-6 bg-indigo-600 rounded-r-full text-white flex items-center gap-2"
          >
            <Calendar size={16} className="stroke-white" />
            <h3 className="md:text-lg">{format(weekEnd, "MMM yyyy")}</h3>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={twMerge(
          "relative grid grid-cols-7 gap-px",
          isActive && "border-2 border-indigo-600",
        )}
      >
        {days.map((day) => (
          <CalendarCell key={day.date} {...day} />
        ))}
      </div>
    </div>
  );
};

export default memo(CalendarRow);
