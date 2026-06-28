import Hls, {
  Events,
  type FragLoadingData,
  type ManifestParsedData
} from "hls.js";
import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "../../lib/cn";
import {
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack
} from "./Slider";
import { formatDuration } from "../../lib/time";
import { Popover, Slider } from "@base-ui/react";
import { PopoverContent, PopoverTrigger } from "./Popover";
import PauseIcon from "../../icons/pause.svg?react";
import PlayIcon from "../../icons/play.svg?react";
import FullscreenIcon from "../../icons/fullscreen.svg?react";
import MinimizescreenIcon from "../../icons/minimize-screen.svg?react";
import QualitySettingsIcon from "../../icons/quality-setting.svg?react";
import ActiveDot from "./Utils";
import VolumeUpIcon from "../../icons/volume-up.svg?react";
import VolumeMuteIcon from "../../icons/volume-mute.svg?react";
import VolumeDownIcon from "../../icons/volume-down.svg?react";
import SpinnerIcon from "../../icons/spinner.svg?react";

interface VideoPlayerProps {
  source: string;
  className?: string;
}

export default function VideoPlayer({ source, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hls = useRef<Hls | null>(null);
  const [resolutions, setResolutions] = useState<number[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    setIsLoaded(false);

    const handleVideoReady = () => setIsLoaded(true);

    if (Hls.isSupported()) {
      hls.current = new Hls();
      hls.current.loadSource(source);
      hls.current.attachMedia(video);

      const handleManifestParsed = (
        _event: Events.MANIFEST_PARSED,
        data: ManifestParsedData
      ) => {
        const levels = data?.levels?.map((level) => level.height);
        setResolutions(levels || null);
      };

      hls.current.on(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
      hls.current.on(Hls.Events.LEVEL_LOADED, handleVideoReady);

      return () => {
        hls.current?.off(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
        hls.current?.off(Hls.Events.LEVEL_LOADED, handleVideoReady);
        hls.current?.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;

      video.addEventListener("loadedmetadata", handleVideoReady);
      return () =>
        video.removeEventListener("loadedmetadata", handleVideoReady);
    }
  }, [source]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "border-gray bg-gray/20 full relative flex flex-col gap-2 border border-dashed",
        className
      )}
    >
      <video
        ref={videoRef}
        className="flex aspect-video h-full w-full hover:cursor-pointer"
      />

      {isLoaded ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            {videoRef.current?.duration === videoRef.current?.currentTime && (
              <ReplayButton videoRef={videoRef} />
            )}
          </div>
          <VideoControls
            containerRef={containerRef}
            videoRef={videoRef}
            hlsRef={hls}
            resolutions={resolutions}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm">
          <SpinnerIcon className="size-5" />
          Loading video...
        </div>
      )}
    </div>
  );
}

interface VideoControlsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  hlsRef: React.RefObject<Hls | null>;
  resolutions: number[] | null;
}

