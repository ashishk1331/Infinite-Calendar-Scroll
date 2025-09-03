"use client";
import ModalCard from "./ModalCard";
import { useJournals } from "@/context/JournalContext";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

type ModalCarouselProps = {
  journalId: number;
};

export default function ModalCarousel({ journalId }: ModalCarouselProps) {
  const { events } = useJournals();

  const plugins = [
    ClassNames({
      snapped: "is-snapped",
    }),
  ];

  const [emblaRef] = useEmblaCarousel(
    {
      align: "center",
      containScroll: false,
      dragFree: false,
      loop: false,
      skipSnaps: false,
      startIndex: journalId,
    },
    plugins,
  );

  return (
    <div className="w-full max-w-full mx-auto" ref={emblaRef}>
      <div className="flex items-stretch">
        {events.map((journal, index) => (
          <div
            key={journal.description + index}
            className="flex-[0_0_75%] min-w-0 max-w-xs [.is-snapped]:scale-110 transition-transform not-[.is-snapped]:opacity-75"
          >
            <ModalCard journal={journal} />
          </div>
        ))}
      </div>
    </div>
  );
}
