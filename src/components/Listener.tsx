import { useEffect, useState } from "react";
import type { LangProps, MusicDataType } from "../types";
import Image from "./ui/Image";
import { Dialog } from "@base-ui/react";
import DialogContent from "./ui/DialogContent";

export default function Listener({ t }: LangProps<"listener">) {
  const [musicData, setMusicData] = useState<MusicDataType>({
    isListening: false
  });

  useEffect(() => {
    const fetchMusic = async () => {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/music`);
      const data = (await res.json()) as MusicDataType;
      setMusicData(data);
    };

    fetchMusic();

    // fetch every 30s
    const interval = setInterval(() => {
      fetchMusic();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {musicData.isListening && musicData.track?.artist && (
        <div className="text-sm">
          <Dialog.Root>
            <Dialog.Trigger className="hover:bg-gray/30 inline-flex gap-2 rounded-3xl px-2.5 py-1.5 transition-colors duration-300 hover:cursor-pointer">
              <div className="flex flex-row items-center gap-0.5">
                <span className="bg-lime-bright animate-bar-left h-3 w-1 rounded-sm"></span>
                <span className="bg-lime-bright animate-bar-center h-4 w-1 rounded-sm"></span>
                <span className="bg-lime-bright animate-bar-right h-3 w-1 rounded-sm"></span>
              </div>
              <span className="italic">
                {musicData.track.artist} - {musicData.track.name}
              </span>
            </Dialog.Trigger>
            <DialogContent>
              <div className="flex flex-col items-center">
                {musicData.track.image && (
                  <Image
                    className="mb-2.5"
                    src={musicData.track.image}
                    alt={`${musicData.track.name} cover`}
                  />
                )}
                <a
                  className="mb-1.5 font-mono text-lg font-semibold text-white transition-opacity duration-200 hover:cursor-pointer hover:opacity-70"
                  href={musicData.track.url}
                  target="_blank"
                >
                  {musicData.track.name}
                </a>
                <span className="mb-1">{musicData.track.album}</span>
                <span className="text-sm italic">
                  <span className="font-semibold">{t.artistBy}</span>{" "}
                  {musicData.track.artist}
                </span>
              </div>
            </DialogContent>
          </Dialog.Root>
        </div>
      )}
    </>
  );
}
