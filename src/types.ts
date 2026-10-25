import type { CarouselMedia } from "./components/ui/Carousel";
import type { uiLangSchema } from "./i18n/ui";

export type CurrentlyListening = {
  isListening: boolean;
  track?: {
    artist: string;
    album: string;
    name: string;
    image: string;
    url: string;
    listenedAt: string;
  };
};

export type MusicAlbum = {
  artist: string;
  url: string;
  name: string;
  image: string;
  playcount: string;
  mbid: string;
};

export type RecentTrack = {
  artist: string;
  album: string;
  name: string;
  image: string;
  url: string;
  isListening: boolean;
  lastListened: string;
};

export type AlbumInfo = {
  album: {
    artist: string;

    tags: {
      tag: {
        name: string;
        url: string;
      }[];
    };

    tracks: {
      track: {
        name: string;
        url: string;
        duration: string;
        "@attr": {
          rank: string;
        };
        artist: {
          name: string;
          url: string;
        };
      }[];
    };
  };
};

export type ProjectType = {
  name: string;
  description: string;
  stack: string[];
  url: string;
  medias?: CarouselMedia[];
};

export type Skill = {
  name: string;
  icon: ImageMetadata;
};

export type LangProps<T extends keyof uiLangSchema> = {
  t: uiLangSchema[T];
};

type SetListEntry = {
  index?: string;
  name?: string;
  details?: string;
  href?: string;
};

type Artist = {
  name: string;
  href: string;
};

export type ShowData = {
  name: string;
  artist: Artist;
  location: string;
  date: Date;
  openers?: Artist[];
  setList: SetListEntry[];
  medias: CarouselMedia[];
};
