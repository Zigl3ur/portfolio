import type { LangProps, CurrentlyListening } from "../types";
import Image from "./ui/Image";
import { Dialog } from "@base-ui/react";
import DialogContent from "./ui/DialogContent";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import MusicLibrary from "../icons/music-library.svg?react";
import MusicRecent from "../icons/music-recent.svg?react";
import { format } from "../lib/timeago";
import type { languages } from "../i18n/ui";

interface ListenerProps {
  locale: keyof typeof languages;
  tListener: LangProps<"listener">["t"];
  tMusicLibrary: LangProps<"musicLibrary">["t"];
}

export default function Listener({
  locale,
  tListener,
  tMusicLibrary
}: ListenerProps) {
  const {
    data: musicData,
    error,
    refetch
  } = useFetch<CurrentlyListening>("/music/currently-listening");

  useEffect(() => {
    const interval = setInterval(refetch, 30_000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (!musicData || error) return null;

  const isMusicLibrary = window.location.pathname.includes("/music-library");

  return (
    musicData.track && (
      <Dialog.Root>
        <Dialog.Trigger
          autoFocus={false}
          className="focus-visible:ring-gray inline-flex items-center gap-1.5 px-2.5 py-1.5 transition-colors duration-300 hover:cursor-pointer focus-visible:ring focus-visible:outline-none"
        >
          {musicData.isListening ? (
            <div className="flex flex-row items-center gap-0.5">
              <span className="bg-lime-bright animate-bar-left h-3 w-1"></span>
              <span className="bg-lime-bright animate-bar-center h-4 w-1"></span>
              <span className="bg-lime-bright animate-bar-right h-3 w-1"></span>
            </div>
          ) : (
            <MusicRecent className="size-5.5 text-white/60" />
          )}
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
                  {tListener.artistBy}
                </span>
                <span className="text-sm wrap-break-word">
                  {musicData.track.artist}
                </span>
              </div>
              {musicData.track.listenedAt && (
                <div className="flex items-center gap-3 py-2">
                  <span className="text-lime-bright w-14 shrink-0 text-[0.6rem] tracking-widest uppercase">
                    {tListener.listenedAt}
                  </span>
                  <span className="text-xs wrap-break-word text-white/60">
                    {format(Number(musicData.track.listenedAt) * 1000, locale)}
                  </span>
                </div>
              )}
            </div>
            {!isMusicLibrary && (
              <a
                href={"/music-library"}
                className="bg-lime-bright text-muted mt-4 flex w-full items-center justify-center gap-1 py-1.5 text-center"
              >
                <MusicLibrary className="size-5" />
                {tMusicLibrary.title}
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog.Root>
    )
  );
}
