import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import type { LangProps, MusicAlbum, RecentTrack } from "../types";
import Image from "./ui/Image";
import Checkbox from "./ui/Checkbox";
import Skeleton from "./ui/Skeleton";
import Alert from "./ui/Alert";
import MusicIcon from "../icons/music.svg?react";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./ui/Tabs";
import { format } from "../lib/time";
import { languages } from "../i18n/ui";
import { apiUrl } from "../lib/api";

interface MusicLibraryContentProps {
  locale: keyof typeof languages;
  t: LangProps<"musicLibrary">["t"];
}

export default function MusicLibraryContent({
  t,
  locale
}: MusicLibraryContentProps) {
  return (
    <TabsRoot defaultValue="recent-tracks">
      <TabsList>
        <TabsTrigger value="top-albums">{t.tabs.topAlbums.tabs}</TabsTrigger>
        <TabsTrigger value="recent-tracks">
          {t.tabs.recentTracks.tabs}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="top-albums" className="border-none px-0">
        <AlbumsLibrary t={t} locale={locale} />
      </TabsContent>
      <TabsContent value="recent-tracks" className="border-none px-0">
        <RecentTracksLibrary t={t} locale={locale} />
      </TabsContent>
    </TabsRoot>
  );
}

function AlbumsLibrary({ t }: MusicLibraryContentProps) {
  const {
    data: musicLibraryData,
    error,
    loading,
    headers
  } = useFetch<MusicAlbum[]>("/music/top-albums");

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
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <p className="text-foreground/70">{t.tabs.topAlbums.description}</p>
        <Checkbox
          disabled={loading || !!error || musicLibraryData?.length === 0}
          checked={showPlayCount}
          onCheckedChange={(checked) => setShowPlayCount(checked)}
        >
          {t.checkboxLabel}
        </Checkbox>
      </div>

      {loading && <AlbumsLibrarySkeleton />}

      {error && <Alert variant="error">{t.errorMessage}</Alert>}

      {musicLibraryData && musicLibraryData.length > 0 && (
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

      {!loading &&
        !error &&
        (!musicLibraryData || musicLibraryData.length === 0) && (
          <div className="border-gray flex flex-1 flex-col items-center justify-center gap-4 border border-dashed py-6">
            <MusicIcon className="text-gray xs:size-14 size-10" />
            <p className="xs:text-base text-center text-sm">
              {t.noAlbumsMessage}
            </p>
          </div>
        )}

      <span className="text-foreground/70 font-mono text-xs">
        {musicLibraryData?.length || 0} albums &nbsp;|&nbsp; last updated at{" "}
        {updatedAt}
      </span>
    </div>
  );
}

function AlbumsLibrarySkeleton() {
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

function RecentTracksLibrary({ t, locale }: MusicLibraryContentProps) {
  const {
    data: recentTracksData,
    error,
    loading,
    headers
  } = useFetch<RecentTrack[]>("/music/recent-tracks", {
    baseUrl: apiUrl(),
    options: { refetchInterval: 60_000 }
  });

  const updatedAtHeader = headers?.get("x-cache");

  const [updatedAt, setUpdatedAt] = useState<string>(
    updatedAtHeader ? new Date(updatedAtHeader).toLocaleTimeString() : ""
  );

  useEffect(() => {
    updatedAtHeader
      ? setUpdatedAt(new Date(updatedAtHeader).toLocaleTimeString())
      : setUpdatedAt(new Date().toLocaleTimeString());
  }, [updatedAtHeader]);

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <p className="text-foreground/70">{t.tabs.recentTracks.description}</p>

      <div className="overflow-x-auto">
        {loading && <RecentTracksLibrarySkeleton />}

        {error && <Alert variant="error">{t.errorMessage}</Alert>}

        {recentTracksData && recentTracksData.length > 0 && (
          <table className="w-full min-w-sm">
            <tbody>
              {recentTracksData.map((track, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 border-border/60 border-gray w-full border-dashed transition-colors duration-200 not-last:border-b hover:cursor-pointer [&>td]:px-2 [&>td]:py-2.5"
                >
                  <td className="w-12">
                    {track.image && (
                      <Image
                        className="aspect-square w-12 object-cover"
                        src={track.image}
                        alt={`${track.name} cover`}
                      />
                    )}
                  </td>
                  <td className="sm:text-lg">
                    <div className="line-clamp-2 font-mono font-semibold">
                      {track.name}
                    </div>
                    <div className="text-xs opacity-70">{track.album}</div>
                  </td>
                  <td className="text-foreground/70 px-1.5 py-1 text-sm">
                    {track.artist}
                  </td>
                  <td className="text-foreground/70 w-32 px-1.5 py-1 text-end text-sm">
                    {track.isListening ? (
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex flex-row items-center gap-0.5">
                          <span className="bg-lime-bright animate-bar-left h-3 w-1"></span>
                          <span className="bg-lime-bright animate-bar-center h-4 w-1"></span>
                          <span className="bg-lime-bright animate-bar-right h-3 w-1"></span>
                        </div>
                        {t.tabs.recentTracks.listening}
                      </div>
                    ) : (
                      format(Number(track.lastListened) * 1000, locale)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading &&
        !error &&
        (!recentTracksData || recentTracksData.length === 0) && (
          <div className="border-gray flex flex-1 flex-col items-center justify-center gap-4 border border-dashed py-6">
            <MusicIcon className="text-gray xs:size-14 size-10" />
            <p className="xs:text-base text-center text-sm">
              {t.noAlbumsMessage}
            </p>
          </div>
        )}

      <span className="text-foreground/70 font-mono text-xs">
        {recentTracksData?.length || 0} tracks &nbsp;|&nbsp; last updated at{" "}
        {updatedAt}
      </span>
    </div>
  );
}

function RecentTracksLibrarySkeleton() {
  return (
    <table className="w-full min-w-sm">
      <tbody>
        {Array.from({ length: 51 }).map((_, index) => (
          <tr
            key={index}
            className="border-border/60 border-gray border-dashed not-last:border-b [&>td]:px-2 [&>td]:py-2.5"
          >
            <td className="w-16">
              <Skeleton className="aspect-square w-12" />
            </td>
            <td>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-1.5 h-3 w-1/3" />
            </td>
            <td className="w-32 sm:w-44">
              <Skeleton className="h-4 w-3/4" />
            </td>
            <td className="w-28 sm:w-36">
              <Skeleton className="ml-auto h-4 w-20" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
