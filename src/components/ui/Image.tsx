import { useState } from "react";
import Skeleton from "./Skeleton";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Image({ src, alt, className }: ImageProps) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`${className} ${imgLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
        onLoad={() => setImgLoaded(true)}
      />
      {!imgLoaded && <Skeleton className={`${className} absolute inset-0`} />}
    </div>
  );
}
