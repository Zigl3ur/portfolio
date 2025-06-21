import type { LastFMData } from "../../types";
import { LASTFM_API_KEY } from "astro:env/server";

export async function GET() {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zigl3ur&api_key=${LASTFM_API_KEY}&format=json`
  );

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  if (!response.ok) {
    return new Response(JSON.stringify({ isListening: false }), {
      status: 200,
      headers,
    });
  }

  const data: LastFMData = await response.json();

  const tracks = data.recenttracks.track;
  const isListening =
    tracks.length > 0 && tracks[0]["@attr"]?.nowplaying === "true";

  if (isListening)
    return new Response(
      JSON.stringify({
        isListening: isListening,
        track: {
          artist: tracks[0].artist["#text"],
          album: tracks[0].album["#text"],
          name: tracks[0].name,
          image: tracks[0].image.find((img) => img.size === "large")?.["#text"],
          url: tracks[0].url,
        },
      }),
      {
        status: 200,
        headers,
      }
    );

  return new Response(JSON.stringify({ isListening: isListening }), {
    status: 200,
    headers,
  });
}
