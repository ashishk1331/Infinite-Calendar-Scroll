"use client";

import ModalCard from "./ModalCard";
import { useJournals } from "@/context/JournalContext";
import { useEffect, useRef } from "react";

type ModalCarouselProps = {
  journalId: number;
};

export default function ModalCarousel({ journalId }: ModalCarouselProps) {
  const { events } = useJournals();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current?.children[journalId] as HTMLElement;
    el?.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest",
    });
  }, [journalId]);

  return (
    <div
      ref={containerRef}
      className="flex w-full gap-4 justify-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-4 md:px-8"
    >
      {events.map((_, idx) => (
        <div key={idx} className="flex-shrink-0 w-[320px] snap-center">
          <ModalCard journal={events[idx]} />
        </div>
      ))}
    </div>
  );
}
