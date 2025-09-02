import type { Journal } from "@/types/types";
import Image from "next/image";
import Pill from "../ui/Pill";
import { Star } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

type ModalCardProps = {
  journal: Journal;
};

export default function ModalCard({ journal }: ModalCardProps) {
  const { description, imgUrl, date } = journal;

  return (
    <div className="flex-shrink-0 snap-center flex flex-col items-center gap-4 w-full max-w-xs bg-white m-auto rounded-xl shadow-xl overflow-hidden">
      <div className="w-full max-h-72 overflow-hidden">
        <Image
          src={imgUrl}
          width={512}
          height={512}
          alt={description}
          className="w-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-2 p-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            {journal.categories.map((cat) => (
              <Pill key={cat}>{cat.charAt(0).toUpperCase()}</Pill>
            ))}
          </div>

          <div className="w-fit flex items-center gap-px">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <Star
                  key={index + ""}
                  size={12}
                  className={twMerge(
                    index + 1 <= Math.floor(journal.rating)
                      ? "stroke-indigo-600 fill-indigo-600"
                      : "stroke-neutral-600 fill-neutral-600",
                  )}
                />
              ))}
          </div>
        </div>
        <h1 className="text-lg w-full font-medium mr-auto">
          {format(parse(date, "dd/MM/yyyy", new Date()), "d MMMM")}
        </h1>
        <p className="text-sm w-full">{description}</p>
      </div>
      <button className="w-full p-4 border-t border-neutral-200 bg-neutral-50 cursor-pointer">
        View Full Post
      </button>
    </div>
  );
}
