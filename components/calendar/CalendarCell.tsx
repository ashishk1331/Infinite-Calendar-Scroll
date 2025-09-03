import { twMerge } from "tailwind-merge";
import type { Day } from "@/types/types";
import Image from "next/image";
import { Star } from "lucide-react";
import { useModal } from "../modal/ModalWrapper";
import ModalCard from "../modal/ModalCard";
import Pill from "../ui/Pill";
import ModalCarousel from "../modal/ModalCarousel";

export default function CalendarCell({
  day,
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  journal,
}: Day) {
  const { openModal } = useModal();

  return (
    <div
      className={twMerge(
        "relative p-px py-2 h-[200px] first:border-l border-r border-t border-neutral-200 text-center",
        isCurrentMonth
          ? isSelected
            ? "bg-indigo-100"
            : "bg-white"
          : "bg-gray-50 text-gray-500",
      )}
    >
      <time
        dateTime={date}
        className={twMerge(
          isToday &&
          "flex h-6 w-6 items-center justify-center mx-auto rounded-full bg-indigo-600 font-semibold text-white",
        )}
      >
        {day}
      </time>
      {journal && (
        <div
          className="mt-2 flex flex-col gap-1 text-xs"
          onClick={() => openModal(<ModalCarousel journalId={journal.index} />)}
        >
          <div className="w-fit mx-auto flex items-center gap-px">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <Star
                  key={index + ""}
                  size={12}
                  className={twMerge(
                    "size-2 md:size-3",
                    index + 1 <= Math.floor(journal.rating)
                      ? "stroke-indigo-600 fill-indigo-600"
                      : "stroke-neutral-600 fill-neutral-600",
                  )}
                />
              ))}
          </div>
          <Image
            loading="lazy"
            src={journal.imgUrl}
            alt="journal"
            className="h-24 w-full rounded object-cover"
            width={128}
            height={128}
          />
          <div className="flex items-center justify-center gap-px text-gray-500">
            {journal.categories.length > 2 ? (
              <>
                <Pill>{journal.categories[0].charAt(0).toUpperCase()}</Pill>
                <Pill>{journal.categories.length - 1}+</Pill>
              </>
            ) : (
              journal.categories.map((cat) => (
                <Pill key={cat}>{cat.charAt(0).toUpperCase()}</Pill>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
