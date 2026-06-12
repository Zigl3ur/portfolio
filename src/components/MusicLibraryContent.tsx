import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import type { LangProps, MusicAlbum } from "../types";
import Image from "./ui/Image";
import Checkbox from "./ui/checkbox";
import Skeleton from "./ui/Skeleton";
import Alert from "./ui/Alert";

interface MusicLibraryContentProps {
  t: LangProps<"musicLibrary">["t"];
}

export default function MusicLibraryContent({ t }: MusicLibraryContentProps) {
  const {
    data: musicLibraryData,
    error,
    loading,
    headers
  } = useFetch<MusicAlbum[]>("/api/music/top-albums");

  const updatedAtHeader = headers?.get("x-cache");

  const [showPlayCount, setShowPlayCount] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>(
    updatedAtHeader ? new Date(updatedAtHeader).toLocaleTimeString() : ""
  );

  useEffect(() => {
    updatedAtHeader
      ? setUpdatedAt(new Date(updatedAtHeader).toLocaleTimeString())
      : setUpdatedAt(new Date().toLocaleTimeString());
  }, [updatedAtHeader]);

  return (
    <div className="mt-4 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground/70">{t.description}</p>
        <Checkbox
          disabled={loading || !!error}
          checked={showPlayCount}
          onCheckedChange={(checked) => setShowPlayCount(checked)}
        >
          {t.checkboxLabel}
        </Checkbox>
      </div>

      {loading && <MusicLibrarySkeleton />}

      {error && <Alert variant="error">{t.errorMessage}</Alert>}

      {musicLibraryData && (
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-5 md:grid-cols-3">
          {musicLibraryData.map((album) => (
            <a
              key={album.url}
              href={album.url}
              target="_blank"
              className="bg-muted/30 border-gray hover:border-lime-bright/40 flex h-full flex-col overflow-hidden border border-dashed transition-all duration-200 hover:cursor-pointer"
            >
              <div className="bg-background/40 relative flex items-center justify-center">
                {album.image && (
                  <Image
                    className="aspect-square w-full"
                    src={album.image}
                    alt={`${album.name} cover`}
                  />
                )}

                {showPlayCount && (
                  <span className="bg-lime-bright text-gray absolute right-0 bottom-0 rounded-none p-0.5 px-1 text-[0.6rem] font-semibold tracking-widest uppercase shadow-md">
                    {album.playcount} {t.plays}
                  </span>
                )}
              </div>

              <div className="flex h-full flex-col justify-between gap-1 p-3">
                <p className="mb-1 line-clamp-2 font-mono font-semibold sm:text-lg">
                  {album.name}
                </p>

                <span className="border-gray text-foreground/70 w-fit border border-dashed px-1.5 py-1 text-sm">
                  {album.artist}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
      <span className="text-foreground/70 font-mono text-xs">
        {musicLibraryData?.length || 0} albums &nbsp;|&nbsp; last updated at{" "}
        {updatedAt}
      </span>
    </div>
  );
}

function MusicLibrarySkeleton() {
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-5 md:grid-cols-3">
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted/30 border-gray overflow-hidden border border-dashed"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-3 p-3">
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
