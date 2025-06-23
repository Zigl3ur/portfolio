import { useEffect, useState } from "react";
import type { MusicJsonType } from "../types";

export default function Listener({
  initialData,
}: {
  initialData: MusicJsonType;
}) {
  const [musicData, setMusicData] = useState<MusicJsonType>(initialData);

  useEffect(() => {
    // set data fetched from the server
    setMusicData(initialData);

    const fetchMusic = async () => {
      const res = await fetch(`/api/music`);
      const data = await res.json();
      setMusicData(data as MusicJsonType);
    };

    // fetch every 30s
    const interval = setInterval(() => {
      fetchMusic();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {musicData.isListening && musicData.track?.artist && (
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-0.5">
            <span className="w-1 h-3 bg-lime-bright rounded-sm animate-bar-outter"></span>
            <span className="w-1 h-4 bg-lime-bright rounded-sm animate-bar-inner"></span>
            <span className="w-1 h-3 bg-lime-bright rounded-sm animate-bar-outter"></span>
          </div>
          <p className="text-sm">
            <span className="font-semibold">{musicData.track.artist}</span> -{" "}
            <a
              href={musicData.track.url}
              target="_blank"
              className="italic hover:underline"
            >
              {musicData.track.name}
            </a>
          </p>
        </div>
      )}
    </>
  );
}
