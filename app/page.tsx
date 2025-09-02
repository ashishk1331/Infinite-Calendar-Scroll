"use client";

import CalendarTable from "@/components/calendar/CalendarTable";
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
    <div className="w-screen h-screen">
      <CalendarTable eventsParsed={eventsParsed} />
    </div>
  );
}
