import { ReactNode, Ref, StyleHTMLAttributes, useEffect, useRef } from "react";

type ListProps = {
  ref: Ref<HTMLDivElement>;
  style: StyleHTMLAttributes<HTMLDivElement>;
  total_count: number;
  initialTopMostItemIndex: number;
  itemContent: (index: number) => ReactNode;
  rangeChanged: (startIndex: number, endIndex: number) => void;
};

export default function List({ ref, style, total_count }: ListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    function handleScroll(event: Event) {
      console.log(event.scrollY);
    }

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={style}
      className="relative w-screen h-screen bg-emerald-200 overflow-y-auto"
    >
      <div
        className="relative"
        style={{ height: `${total_count * 150}` }}
      ></div>
    </div>
  );
}
