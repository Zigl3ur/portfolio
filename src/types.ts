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

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = {
  name: string[];
  email: string[];
  message: string[];
};
