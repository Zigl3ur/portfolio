import { useEffect, useState } from "react";
import type { MusicDataType } from "../types";
import Modal from "./ui/Modal";
import Image from "./ui/Image";

export default function Listener() {
  const [musicData, setMusicData] = useState<MusicDataType>({
    isListening: false
  });

  useEffect(() => {
    const fetchMusic = async () => {
      const res = await fetch("https://api.douru.fr/music");
      const data = (await res.json()) as MusicDataType;
      setMusicData(data);
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
                <span className="italice transition-opacity duration-200 hover:cursor-pointer hover:opacity-70">
                  {musicData.track.name}
                </span>
              </Modal.Trigger>
              <Modal.Content>
                <div className="flex flex-col items-center">
                  {musicData.track.image && (
                    <Image
                      className="mb-4 h-[174px] w-[174px] rounded-md object-cover"
                      src={musicData.track.image}
                      alt={`${musicData.track.name} cover`}
                    />
                  )}
                  <div className="flex flex-col">
                    <a
                      className="text-white transition-opacity duration-200 hover:cursor-pointer hover:opacity-70"
                      href={musicData.track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-lg font-semibold">
                        {musicData.track.name}
                      </p>
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
