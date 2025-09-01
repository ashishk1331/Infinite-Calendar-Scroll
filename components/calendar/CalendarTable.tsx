import { Virtuoso } from "react-virtuoso";
import CalendarRow from "./CalendarRow";
import CalendarHeader from "./CalendarHeader";

const TOTAL_WEEKS = 100_000;
const START_INDEX = TOTAL_WEEKS / 2;

export default function CalendarTable() {
  return (
    <div className="relative h-full w-full">
      <CalendarHeader />
      <Virtuoso
        style={{ height: "100%", scrollbarWidth: 'none' }}
        totalCount={TOTAL_WEEKS}
        initialTopMostItemIndex={START_INDEX - 1}
        itemContent={(index) => (
          <CalendarRow index={index} startIndex={START_INDEX} />
        )}
      />
    </div>
  );
}
