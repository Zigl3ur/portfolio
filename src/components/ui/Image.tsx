import { useState } from "react";
import Skeleton from "./Skeleton";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Image({ src, alt, className }: ImageProps) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  return (
    <div className={twMerge("relative", className)}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
        onLoad={() => setImgLoaded(true)}
      />
      {!imgLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
