import type { uiLangSchema } from "./i18n/ui";

export type MusicDataType = {
  isListening: boolean;
  track?: {
    artist: string;
    album: string;
    name: string;
    image: string;
    url: string;
  };
};

export type ProjectType = {
  name: string;
  description: string;
  url: string;
};

export type Skill = {
  name: string;
  icon: ImageMetadata;
};

export type LangProps<T extends keyof uiLangSchema> = {
  t: uiLangSchema[T];
};
