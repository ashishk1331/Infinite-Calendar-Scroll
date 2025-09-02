import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import CalendarRow from "./CalendarRow";
import CalendarHeader from "./CalendarHeader";
import { useRef, useState } from "react";

const TOTAL_WEEKS = 100_000;
const START_INDEX = TOTAL_WEEKS / 2;

export default function CalendarTable() {
  const listRef = useRef<VirtuosoHandle>(null);
  const [activeRangeMid, setActiveRangeMid] = useState(START_INDEX);

  function scrollToToday() {
    listRef?.current?.scrollToIndex({
      index: START_INDEX - 1,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative h-full w-full">
      <CalendarHeader
        offset={activeRangeMid - START_INDEX}
        scrollToToday={scrollToToday}
      />
      <Virtuoso
        ref={listRef}
        style={{ height: "100%", scrollbarWidth: "none" }}
        totalCount={TOTAL_WEEKS}
        initialTopMostItemIndex={START_INDEX - 1}
        overscan={2}
        increaseViewportBy={200}
        itemContent={(index) => (
          <CalendarRow index={index} startIndex={START_INDEX} />
        )}
        rangeChanged={({ endIndex, startIndex }) =>
          setActiveRangeMid(Math.round((endIndex + startIndex) / 2))
        }
      />
    </div>
  );
}
