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
  const [error, setError] = useState<string | null>(null);

  const videoPlayer = useVideoPlayer(videoRef);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    setResolutions(null);
    setError(null);

    const handleLoadedMetadata = () => {
      if (playOnMount) video.play();
    };

    const handleError = (event: Events.ERROR, data: ErrorData) => {
      if (data.fatal) setError(data.error.message || "Unable to load video");
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleManifestParsed = (
      _event: Events.MANIFEST_PARSED,
      data: ManifestParsedData
    ) => {
      const levels = data?.levels?.map((level) => level.height);

      setResolutions(levels);
    };

    if (Hls.isSupported()) {
      hls.current = new Hls();
      hls.current.loadSource(src);
      hls.current.attachMedia(video);

      hls.current.on(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
      hls.current.on(Hls.Events.ERROR, handleError);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause();
      },
      { threshold: 0 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      observer.disconnect();
      hls.current?.off(Hls.Events.MANIFEST_PARSED, handleManifestParsed);
      hls.current?.off(Hls.Events.ERROR, handleError);
      hls.current?.destroy();
      hls.current = null;
    };
  }, [playOnMount, src]);

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
        data-playing={videoPlayer.isPlaying}
        className={cn(
          "flex aspect-video h-full w-full",
          !error && "hover:cursor-pointer"
        )}
      />

      <VideoControls
        containerRef={containerRef}
        videoRef={videoRef}
        hlsRef={hls}
        errored={!!error}
        resolutions={resolutions}
        videoPlayer={videoPlayer}
      />

      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
          <ErrorIcon className="mb-2 size-5 w-full shrink-0" />
          <div className="flex flex-col items-center gap-1 text-center">
            Error loading video <span className="text-xs">{error}</span>
          </div>
        </div>
      )}

      {!error && videoPlayer.isLoading && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SpinnerIcon className="size-7 shrink-0" />
        </div>
      )}
    </div>
  );
}

interface VideoControlsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  hlsRef: RefObject<Hls | null>;
  errored: boolean;
  resolutions: number[] | null;
  videoPlayer: VideoPlayerParams;
}

function VideoControls({
  containerRef,
  videoRef,
  hlsRef,
  errored,
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
  const isReady =
    Number.isFinite(videoPlayer.duration) &&
    videoPlayer.duration > 0 &&
    !videoPlayer.isLoading;

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

    setResOpen(false);
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
      !errored && video.classList.add("hover:cursor-pointer");
      controls.classList.add("opacity-100");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const isResPopoverOpen = controls.dataset.resPopoverOpen === "true";
      const isVolumePopoverOpen = controls.dataset.volumePopoverOpen === "true";

      if (
        isPlayingRef.current &&
        !(isResPopoverOpen || isVolumePopoverOpen) &&
        !videoPlayer.isLoading
      ) {
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
        if (!isReady) return;
        videoPlayer.togglePlay();
      }
    };
    const handleOver = () => showControls();
    const handleVideoClick = () => {
      if (isReady) videoPlayer.togglePlay();
    };

    video.addEventListener("mouseover", handleOver);
    video.addEventListener("mousemove", handleOver);
    video.addEventListener("click", handleVideoClick);
    video.addEventListener("keydown", handleSpaceDown);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("mouseover", handleOver);
      video.removeEventListener("mousemove", handleOver);
      video.removeEventListener("click", handleVideoClick);
      video.removeEventListener("keydown", handleSpaceDown);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [isReady, videoRef]);

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

      <ControlButton disabled={!isReady} onClick={videoPlayer.togglePlay}>
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
          disabled={!isReady}
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
  const hasDuration =
    Number.isFinite(videoPlayer.duration) && videoPlayer.duration > 0;
  const maxDuration = hasDuration ? videoPlayer.duration : 1;
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
      value={Math.min(videoPlayer.pos, maxDuration)}
      className="mx-2 flex-1"
      disabled={!hasDuration}
      max={maxDuration}
      onPointerDown={() => {
        if (hasDuration) videoPlayer.isChangingPos.current = true;
      }}
      onPointerUp={() => (videoPlayer.isChangingPos.current = false)}
      onPointerCancel={() => (videoPlayer.isChangingPos.current = false)}
      onValueChange={(value) => {
        if (hasDuration) videoPlayer.setPos(value as number);
      }}
      onValueCommitted={() => {
        if (hasDuration) videoPlayer.changePos(videoPlayer.pos);
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
    <Popover.Root open={open} onOpenChange={(value) => setOpen(value)}>
      <PopoverTrigger className="disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent">
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
  disabled: boolean;
  popoverPortalRef: RefObject<HTMLElement | null>;
}

function ResolutionControl({
  open,
  setOpen,
  resolutions,
  selectedResolution,
  resAutoLvl,
  changeResolution,
  disabled,
  popoverPortalRef
}: ResolutionControlProps) {
  const buttonStyle = (res: number | "auto") =>
    cn(
      "flex w-full items-center text-xs text-white/60 transition-colors duration-200 hover:text-white hover:cursor-pointer",
      selectedResolution === res.toString() && "text-white"
    );

  return (
    <Popover.Root
      open={!disabled && open}
      onOpenChange={(value) => setOpen(disabled ? false : value)}
    >
      <PopoverTrigger
        disabled={disabled}
        className="disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent"
      >
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
      className="hover:bg-gray/40 active:bg-gray/60 p-1 transition-colors duration-200 hover:cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent"
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
  disabled?: boolean;
}

function ControlButton({
  onClick,
  children,
  className,
  disabled
}: ControlButtonProps) {
  return (
    <button
      className={cn(
        "bg-background/70 border-gray group flex items-center justify-center border border-dashed p-0.5 hover:cursor-pointer disabled:cursor-default disabled:opacity-50",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="group-hover:bg-gray/40 group-active:bg-gray/60 flex h-full w-full items-center justify-center group-disabled:bg-transparent">
        {children}
      </div>
    </button>
  );
}
