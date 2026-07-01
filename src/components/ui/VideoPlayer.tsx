import Hls, {
  Events,
  type ErrorData,
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
import ErrorIcon from "../../icons/error.svg?react";
import useVideoPlayer, {
  type VideoPlayerParams
} from "../../hooks/useVideoPlayer";

interface VideoPlayerProps {
  src: string;
  playOnMount?: boolean;
  className?: string;
}

export default function VideoPlayer({
  src,
  playOnMount,
  className
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hls = useRef<Hls | null>(null);
  const [resolutions, setResolutions] = useState<number[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoPlayer = useVideoPlayer(videoRef);

  useEffect(() => {
    if (playOnMount && isLoaded && videoRef.current) {
      const video = videoRef.current;
      video.play();
    }
  }, [playOnMount, isLoaded]);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    setIsLoaded(false);
    setResolutions(null);

    const handleVideoReady = () => {
      if (video.duration > 0) setIsLoaded(true);
    };

    const handleError = (_event: Events.ERROR, data: ErrorData) => {
      if (data.fatal) setError(data.error.message || "Unable to load video");
    };

    video.addEventListener("loadedmetadata", handleVideoReady);

    if (Hls.isSupported()) {
      hls.current = new Hls();
      hls.current.loadSource(src);
      hls.current.attachMedia(video);

      const handleManifestParsed = (
        _event: Events.MANIFEST_PARSED,
        data: ManifestParsedData
      ) => {
        const levels = data?.levels?.map((level) => level.height);
        setResolutions(levels || null);
      };

      hls.current.on(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
      hls.current.on(Hls.Events.ERROR, handleError);

      return () => {
        video.removeEventListener("loadedmetadata", handleVideoReady);
        hls.current?.off(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
        hls.current?.off(Hls.Events.ERROR, handleError);
        hls.current?.destroy();
        hls.current = null;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;

      video.addEventListener("loadedmetadata", handleVideoReady);
      return () =>
        video.removeEventListener("loadedmetadata", handleVideoReady);
    }
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-gray/20 relative flex h-full flex-col gap-2",
        className
      )}
    >
      <video
        ref={videoRef}
        className="flex aspect-video h-full w-full hover:cursor-pointer"
      />

      {isLoaded ? (
        <VideoControls
          containerRef={containerRef}
          videoRef={videoRef}
          hlsRef={hls}
          resolutions={resolutions}
          videoPlayer={videoPlayer}
        />
      ) : error ? (
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-2 text-sm">
          <ErrorIcon className="size-5 shrink-0" />
          <div className="flex flex-col items-center gap-1 text-center">
            Error loading video <span className="text-xs">{error}</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-2 text-sm">
          <SpinnerIcon className="size-5 shrink-0" />
          Loading video...
        </div>
      )}
    </div>
  );
}

interface VideoControlsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  hlsRef: RefObject<Hls | null>;
  resolutions: number[] | null;
  videoPlayer: VideoPlayerParams;
}

function VideoControls({
  containerRef,
  videoRef,
  hlsRef,
  resolutions,
  videoPlayer
}: VideoControlsProps) {
  const controlsRef = useRef<HTMLDivElement | null>(null);
  // used when fullscreen to render the popover within the container
  const popoverPortalRef = useRef<HTMLDivElement | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [resAutoLvl, setResAutoLvl] = useState<string | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(
    null
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(videoPlayer.isPlaying);

  useEffect(() => {
    isPlayingRef.current = videoPlayer.isPlaying;
  }, [videoPlayer.isPlaying]);

  const changeResolution = (res: number) => {
    if (!hlsRef.current) return;
    const hls = hlsRef.current;

    // auto res
    if (res === -1) {
      hls.nextLevel = -1;
      setSelectedResolution("auto");
      return;
    }

    const levelIndex = hls.levels.findIndex((level) => level.height === res);
    if (levelIndex === -1) return;

    if (!hls.autoLevelEnabled && hls.nextLevel === levelIndex) return;

    hls.nextLevel = levelIndex;
    setSelectedResolution(res.toString());
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showControls = () => {
      if (!controlsRef.current) return;
      const controls = controlsRef.current;
      if (!videoRef.current) return;
      const video = videoRef.current;

      video.classList.remove("hover:cursor-none");
      controls.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "cursor-none"
      );
      video.classList.add("hover:cursor-pointer");
      controls.classList.add("opacity-100");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const isResPopoverOpen = controls.dataset.resPopoverOpen === "true";
      const isVolumePopoverOpen = controls.dataset.volumePopoverOpen === "true";

      if (isPlayingRef.current && !(isResPopoverOpen || isVolumePopoverOpen)) {
        timeoutRef.current = setTimeout(() => {
          video.classList.remove("hover:cursor-pointer");
          controls.classList.remove("opacity-100");
          video.classList.add("hover:cursor-none");
          controls.classList.add(
            "opacity-0",
            "pointer-events-none",
            "cursor-none"
          );
        }, 2500);
      }
    };

    const handlePlay = () => {
      isPlayingRef.current = true;
      showControls();
    };
    const handlePause = () => {
      isPlayingRef.current = false;
      showControls();
    };
    const handleSpaceDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        videoPlayer.togglePlay();
      }
    };
    const handleOver = () => showControls();

    video.addEventListener("mouseover", handleOver);
    video.addEventListener("mousemove", handleOver);
    video.addEventListener("click", videoPlayer.togglePlay);
    video.addEventListener("keydown", handleSpaceDown);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("mouseover", handleOver);
      video.removeEventListener("mousemove", handleOver);
      video.removeEventListener("click", videoPlayer.togglePlay);
      video.removeEventListener("keydown", handleSpaceDown);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
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
      updateResolution(data.frag.level);
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

      <ControlButton onClick={videoPlayer.togglePlay}>
        {videoPlayer.isPlaying ? (
          <PauseIcon className="size-5.5" />
        ) : (
          <PlayIcon className="size-5.5" />
        )}
      </ControlButton>

      <ProgressBar videoPlayer={videoPlayer} />

      <span className="font-mono text-xs">
        {formatDuration(videoPlayer.pos)} /{" "}
        {formatDuration(videoPlayer.duration)}
      </span>

      <div className="flex items-center gap-0.5">
        <VolumeControl
          open={volumeOpen}
          setOpen={setVolumeOpen}
          videoRef={videoRef}
          popoverPortalRef={popoverPortalRef}
        />
        <ResolutionControl
          open={resOpen}
          setOpen={setResOpen}
          resolutions={resolutions}
          selectedResolution={selectedResolution}
          resAutoLvl={resAutoLvl}
          changeResolution={changeResolution}
          popoverPortalRef={popoverPortalRef}
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
  videoPlayer: VideoPlayerParams;
}

function ProgressBar({ videoPlayer }: ProgressBarProps) {
  const bufferedPercentage =
    videoPlayer.buffered &&
    videoPlayer.buffered.length > 0 &&
    videoPlayer.duration > 0
      ? (videoPlayer.buffered.end(videoPlayer.buffered.length - 1) /
          videoPlayer.duration) *
        100
      : 0;

  return (
    <Slider.Root
      value={videoPlayer.pos}
      className="mx-2 flex-1"
      max={videoPlayer.duration}
      onPointerDown={() => (videoPlayer.isChangingPos.current = true)}
      onPointerUp={() => (videoPlayer.isChangingPos.current = false)}
      onPointerCancel={() => (videoPlayer.isChangingPos.current = false)}
      onValueChange={(value) => videoPlayer.setPos(value as number)}
      onValueCommitted={() => {
        videoPlayer.changePos(videoPlayer.pos);
        videoPlayer.isChangingPos.current = false;
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
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);

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
        ref={popoverContainerRef}
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

interface ResolutionControlProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  resolutions: number[] | null;
  selectedResolution: string | null;
  resAutoLvl: string | null;
  changeResolution: (res: number) => void;
  popoverPortalRef: RefObject<HTMLElement | null>;
}

function ResolutionControl({
  open,
  setOpen,
  resolutions,
  selectedResolution,
  resAutoLvl,
  changeResolution,
  popoverPortalRef
}: ResolutionControlProps) {
  const buttonStyle = (res: number | "auto") =>
    cn(
      "flex w-full items-center text-xs text-white/60 transition-colors duration-200 hover:text-white hover:cursor-pointer",
      selectedResolution === res.toString() && "text-white"
    );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="p-1 text-xs">
        <QualitySettingsIcon className="size-5.5" />
      </PopoverTrigger>
      <PopoverContent
        portalContainer={popoverPortalRef.current}
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

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function ControlButton({ onClick, children, className }: ControlButtonProps) {
  return (
    <button
      className={cn(
        "bg-background/70 border-gray group flex items-center justify-center border border-dashed p-0.5 hover:cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="group-hover:bg-gray/40 group-active:bg-gray/60 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </button>
  );
}