function VideoControls({
  containerRef,
  videoRef,
  hlsRef,
  resolutions
}: VideoControlsProps) {
  const controlsRef = useRef<HTMLDivElement | null>(null);
  // used when fullscreen to render the popover within the container
  const popoverPortalRef = useRef<HTMLDivElement | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [duration, setDuration] = useState(
    () => videoRef.current?.duration || 0
  );
  const [buffered, setBuffered] = useState<TimeRanges | null>(
    videoRef.current?.buffered || null
  );
  const [resAutoLvl, setResAutoLvl] = useState<string | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(
    null
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const isChangingPos = useRef(false);

  const changeState = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (video.paused) video.play();
    else video.pause();
  };

  const changeResolution = (res: number) => {
    if (!hlsRef.current) return;
    const hls = hlsRef.current;

    if (
      (res === -1 && hls.autoLevelEnabled) ||
      (res !== -1 &&
        !hls.autoLevelEnabled &&
        hls.levels[hls.currentLevel]?.height === res)
    )
      return;

    // -1 = auto
    hls.currentLevel =
      res === -1 ? -1 : hls.levels.findIndex((level) => level.height === res);

    setSelectedResolution(res === -1 ? "auto" : res.toString());
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showControls = () => {
      if (!controlsRef.current) return;
      const controls = controlsRef.current;

      controls.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "cursor-none"
      );
      controls.classList.add("opacity-100");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const isResPopoverOpen = controls.dataset.resPopoverOpen === "true";
      const isVolumePopoverOpen = controls.dataset.volumePopoverOpen === "true";

      if (isPlayingRef.current && !(isResPopoverOpen || isVolumePopoverOpen)) {
        timeoutRef.current = setTimeout(() => {
          controls.classList.remove("opacity-100");
          controls.classList.add(
            "opacity-0",
            "pointer-events-none",
            "cursor-none"
          );
        }, 3000);
      }
    };

    const handlePlay = () => {
      isPlayingRef.current = true;
      setIsPlaying(true);
      showControls();
    };
    const handlePause = () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      showControls();
    };
    const handleSpaceDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        changeState();
      }
    };
    const handleTimeUpdate = () => {
      if (!isChangingPos.current) setPos(video.currentTime);
    };
    const handleDurationChange = () => {
      if (video.duration) setDuration(video.duration);
    };
    const handleOver = () => showControls();
    const handleProgress = () => setBuffered(video.buffered);
    const handleEnded = () => {
      video.currentTime = 0;
      setPos(0);
    };

    video.addEventListener("mouseover", handleOver);
    video.addEventListener("mousemove", handleOver);
    video.addEventListener("click", changeState);
    video.addEventListener("keydown", handleSpaceDown);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("progress", handleProgress);

    return () => {
      video.removeEventListener("mouseover", handleOver);
      video.removeEventListener("mousemove", handleOver);
      video.removeEventListener("click", changeState);
      video.removeEventListener("keydown", handleSpaceDown);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("progress", handleProgress);
    };
  }, [videoRef]);

  useEffect(() => {
    if (!hlsRef.current) return;
    const hls = hlsRef.current;

    const updateResolution = (levelIndex: number) => {
      const level = hls.levels[levelIndex];
      if (!level) return;

      if (hls.autoLevelEnabled) {
        setSelectedResolution("auto");
        setResAutoLvl(`${level.height}p`);
      } else {
        setSelectedResolution(level.height.toString());
        setResAutoLvl(null);
      }
    };

    const handleFragLoading = (
      _event: Events.FRAG_LOADING,
      data: FragLoadingData
    ) => {
      if (typeof data?.frag?.level === "number") {
        updateResolution(data.frag.level);
      }
    };

    hls.on(Hls.Events.FRAG_LOADING, handleFragLoading);

    const initialLevel =
      hls.currentLevel === -1 ? hls.loadLevel : hls.currentLevel;
    if (initialLevel !== -1) updateResolution(initialLevel);

    return () => hls.off(Hls.Events.FRAG_LOADING, handleFragLoading);
  }, [hlsRef, resolutions]);

  return (
    <div
      ref={controlsRef}
      data-res-popover-open={resOpen}
      data-volume-popover-open={volumeOpen}
      className="bg-background/70 border-gray absolute bottom-0 flex w-full items-center gap-2 border-t border-dashed px-2 py-1 transition-opacity duration-200"
    >
      <div
        ref={popoverPortalRef}
        className="pointer-events-none absolute inset-0 z-50"
      />

      <button
        className="bg-background/70 border-gray group/video-state-control flex items-center justify-center border border-dashed p-0.5 hover:cursor-pointer"
        onClick={changeState}
      >
        <div className="group-hover/video-state-control:bg-gray/40 group-active/video-state-control:bg-gray/60 flex items-center justify-center">
          {isPlaying ? (
            <PauseIcon className="size-5.5" />
          ) : (
            <PlayIcon className="size-5.5" />
          )}
        </div>
      </button>

      <ProgressBar
        pos={pos}
        duration={duration}
        buffered={buffered}
        setPos={setPos}
        isChangingPos={isChangingPos}
        videoRef={videoRef}
      />

      <span className="font-mono text-xs">
        {formatDuration(pos)} / {formatDuration(duration)}
      </span>

      <div className="flex items-center gap-0.5">
        <VolumeControl
          open={volumeOpen}
          setOpen={setVolumeOpen}
          videoRef={videoRef}
          popoverPortalRef={popoverPortalRef}
        />
        <QualityControl
          open={resOpen}
          setOpen={setResOpen}
          resolutions={resolutions}
          selectedResolution={selectedResolution}
          resAutoLvl={resAutoLvl}
          changeResolution={changeResolution}
        />
        <FullscreenControl
          containerRef={containerRef}
          setIsFullscreen={setIsFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>
    </div>
  );
}

interface ProgressBarProps {
  pos: number;
  duration: number;
  buffered: TimeRanges | null;
  setPos: (value: number) => void;
  isChangingPos: RefObject<boolean>;
  videoRef: RefObject<HTMLVideoElement | null>;
}

