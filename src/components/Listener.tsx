"use client";

import { useEffect, useState } from "react";
import type { MusicJsonType } from "../types";
import Modal from "./ui/Modal";

export default function Listener() {
  const [musicData, setMusicData] = useState<MusicJsonType>({
    isListening: false
  });

  useEffect(() => {
    const fetchMusic = async () => {
      const res = await fetch("https://api.douru.fr/music");
      const data = await res.json();
      setMusicData(data as MusicJsonType);
    };

    // Initial fetch
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
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-0.5">
            <span className="bg-lime-bright animate-bar-outter h-3 w-1 rounded-sm"></span>
            <span className="bg-lime-bright animate-bar-inner h-4 w-1 rounded-sm"></span>
            <span className="bg-lime-bright animate-bar-outter h-3 w-1 rounded-sm"></span>
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
