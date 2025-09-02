"use client";

import ModalCard from "./ModalCard";
import { useJournals } from "@/context/JournalContext";
import { Journal } from "@/types/types";
import { useEffect, useState } from "react";

type ModalCarouselProps = {
  journalId: number;
};

export default function ModalCarousel({ journalId }: ModalCarouselProps) {
  const { events } = useJournals();
  const [journals, setJournals] = useState<Journal[]>([events[journalId]]);

  useEffect(() => {
    const start = Math.max(journalId - 1, 0);
    const end = Math.min(events.length - 1, journalId + 1);

    setJournals(events.slice(start, end + 1))
  }, [journalId]);

  return (
    <div className="flex w-full gap-4 items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-4 md:px-8">
      {journals.map((journal, index) => (
        <ModalCard key={journal.description + index} journal={journal} />
      ))}
    </div>
  );
}
