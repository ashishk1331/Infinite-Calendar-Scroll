"use client";

import CalendarTable from "@/components/calendar/CalendarTable";
import ModalWrapper from "@/components/modal/ModalWrapper";
import JournalWrapper from "@/context/JournalContext";
import { events } from "@/static/events";
import type { Journal } from "@/types/types";
import { useMemo } from "react";

export default function Home() {
  const eventsParsed = useMemo(() => {
    const damp: Record<string, Journal> = {};
    for (let event of events) {
      damp[event.date] = event;
    }
    return damp;
  }, []);

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
