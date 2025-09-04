import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import CalendarRow from "./CalendarRow";
import CalendarHeader from "./CalendarHeader";
import { useRef, useState, useCallback, useEffect } from "react";
import { addWeeks, format, getMonth, startOfWeek, subWeeks } from "date-fns";

const TOTAL_WEEKS = 100_000;
const START_INDEX = TOTAL_WEEKS / 2;

export default function CalendarTable() {
  const listRef = useRef<VirtuosoHandle>(null);
  const scrollerRef = useRef<HTMLElement | Window | null>(null);

  const [activeRangeMid, setActiveRangeMid] = useState(START_INDEX);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [isScrolling, setIsScrolling] = useState(false);

  const thisWeekStart = startOfWeek(new Date());
  const offset = activeRangeMid - START_INDEX + 1;
  const thisDate =
    offset >= 0
      ? addWeeks(thisWeekStart, offset)
      : subWeeks(thisWeekStart, -offset);

  function scrollToToday() {
    listRef.current?.scrollToIndex({
      index: START_INDEX - 1,
      behavior: "smooth",
    });
    setCurrentItemIndex(-1);
  }

  const keyDownCallback = useCallback(
    (e: KeyboardEvent) => {
      const actualCurrentIndex =
        currentItemIndex === -1 ? START_INDEX : currentItemIndex;
      let nextIndex: number | null = null;

      if (e.code === "ArrowUp") {
        nextIndex = Math.max(0, actualCurrentIndex - 1);
      } else if (e.code === "ArrowDown") {
        nextIndex = Math.min(TOTAL_WEEKS - 1, actualCurrentIndex + 1);
      }

      if (nextIndex !== null) {
        listRef.current?.scrollToIndex({
          index: nextIndex - 1,
          behavior: "auto",
        });
        setCurrentItemIndex(nextIndex);
        e.preventDefault();
      }
    },
    [currentItemIndex],
  );

  const handleScrollerRef = useCallback(
    (node: HTMLElement | Window | null) => {
      if (scrollerRef.current) {
        (scrollerRef.current as any).removeEventListener(
          "keydown",
          keyDownCallback as any,
        );
      }

      scrollerRef.current = node;

      if (node) {
        (node as any).addEventListener("keydown", keyDownCallback as any);
        if (node instanceof HTMLElement) {
          node.tabIndex = node.tabIndex ?? 0;
        }
      }
    },
    [keyDownCallback],
  );

  useEffect(() => {
    return () => {
      if (scrollerRef.current) {
        (scrollerRef.current as any).removeEventListener(
          "keydown",
          keyDownCallback as any,
        );
      }
    };
  }, [keyDownCallback]);

  return (
    <div className="relative h-full w-full">
      <CalendarHeader
        activeMonth={format(thisDate, "MMM")}
        activeYear={format(thisDate, "yyyy")}
        scrollToToday={scrollToToday}
      />
      <Virtuoso
        ref={listRef}
        scrollerRef={handleScrollerRef}
        style={{ height: "100%", scrollbarWidth: "none" }}
        totalCount={TOTAL_WEEKS}
        initialTopMostItemIndex={START_INDEX - 1}
        overscan={2}
        increaseViewportBy={200}
        context={{ currentItemIndex, isScrolling }}
        isScrolling={setIsScrolling}
        itemContent={(index, _, { currentItemIndex, isScrolling }) => (
          <CalendarRow
            index={index}
            startIndex={START_INDEX}
            isActive={index === currentItemIndex}
            showMonthIndicator={isScrolling}
            activeMonth={getMonth(thisDate)}
          />
        )}
        rangeChanged={({ endIndex, startIndex }) =>
          setActiveRangeMid(Math.round((endIndex + startIndex) / 2))
        }
      />
    </div>
  );
}
