"use client";

import CalendarTable from "@/components/calendar/CalendarTable";
import ModalWrapper from "@/components/modal/ModalWrapper";
import JournalWrapper from "@/context/JournalContext";

export default function Home() {
  return (
    <JournalWrapper>
      <ModalWrapper>
        <div className="w-screen h-screen">
          <CalendarTable />
        </div>
      </ModalWrapper>
    </JournalWrapper>
  );
}
