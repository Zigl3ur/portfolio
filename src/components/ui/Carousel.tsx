import { useEffect, useState } from "react";
import Image from "./Image";
import { twMerge } from "tailwind-merge";
import ChevronIcon from "../../icons/chevron-down.svg?react";
import type { ProjectType } from "../../types";

type CarouselProps = {
  images: NonNullable<ProjectType["images"]>;
};

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={images[currentIndex].metadata.src}
        alt={images[currentIndex].alt}
        className="aspect-video"
      />
      <button
        onClick={handlePrev}
        className="bg-lime-bright absolute top-1/2 left-2 flex size-5 -translate-y-1/2 items-center justify-center hover:cursor-pointer"
      >
        <ChevronIcon className="text-gray size-3 rotate-90" />
      </button>
      <button
        onClick={handleNext}
        className="bg-lime-bright absolute top-1/2 right-2 flex size-5 -translate-y-1/2 items-center justify-center hover:cursor-pointer"
      >
        <ChevronIcon className="text-gray size-3 -rotate-90" />
      </button>

      <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2">
        {images.length > 1 &&
          images.map((_, index) => (
            <div
              key={index}
              className={twMerge(
                "hover:bg-lime-pale/45 size-2 transition-colors duration-200 hover:cursor-pointer",
                index !== currentIndex ? "bg-gray" : "bg-lime-bright"
              )}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
      </div>
    </div>
  );
}
