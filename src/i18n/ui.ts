export const languages = {
  en: "English",
  fr: "Français"
};

export const defaultLang = "fr";

export type uiLangSchema = {
  landing: {
    work: string;
  };
  aboutme: {
    title: string;
    hi: string;
    description: string;
  };
  skills: {
    title: string;
    proglang: string;
    tools: string;
  };
  projects: {
    title: string;
    jellyhubdesc: string;
    mcjardesc: string;
  };
  contact: {
    title: string;
    form: {
      fields: {
        name: {
          placeholder: string;
          label: string;
        };
        email: {
          placeholder: string;
          label: string;
        };
        subject: {
          placeholder: string;
          label: string;
        };
        message: {
          placeholder: string;
          label: string;
        };
      };
      submitButton: {
        base: string;
        submitting: string;
      };
      submitMessages: {
        ok: string;
        rateLimit: string;
        error: string;
      };
    };
  };
  listener: {
    artistBy: string;
  };
};

export const ui = {
  fr: {
    landing: {
      work: "Étudiant en Informatique"
    },
    aboutme: {
      title: "À propos de moi",
      hi: "Salut, moi c'est",
      description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet
    cursus turpis non rutrum. Morbi magna lacus, elementum et quam ac, ultrices
    interdum urna. Nunc lacinia risus vitae bibendum iaculis. Maecenas massa
    nibh, convallis quis ultrices nec, pharetra eget sem. In lectus urna, mollis
    at auctor ac, pretium id felis. Aenean vehicula sit amet neque ac venenatis.
    Vestibulum suscipit laoreet mauris a mattis. Proin et augue neque. Proin
    scelerisque mauris lacus, eget tempus velit laoreet vel. Nam pellentesque
    dui vel metus commodo, vitae sodales magna elementum. Aenean id malesuada
    lectus. Nunc a justo scelerisque, iaculis est sed, aliquam tortor. Sed
    pellentesque egestas dui, in ullamcorper dui. Nulla fringilla, arcu sed
    mollis bibendum, orci urna fermentum orci, vel viverra enim dui ut lacus.`
    },
    skills: {
      title: "Ce que j'aime utiliser",
      proglang: "Languages de Programmation",
      tools: "Outils et Autres"
    },
    projects: {
      title: "Projets",
      jellyhubdesc:
        "Une application web qui indexe les médias de plusieurs serveurs Jellyfin dans un seul et unique endroit, vous permettant de voir quel serveur héberge le contenu que vous recherchez.",
      mcjardesc:
        "Un outil en CLI permettant de télécharger facilement des JAR pour Minecraft, comme les serveurs ou des addons (plugins, mods, modpacks, datapacks)."
    },
    contact: {
      title: "Contact",
      form: {
        fields: {
          name: {
            placeholder: "Nom",
            label: "Nom"
          },
          email: {
            placeholder: "Email",
            label: "Email"
          },
          subject: {
            placeholder: "Objet",
            label: "Objet"
          },
          message: {
            placeholder: "Message",
            label: "Message"
          }
        },
        submitButton: {
          base: "Envoyer le Message",
          submitting: "Envoie du Message... "
        },
        submitMessages: {
          ok: "Message envoyé avec succés !",
          rateLimit: "Trop de messages envoyés, réessayez plus tard.",
          error: "Impossible d'envoyer le message, réessayez plus tard."
        }
      }
    },
    listener: {
      artistBy: "De"
    }
  } satisfies uiLangSchema,
  en: {
    landing: {
      work: "Computer Science Student"
    },
    aboutme: {
      title: "About me",
      hi: "Hi, I'm",
      description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet
    cursus turpis non rutrum. Morbi magna lacus, elementum et quam ac, ultrices
    interdum urna. Nunc lacinia risus vitae bibendum iaculis. Maecenas massa
    nibh, convallis quis ultrices nec, pharetra eget sem. In lectus urna, mollis
    at auctor ac, pretium id felis. Aenean vehicula sit amet neque ac venenatis.
    Vestibulum suscipit laoreet mauris a mattis. Proin et augue neque. Proin
    scelerisque mauris lacus, eget tempus velit laoreet vel. Nam pellentesque
    dui vel metus commodo, vitae sodales magna elementum. Aenean id malesuada
    lectus. Nunc a justo scelerisque, iaculis est sed, aliquam tortor. Sed
    pellentesque egestas dui, in ullamcorper dui. Nulla fringilla, arcu sed
    mollis bibendum, orci urna fermentum orci, vel viverra enim dui ut lacus.`
    },
    skills: {
      title: "What i like to use",
      proglang: "Programming Languages",
      tools: "Tools & Others"
    },
    projects: {
      title: "Projects",
      jellyhubdesc:
        "A web app that indexes media from multiple Jellyfin servers into a single searchable hub, letting you see which server hosts the content you're looking for.",
      mcjardesc:
        "A cli tool that allow you to easily download jar for minecraft as server software and addons (plugins, mods, modpacks, datapacks)"
    },
    contact: {
      title: "Contact",
      form: {
        fields: {
          name: {
            placeholder: "Name",
            label: "Name"
          },
          email: {
            placeholder: "Email",
            label: "Email"
          },
          subject: {
            placeholder: "Subject",
            label: "Subject"
          },
          message: {
            placeholder: "Message",
            label: "Message"
          }
        },
        submitButton: {
          base: "Send Message",
          submitting: "Sending Message..."
        },
        submitMessages: {
          ok: "Successfully send message !",
          rateLimit: "Too much messages send, try again later !",
          error: "Failed to send message, try again later."
        }
      }
    },
    listener: {
      artistBy: "By"
    }
  } satisfies uiLangSchema
} as const;
