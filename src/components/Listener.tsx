"use client";

import { useEffect, useState } from "react";
import type { MusicJsonType } from "../types";
import Modal from "./Modal";

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
      const res = await fetch(`https://api.douru.fr/api/music`);
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
          <div className="text-sm">
            <span className="font-semibold">{musicData.track.artist}</span> -{" "}
            <Modal>
              <Modal.Trigger>
                <span className="italice hover:cursor-pointer hover:underline">
                  {musicData.track.name}
                </span>
              </Modal.Trigger>
              <Modal.Content>
                <div className="flex flex-col items-center">
                  {musicData.track.image && (
                    <img
                      src={musicData.track.image}
                      alt={`${musicData.track.name} cover`}
                      className="mb-4 rounded-md"
                    />
                  )}
                  <div className="flex flex-col">
                    <a
                      className="text-white hover:underline"
                      href={musicData.track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 className="text-lg font-semibold">
                        {musicData.track.name}
                      </h2>
                    </a>
                    <div className="flex flex-col gap-2">
                      <p>{musicData.track.album}</p>
                      <p className="text-sm italic">
                        <span className="font-semibold">By</span>{" "}
                        {musicData.track.artist}
                      </p>
                    </div>
                  </div>
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