function ProgressBar({
  pos,
  duration,
  buffered,
  setPos,
  isChangingPos,
  videoRef
}: ProgressBarProps) {
  const bufferedPercentage =
    buffered && buffered.length > 0
      ? (buffered.end(buffered.length - 1) / duration) * 100
      : 0;

  return (
    <Slider.Root
      value={pos}
      className="mx-2 flex-1"
      max={duration}
      onPointerDown={() => (isChangingPos.current = true)}
      onPointerUp={() => (isChangingPos.current = false)}
      onPointerCancel={() => (isChangingPos.current = false)}
      onValueChange={(value) => setPos(value as number)}
      onValueCommitted={() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = pos;
        isChangingPos.current = false;
      }}
    >
      <SliderControl>
        <SliderTrack bufferedValue={bufferedPercentage}>
          <SliderIndicator />
          <SliderThumb />
        </SliderTrack>
      </SliderControl>
    </Slider.Root>
  );
}

interface VolumeControlProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  popoverPortalRef: RefObject<HTMLElement | null>;
}

function VolumeControl({
  open,
  setOpen,
  videoRef,
  popoverPortalRef
}: VolumeControlProps) {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const storedVolume = Number(
      localStorage.getItem("video-player-volume") ?? 0.5
    );
    setVolume(storedVolume);
    if (videoRef.current) videoRef.current.volume = storedVolume;
  }, [videoRef]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="p-1 text-xs">
        {volume === 0 ? (
          <VolumeMuteIcon className="size-5.5" />
        ) : volume < 0.5 ? (
          <VolumeDownIcon className="size-5.5" />
        ) : (
          <VolumeUpIcon className="size-5.5" />
        )}
      </PopoverTrigger>
      <PopoverContent
        portalContainer={popoverPortalRef.current}
        align="center"
        side="top"
        sideOffset={8}
        className="flex h-35 w-18 flex-col items-center gap-2"
      >
        <Slider.Root
          orientation="vertical"
          className="h-full w-5"
          value={volume}
          max={1}
          step={0.01}
          min={0}
          onValueChange={(value) => {
            setVolume(value);
            localStorage.setItem("video-player-volume", value.toString());
            if (videoRef.current) videoRef.current.volume = value;
          }}
        >
          <SliderControl>
            <SliderTrack className="bg-gray/40">
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider.Root>
        <span className="font-mono text-xs tabular-nums">
          {Math.round(volume * 100)}%
        </span>
      </PopoverContent>
    </Popover.Root>
  );
}

interface QualityControlProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  resolutions: number[] | null;
  selectedResolution: string | null;
  resAutoLvl: string | null;
  changeResolution: (res: number) => void;
}

function QualityControl({
  open,
  setOpen,
  resolutions,
  selectedResolution,
  resAutoLvl,
  changeResolution
}: QualityControlProps) {
  const buttonStyle = (res: number | "auto") =>
    cn(
      "flex w-full items-center text-xs text-white/60 transition-colors duration-200 hover:text-white",
      selectedResolution === res.toString() && "text-white"
    );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="p-1 text-xs">
        <QualitySettingsIcon className="size-5.5" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={8}
        className="flex flex-col items-start gap-1"
      >
        <button
          className={buttonStyle("auto")}
          onClick={() => changeResolution(-1)}
        >
          Auto {resAutoLvl ? `(${resAutoLvl})` : ""}
          {selectedResolution === "auto" && <ActiveDot />}
        </button>
        {resolutions
          ?.sort((a, b) => b - a)
          .map((res) => {
            const isSelected = selectedResolution === res.toString();

            return (
              <button
                key={res}
                className={buttonStyle(res)}
                onClick={() => changeResolution(res)}
              >
                {res}p{isSelected && <ActiveDot />}
              </button>
            );
          })}
      </PopoverContent>
    </Popover.Root>
  );
}

interface FullscreenControlProps {
  containerRef: RefObject<HTMLDivElement | null>;
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

function FullscreenControl({
  containerRef,
  setIsFullscreen,
  isFullscreen
}: FullscreenControlProps) {
  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [containerRef]);

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen();
  };

  return (
    <button
      className="hover:bg-gray/40 active:bg-gray/60 p-1 transition-colors duration-200 hover:cursor-pointer"
      onClick={handleFullscreen}
    >
      {isFullscreen ? (
        <MinimizescreenIcon className="size-5.5" />
      ) : (
        <FullscreenIcon className="size-5.5" />
      )}
    </button>
  );
}

interface ReplayButtonProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

function ReplayButton({ videoRef }: ReplayButtonProps) {
  const handleReplay = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    video.currentTime = 0;
    video.play();
  };

  return (
    <button
      className="hover:bg-gray/40 active:bg-gray/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-1 transition-colors duration-200 hover:cursor-pointer"
      onClick={handleReplay}
    >
      Replay
    </button>
  );
}
