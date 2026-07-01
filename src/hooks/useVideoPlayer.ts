import { useEffect, useRef, useState, type RefObject } from "react";

export interface VideoPlayerParams {
  isPlaying: boolean;
  isEnded: boolean;
  pos: number;
  duration: number;
  buffered: TimeRanges | null;
  setPos: (value: number) => void;
  isChangingPos: RefObject<boolean>;
  togglePlay: () => void;
  changePos: (value: number) => void;
}

export default function useVideoPlayer(
  videoRef: RefObject<HTMLVideoElement | null>
): VideoPlayerParams {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [pos, setPos] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState<TimeRanges | null>(null);
  const isChangingPos = useRef(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (video.paused) video.play();
    else video.pause();
  };

  const changePos = (value: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = value;
    setPos(value);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsEnded(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
    };
    const handleTimeUpdate = () => {
      if (!isChangingPos.current) setPos(video.currentTime);
    };
    const handleDurationChange = () => setDuration(video.duration || 0);
    const handleProgress = () => setBuffered(video.buffered);
    const handleLoadedMetadata = () => {
      setIsEnded(false);
      setPos(video.currentTime);
      setDuration(video.duration || 0);
      setBuffered(video.buffered);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  return {
    isPlaying,
    isEnded,
    pos,
    duration,
    buffered,
    setPos,
    isChangingPos,
    togglePlay,
    changePos
  };
}
