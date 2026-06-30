import { useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton";
import { cn } from "../../lib/cn";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Image({ src, alt, className }: ImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgLoaded(false);

    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setImgLoaded(true)}
        className={cn(
          "h-full w-full object-cover",
          "transition-opacity duration-200",
          imgLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      {!imgLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
