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
        <Dialog.Root>
          <Dialog.Trigger
            autoFocus={false}
            className="focus-visible:ring-gray inline-flex gap-2 px-2.5 py-1.5 transition-colors duration-300 hover:cursor-pointer focus-visible:ring focus-visible:outline-none"
          >
            <div className="flex flex-row items-center gap-0.5">
              <span className="bg-lime-bright animate-bar-left h-3 w-1"></span>
              <span className="bg-lime-bright animate-bar-center h-4 w-1"></span>
              <span className="bg-lime-bright animate-bar-right h-3 w-1"></span>
            </div>
            <span className="italic">
              {musicData.track.artist} - {musicData.track.name}
            </span>
          </Dialog.Trigger>
          <DialogContent className="max-w-90">
            <div className="flex flex-col items-center">
              {musicData.track.image && (
                <Image
                  className="xs:size-65 mb-5 size-55 transition-discrete duration-300 sm:size-75"
                  src={musicData.track.image}
                  alt={`${musicData.track.name} cover`}
                />
              )}
              <div className="divide-gray w-full divide-y divide-dashed font-mono">
                <div className="flex items-center gap-3 py-2">
                  <span className="text-lime-bright w-14 shrink-0 text-[0.6rem] tracking-widest uppercase">
                    Track
                  </span>
                  <a
                    className="font-semibold wrap-break-word text-white transition-opacity duration-200 hover:cursor-pointer hover:opacity-70"
                    href={musicData.track.url}
                    target="_blank"
                  >
                    {musicData.track.name}
                  </a>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="text-lime-bright w-14 shrink-0 text-[0.6rem] tracking-widest uppercase">
                    Album
                  </span>
                  <span className="text-sm wrap-break-word">
                    {musicData.track.album}
                  </span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="text-lime-bright w-14 shrink-0 text-[0.6rem] tracking-widest uppercase">
                    {t.artistBy}
                  </span>
                  <span className="text-sm wrap-break-word">
                    {musicData.track.artist}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog.Root>
      )}
    </>
  );
}
