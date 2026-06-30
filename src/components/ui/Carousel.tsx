import { useEffect, useState } from "react";
import Image from "./Image";
import { twMerge } from "tailwind-merge";
import ChevronIcon from "../../icons/chevron-down.svg?react";
import VideoPlayer from "./VideoPlayer";
import type { ImageMetadata } from "astro";

type Image = { metadata: ImageMetadata; alt: string };
type Video = { metadata: { src: string }; alt: string };
export type CarouselMedia = Image | Video;

type CarouselProps = {
  medias: CarouselMedia[];
};

export default function Carousel({ medias }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? medias.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === medias.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [medias.length]);

  const currentMedia = medias[currentIndex];
  const isVideo = currentMedia.metadata.src.endsWith(".m3u8");

  return (
    <div className="border-gray flex flex-col border border-dashed">
      <div className="bg-gray/20 relative aspect-video w-full overflow-hidden">
        {isVideo ? (
          <VideoPlayer
            key={currentMedia.metadata.src}
            src={currentMedia.metadata.src}
            playOnMount
          />
        ) : (
          <Image
            key={currentMedia.metadata.src}
            src={currentMedia.metadata.src}
            alt={currentMedia.alt}
            className="absolute inset-0"
          />
        )}
      </div>

      <div className="bg-gray/20 border-gray relative flex items-center justify-between border-t border-dashed px-2 py-1.5">
        <button
          onClick={handlePrev}
          className="bg-lime-bright inline-flex size-5 items-center justify-center hover:cursor-pointer"
        >
          <ChevronIcon className="text-gray size-4 rotate-90" />
        </button>

        <div className="inline-flex items-center justify-center gap-2">
          {medias.length > 1 &&
            medias.map((_, index) => (
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

        <button
          onClick={handleNext}
          className="bg-lime-bright inline-flex size-5 items-center justify-center hover:cursor-pointer"
        >
          <ChevronIcon className="text-gray size-4 -rotate-90" />
        </button>
      </div>
    </div>
  );
}
