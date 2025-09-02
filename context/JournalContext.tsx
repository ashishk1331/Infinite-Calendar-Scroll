import type { Journal } from "@/types/types";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { events } from "@/static/events";
import { compareDesc, parse } from "date-fns";

export type IndexedJournals = Record<string, Journal & { index: number }>;

interface JournalData {
  events: Journal[];
  eventsParsed: IndexedJournals;
}

const JournalContext = createContext<JournalData | null>(null);

export function useJournals() {
  const ctx = useContext(JournalContext);

  if (!ctx) throw Error("JournalContext is missing a provider.");

  return ctx;
}

export default function JournalWrapper({ children }: PropsWithChildren) {
  const eventsSorted = useMemo(
    () =>
      events.sort((a, b) =>
        compareDesc(
          parse(a.date, "dd/MM/yyyy", new Date()),
          parse(b.date, "dd/MM/yyyy", new Date()),
        ),
      ),
    [],
  );
  const eventsParsed = useMemo(() => {
    const damp: IndexedJournals = {};
    eventsSorted.forEach(
      (event, index) => (damp[event.date] = { ...event, index }),
    );
    return damp;
  }, []);
  return (
    <JournalContext.Provider value={{ events: eventsSorted, eventsParsed }}>
      {children}
    </JournalContext.Provider>
  );
}
