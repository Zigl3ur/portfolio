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
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setImgLoaded(true)}
      />
      {!imgLoaded && (
        <Skeleton className={`${className} h-[174px] w-[174px]`} />
      )}
    </>
  );
}
