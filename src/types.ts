export type MusicJsonType = {
  isListening: boolean;
  track?: {
    artist: string;
    album: string;
    name: string;
    image: string;
    url: string;
  };
};
