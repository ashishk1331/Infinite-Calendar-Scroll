import { popUp } from "@/constants/animation";
import { motion, AnimatePresence } from "motion/react";

type CalendarHeaderProps = {
  activeMonth: string;
  activeYear: string;
  scrollToToday: () => void;
};

export default function CalendarHeader({
  activeMonth,
  activeYear,
  scrollToToday,
}: CalendarHeaderProps) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed w-full top-0 z-20 border-b border-neutral-200 bg-gray-50">
      <div className="p-2 flex items-center justify-between text-xl">
        <h1>Calendar</h1>
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="font-semibold inline-flex gap-1 overflow-hidden leading-tight h-8 items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeMonth}
                {...popUp}
                transition={{ duration: 0.25 }}
                className="text-indigo-600"
              >
                {activeMonth}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeYear}
                {...popUp}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                {activeYear}
              </motion.span>
            </AnimatePresence>
          </h1>
          <button
            onClick={scrollToToday}
            className="rounded bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Jump to Today
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-7">
        {dayNames.map((day) => (
          <div
            key={day}
            className="flex items-center py-4 justify-center text-xs font-semibold text-gray-600 border-t border-r border-neutral-200 first:bg-gray-100"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
