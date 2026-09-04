import { apiUrl } from "../lib/api";
import type { ShowData } from "../types";

import LP0 from "../images/shows/lp-fzwt-lyon-2026-06-16/0.jpg";
import LP1 from "../images/shows/lp-fzwt-lyon-2026-06-16/1.jpg";
import LP2 from "../images/shows/lp-fzwt-lyon-2026-06-16/2.jpg";
import LP3 from "../images/shows/lp-fzwt-lyon-2026-06-16/3.jpg";
import LP4 from "../images/shows/lp-fzwt-lyon-2026-06-16/4.jpg";
import LP5 from "../images/shows/lp-fzwt-lyon-2026-06-16/5.jpg";
import LP6 from "../images/shows/lp-fzwt-lyon-2026-06-16/6.jpg";
import LP7 from "../images/shows/lp-fzwt-lyon-2026-06-16/7.jpg";
import LP8 from "../images/shows/lp-fzwt-lyon-2026-06-16/8.jpg";
import LP9 from "../images/shows/lp-fzwt-lyon-2026-06-16/9.jpg";
import LP10 from "../images/shows/lp-fzwt-lyon-2026-06-16/10.jpg";

import GAGA0 from "../images/shows/gaga-mayhem-ball-paris-2025-11-22/0.jpg";
import GAGA1 from "../images/shows/gaga-mayhem-ball-paris-2025-11-22/1.jpg";

const shows = [
  {
    name: "From Zero World Tour",
    artist: {
      name: "Linkin Park",
      href: "https://www.last.fm/music/Linkin+Park"
    },
    location: "Groupama Stadium, Lyon",
    date: new Date("2026-06-16"),
    openers: [
      {
        name: "Phantogram",
        href: "https://www.last.fm/music/Phantogram"
      },
      {
        name: "Last Train",
        href: "https://www.last.fm/music/Last+Train"
      }
    ],
    setList: [
      {
        name: "Robot Rock",
        details: "Pre Show, Daft Punk Song",
        href: "https://www.last.fm/fr/music/Daft+Punk/_/Robot+Rock"
      },
      {
        index: "Act 1",
        name: "Inception Intro A"
      },
      {
        index: "1",
        name: "The Emptiness Machine",
        href: "https://www.last.fm/music/Linkin+Park/_/The+Emptiness+Machine"
      },
      {
        index: "2",
        name: "Lying From You",
        href: "https://www.last.fm/music/Linkin+Park/_/Lying+From+You"
      },
      {
        index: "3",
        name: "Up From The Bottom",
        href: "https://www.last.fm/music/Linkin+Park/_/Up+From+The+Bottom"
      },
      {
        index: "4",
        name: "Points of Authority",
        href: "https://www.last.fm/music/Linkin+Park/_/Points+of+Authority"
      },
      {
        index: "5",
        name: "Somewhere I Belong",
        href: "https://www.last.fm/music/Linkin+Park/_/Somewhere+I+Belong"
      },
      {
        index: "Act 2",
        name: "Creation Intro A"
      },
      {
        index: "6",
        name: "The Catalyst",
        href: "https://www.last.fm/music/Linkin+Park/_/The+Catalyst"
      },
      {
        index: "7",
        name: "Burn It Down",
        href: "https://www.last.fm/music/Linkin+Park/_/Burn+It+Down"
      },
      {
        index: "8",
        name: "Over Each Other",
        href: "https://www.last.fm/music/Linkin+Park/_/Over+Each+Other"
      },
      {
        index: "9",
        name: "Where'd You Go",
        href: "https://www.last.fm/music/Fort+Minor/_/Where%27d+You+Go+(feat.+Holly+Brook+&+Jonah+Matranga)"
      },
      {
        index: "10",
        name: "Waiting For The End",
        href: "https://www.last.fm/music/Linkin+Park/_/Waiting+For+The+End"
      },
      {
        index: "11",
        name: "A Place For My Head",
        href: "https://www.last.fm/music/Linkin+Park/_/A+Place+For+My+Head"
      },
      {
        index: "12",
        name: "Two Faced",
        href: "https://www.last.fm/music/Linkin+Park/_/Two+Faced"
      },
      {
        index: "13",
        name: "Joe Solo"
      },
      {
        name: "Empty Spaces",
        href: "https://www.last.fm/music/Linkin+Park/_/Empty+Spaces"
      },
      {
        index: "14",
        name: "When They Come For Me / Remember The Name"
      },
      {
        index: "15",
        name: "IGYEIH",
        href: "https://www.last.fm/music/Linkin+Park/_/IGYEIH"
      },
      {
        index: "16",
        name: "One Step Closer",
        href: "https://www.last.fm/music/Linkin+Park/_/One+Step/Closer"
      },
      {
        index: "Act 3",
        name: "Break/Collapse Transition"
      },
      {
        index: "17",
        name: "Lost",
        details: "Piano Version",
        href: "https://www.last.fm/music/Linkin+Park/_/Lost"
      },
      {
        index: "18",
        name: "Breaking The Habit",
        href: "https://www.last.fm/music/Linkin+Park/_/Breaking+The+Habit"
      },
      {
        index: "19",
        name: "Let You Fade",
        href: "https://www.last.fm/music/Linkin+Park/_/Let+You+Fade"
      },
      {
        index: "20",
        name: "What I've Done",
        href: "https://www.last.fm/music/Linkin+Park/_/What+I've+Done"
      },
      {
        index: "Act 4",
        name: "Kintsugi Transition"
      },
      {
        index: "21",
        name: "Overflow",
        href: "https://www.last.fm/music/Linkin+Park/_/Overflow"
      },
      {
        index: "22",
        name: "Lost In The Echo",
        href: "https://www.last.fm/music/Linkin+Park/_/Lost+In+The_Echo"
      },
      {
        index: "23",
        name: "Numb",
        href: "https://www.last.fm/music/Linkin+Park/_/Numb"
      },
      {
        index: "24",
        name: "Everybody Wants To Rule The World",
        href: "https://www.last.fm/music/Tears+For+Fears/_/Everybody+Wants+To+Rule+The+World"
      },
      {
        index: "25",
        name: "Heavy Is The Crown",
        href: "https://www.last.fm/music/Linkin+Park/_/Heavy_Is_The_Crown"
      },
      {
        index: "26",
        name: "Bleed It Out",
        href: "https://www.last.fm/music/Linkin+Park/_/Bleed+It+Out"
      },
      {
        index: "Act 5",
        name: "Resolution Intro A"
      },
      {
        index: "27",
        name: "Papercut",
        href: "https://www.last.fm/music/Linkin+Park/_/Papercut"
      },
      {
        index: "28",
        name: "In The End",
        href: "https://www.last.fm/music/Linkin+Park/_/In+The+End"
      },
      {
        index: "29",
        name: "Faint",
        href: "https://www.last.fm/music/Linkin+Park/_/Faint"
      }
    ],
    medias: [
      {
        metadata: LP0,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP1,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP2,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP3,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP4,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP5,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP6,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP7,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP8,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP9,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: LP10,
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_1/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_2/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_3/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_4/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_5/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      },
      {
        metadata: {
          src: apiUrl("/videos/lp_6/playlist.m3u8")
        },
        alt: "Linkin Park - From Zero World Tour - Groupama Stadium, Lyon - 2026-06-16"
      }
    ]
  },
  {
    name: "Until You're Statisfied Tour",
    artist: {
      name: "Yonaka",
      href: "https://www.last.fm/music/Yonaka"
    },
    location: "La Maroquinerie, Paris",
    date: new Date("2026-06-09"),
    openers: [
      {
        name: "Artio",
        href: "https://www.last.fm/music/Artio"
      },
      {
        name: "Overgrown",
        href: "https://www.last.fm/music/Overgrown"
      }
    ],
    setList: [
      {
        index: "1",
        name: "Eat You Alive",
        href: "https://www.last.fm/fr/music/Yonaka/_/Eat+You+Alive"
      },
      {
        index: "2",
        name: "Hit Me When I'm Sore",
        href: "https://www.last.fm/music/Yonaka/_/Hit+Me+When+I'm+Sore"
      },
      {
        index: "3",
        name: "Miss Millenial",
        href: "https://www.last.fm/music/Yonaka/_/Miss+Millennial"
      },
      {
        index: "4",
        name: "Call Me a Saint",
        href: "https://www.last.fm/music/Yonaka/_/Call+Me+a+Saint"
      },
      {
        index: "5",
        name: "Problems",
        href: "https://www.last.fm/music/Yonaka/_/Problems"
      },
      {
        index: "6",
        name: "Cruel",
        href: "https://www.last.fm/music/Yonaka/_/Cruel"
      },
      {
        index: "7",
        name: "Ordinary",
        href: "https://www.last.fm/music/Yonaka/_/Ordinary"
      },
      {
        index: "8",
        name: "At the Beach",
        href: "https://www.last.fm/music/Yonaka/_/At+the+Beach"
      },
      {
        index: "9",
        name: "Trouble Follows",
        href: "https://www.last.fm/music/Yonaka/_/Trouble+Follows"
      },
      {
        index: "10",
        name: "Stay a Little While Longer",
        href: "https://www.last.fm/music/Yonaka/_/Stay+a+Little+While+Longer"
      },
      {
        index: "11",
        name: "Do It For You",
        details: "Accoustic Version",
        href: "https://www.last.fm/music/Yonaka/_/Do+It+For+You"
      },
      {
        index: "12",
        name: "Try",
        href: "https://www.last.fm/music/Yonaka/_/Try"
      },
      {
        index: "13",
        name: "Punch Bag",
        href: "https://www.last.fm/music/Yonaka/_/Punch+Bag"
      },
      {
        index: "14",
        name: "Bite the Bullet",
        href: "https://www.last.fm/music/Yonaka/_/Bite+the+Bullet"
      },
      {
        index: "15",
        name: "Clique",
        href: "https://www.last.fm/music/Yonaka/_/Clique"
      },
      {
        index: "16",
        name: "Predator",
        href: "https://www.last.fm/music/Yonaka/_/Predator"
      },
      {
        index: "17",
        name: "Seize the Power",
        href: "https://www.last.fm/music/Yonaka/_/Seize+the+Power"
      }
    ],
    medias: [
      {
        metadata: {
          src: apiUrl("/videos/yonaka_1/playlist.m3u8")
        },
        alt: "Yonaka - Until You're Statisfied Tour - La Maroquinerie, Paris - 2026-06-09"
      },
      {
        metadata: {
          src: apiUrl("/videos/yonaka_2/playlist.m3u8")
        },
        alt: "Yonaka - Until You're Statisfied Tour - La Maroquinerie, Paris - 2026-06-09"
      },
      {
        metadata: {
          src: apiUrl("/videos/yonaka_3/playlist.m3u8")
        },
        alt: "Yonaka - Until You're Statisfied Tour - La Maroquinerie, Paris - 2026-06-09"
      }
    ]
  },
  {
    name: "The Manic Dream Tour",
    artist: {
      name: "DeathbyRomy",
      href: "https://www.last.fm/music/DeathbyRomy"
    },
    location: "Les Étoiles, Paris",
    date: new Date("2026-02-15"),
    openers: [
      {
        name: "Jayden Hammer",
        href: "https://www.last.fm/music/Jayden+Hammer"
      },
      {
        name: "KiNG MALA",
        href: "https://www.last.fm/music/KiNG+MALA"
      }
    ],
    setList: [
      {
        index: "1",
        name: "Vicious Bliss",
        href: "https://www.last.fm/fr/music/DeathbyRomy/_/Vicious+Bliss"
      },
      {
        index: "2",
        name: "I Feel Like a God",
        href: "https://www.last.fm/music/DeathbyRomy/_/I+Feel+Like+a+God"
      },
      {
        index: "3",
        name: "I Kill Everything",
        href: "https://www.last.fm/music/DeathbyRomy/_/I+Kill+Everything"
      },
      {
        index: "4",
        name: "Lovesick",
        href: "https://www.last.fm/music/DeathbyRomy/_/Lovesick"
      },
      {
        index: "5",
        name: "No More",
        href: "https://www.last.fm/music/DeathbyRomy/_/No+More"
      },
      {
        index: "6",
        name: "Even if it bleeds",
        href: "https://www.last.fm/music/DeathbyRomy/_/Even+if+it+bleeds"
      },
      {
        index: "7",
        name: "Fuck It",
        href: "https://www.last.fm/music/DeathbyRomy/_/Fuck+It"
      },
      {
        index: "8",
        name: "Hollow",
        details: "Party Favor Cover",
        href: "https://www.last.fm/music/Party+Favor/_/Hollow+(with+DeathbyRomy)"
      },
      {
        index: "9",
        name: "Kiss Me Goodbye",
        href: "https://www.last.fm/music/DeathbyRomy/_/Kiss+Me+Goodbye"
      },
      {
        index: "10",
        name: "Don't Fall For / Hellhound",
        href: "https://www.last.fm/music/DeathbyRomy/_/Hellhound"
      },
      {
        index: "11",
        name: "Crash",
        href: "https://www.last.fm/music/DeathbyRomy/_/Crash"
      },
      {
        index: "12",
        name: "Blackwater",
        href: "https://www.last.fm/music/DeathbyRomy/_/Blackwater"
      },
      {
        index: "13",
        name: "HATE PARTY",
        href: "https://www.last.fm/music/DeathbyRomy/_/HATE+PARTY"
      },
      {
        index: "14",
        name: "Saint",
        href: "https://www.last.fm/music/DeathbyRomy/_/Saint"
      },
      {
        index: "15",
        name: "No Mercy",
        href: "https://www.last.fm/music/DeathbyRomy/_/No+Mercy"
      },
      {
        index: "16",
        name: "Day I Die",
        href: "https://www.last.fm/music/DeathbyRomy/_/Day+I+Die"
      },
      {
        index: "17",
        name: "Problems",
        href: "https://www.last.fm/music/DeathbyRomy/_/Problems"
      }
    ],
    medias: [
      {
        metadata: {
          src: apiUrl("/videos/deathbyromy_1/playlist.m3u8")
        },
        alt: "DeathbyRomy - The Manic Dream Tour - Les Étoiles, Paris - 2026-02-15"
      },
      {
        metadata: {
          src: apiUrl("/videos/deathbyromy_2/playlist.m3u8")
        },
        alt: "DeathbyRomy - The Manic Dream Tour - Les Étoiles, Paris - 2026-02-15"
      },
      {
        metadata: {
          src: apiUrl("/videos/deathbyromy_3/playlist.m3u8")
        },
        alt: "DeathbyRomy - The Manic Dream Tour - Les Étoiles, Paris - 2026-02-15"
      }
    ]
  },
  {
    name: "The Mayhem Ball",
    artist: {
      name: "Lady Gaga",
      href: "https://www.last.fm/music/Lady+Gaga"
    },
    location: "Accor Arena, Paris",
    date: new Date("2025-11-22"),
    setList: [
      {
        index: "Act I",
        name: "The Art of Personal Chaos",
        details: "Of Velvet And Vice"
      },
      {
        index: "1",
        name: "Bloody Mary",
        href: "https://www.last.fm/music/Lady+Gaga/_/Bloody+Mary"
      },
      {
        index: "2",
        name: "Abracadabra",
        href: "https://www.last.fm/music/Lady+Gaga/_/Abracadabra"
      },
      {
        index: "3",
        name: "Judas",
        href: "https://www.last.fm/music/Lady+Gaga/_/Judas"
      },
      {
        index: "4",
        name: "Aura",
        href: "https://www.last.fm/music/Lady+Gaga/_/Aura"
      },
      {
        index: "5",
        name: "Scheiße",
        href: "https://www.last.fm/music/Lady+Gaga/_/Scheiße"
      },
      {
        index: "6",
        name: "Garden Of Eden",
        href: "https://www.last.fm/music/Lady+Gaga/_/Garden+Of+Eden"
      },
      {
        index: "7",
        name: "Poker Face",
        href: "https://www.last.fm/music/Lady+Gaga/_/Poker+Face"
      },
      {
        index: "Act II",
        name: "Abracadabra (Gesaffelstein Remix)",
        details: "And She Fell Into A Gothic Dream",
        href: "https://www.last.fm/music/Lady+Gaga+&+Gesaffelstein/_/Abracadabra+(Gesaffelstein+Remix)"
      },
      {
        index: "8",
        name: "Perfect Illusion",
        href: "https://www.last.fm/music/Lady+Gaga/_/Perfect+Illusion"
      },
      {
        index: "9",
        name: "Disease",
        href: "https://www.last.fm/music/Lady+Gaga/_/Disease"
      },
      {
        index: "10",
        name: "Paparazzi",
        href: "https://www.last.fm/music/Lady+Gaga/_/Paparazzi"
      },
      {
        index: "11",
        name: "LoveGame",
        href: "https://www.last.fm/music/Lady+Gaga/_/LoveGame"
      },
      {
        index: "12",
        name: "Alejandro",
        href: "https://www.last.fm/music/Lady+Gaga/_/Alejandro"
      },
      {
        index: "13",
        name: "The Beast",
        href: "https://www.last.fm/music/Lady+Gaga/_/The+Beast"
      },
      {
        index: "Act III",
        details: "The Beautiful Nightmare That Knows Her Name"
      },
      {
        index: "14",
        name: "Killah",
        href: "https://www.last.fm/music/Lady+Gaga/_/Killah"
      },
      {
        index: "15",
        name: "Zombieboy",
        href: "https://www.last.fm/music/Lady+Gaga/_/Zombieboy"
      },
      {
        index: "16",
        name: "The Dead Dance",
        href: "https://www.last.fm/music/Lady+Gaga/_/The+Dead+Dance"
      },
      {
        index: "17",
        name: "LoveDrug",
        href: "https://www.last.fm/music/Lady+Gaga/_/LoveDrug"
      },
      {
        index: "18",
        name: "Applause",
        href: "https://www.last.fm/music/Lady+Gaga/_/Applause"
      },
      {
        index: "19",
        name: "Just Dance",
        href: "https://www.last.fm/music/Lady+Gaga/_/Just+Dance"
      },
      {
        index: "Act IV",
        name: "Wake Her Up !",
        details: "Every Chess Board Has Two Queens"
      },
      {
        index: "20",
        name: "Shadow of a Man",
        href: "https://www.last.fm/music/Lady+Gaga/_/Shadow+of+a+Man"
      },
      {
        index: "21",
        name: "Kill for Love",
        href: "https://www.last.fm/music/Lady+Gaga/_/Kill+for+Love"
      },
      {
        index: "22",
        name: "Summerboy",
        href: "https://www.last.fm/music/Lady+Gaga/_/Summerboy"
      },
      {
        index: "23",
        name: "Born This Way",
        href: "https://www.last.fm/music/Lady+Gaga/_/Born+This+Way"
      },
      {
        index: "24",
        name: "Million Reasons",
        href: "https://www.last.fm/music/Lady+Gaga/_/Million+Reasons"
      },
      {
        index: "25",
        name: "Shallow",
        href: "https://www.last.fm/music/Lady+Gaga/A+Star+Is+Born+Soundtrack/Shallow"
      },
      {
        index: "26",
        name: "Die With A Smile",
        href: "https://www.last.fm/music/Lady+Gaga/_/Die+With+A+Smile"
      },
      {
        index: "27",
        name: "Is That Alright ?",
        href: "https://www.last.fm/music/Lady+Gaga/_/Is+That+Alright%3F"
      },
      {
        index: "28",
        name: "Dance in the Dark",
        href: "https://www.last.fm/music/Lady+Gaga/_/Dance+in+the+Dark"
      },
      {
        index: "29",
        name: "The Edge of Glory",
        href: "https://www.last.fm/music/Lady+Gaga/_/The+Edge+of+Glory"
      },
      {
        index: "30",
        name: "Vanish Into You",
        href: "https://www.last.fm/music/Lady+Gaga/_/Vanish+Into+You"
      },
      {
        index: "Finale",
        details: "Eternal Aria of the Monster Heart"
      },
      {
        index: "31",
        name: "Bad Romance",
        href: "https://www.last.fm/music/Lady+Gaga/_/Bad+Romance"
      },
      {
        index: "32",
        name: "How Bad Do U Want Me",
        href: "https://www.last.fm/music/Lady+Gaga/_/How+Bad+Do+U+Want+Me"
      },
      {
        index: "33",
        name: "La Vie en rose",
        details: "Édith Piaf Cover",
        href: "https://www.last.fm/music/Edith+Piaf/_/La+Vie+en+rose"
      }
    ],
    medias: [
      {
        metadata: GAGA0,
        alt: "Lady Gaga - The Mayhem Ball - Accor Arena, Paris - 2025-11-22"
      },
      {
        metadata: GAGA1,
        alt: "Lady Gaga - The Mayhem Ball - Accor Arena, Paris - 2025-11-22"
      }
    ]
  },
  {
    name: "From Zero World Tour",
    artist: {
      name: "Linkin Park",
      href: "https://www.last.fm/music/Linkin+Park"
    },
    location: "Paris La Défense Arena, Nanterre",
    date: new Date("2024-11-03"),
    openers: [
      {
        name: "Sleep Token",
        href: "https://www.last.fm/music/Sleep+Token"
      }
    ],
    setList: [
      {
        index: "Act 1",
        name: "Inception Intro A"
      },
      {
        index: "1",
        name: "Somewhere I Belong",
        href: "https://www.last.fm/music/Linkin+Park/_/Somewhere+I+Belong"
      },
      {
        index: "2",
        name: "Crawling",
        href: "https://www.last.fm/music/Linkin+Park/_/Crawling"
      },
      {
        index: "3",
        name: "Points of Authority",
        href: "https://www.last.fm/music/Linkin+Park/_/Points+of+Authority"
      },
      {
        index: "4",
        name: "Lying From You",
        href: "https://www.last.fm/music/Linkin+Park/_/Lying+From+You"
      },
      {
        index: "5",
        name: "New Divide",
        href: "https://www.last.fm/music/Linkin+Park/_/New+Divide"
      },
      {
        index: "6",
        name: "The Emptiness Machine",
        href: "https://www.last.fm/music/Linkin+Park/_/The+Emptiness+Machine"
      },
      {
        index: "Act 2",
        name: "Creation Intro A"
      },
      {
        index: "7",
        name: "The Catalyst",
        href: "https://www.last.fm/music/Linkin+Park/_/The+Catalyst"
      },
      {
        index: "8",
        name: "Burn It Down",
        href: "https://www.last.fm/music/Linkin+Park/_/Burn+It+Down"
      },
      {
        index: "9",
        name: "Waiting For The End",
        href: "https://www.last.fm/music/Linkin+Park/_/Waiting+For+The+End"
      },
      {
        index: "10",
        name: "Castle of Glass",
        href: "https://www.last.fm/music/Linkin+Park/_/Castle+of+Glass"
      },
      {
        index: "11",
        name: "Joe Hahn Solo"
      },
      {
        name: "Empty Spaces",
        href: "https://www.last.fm/music/Linkin+Park/_/Empty+Spaces"
      },
      {
        index: "12",
        name: "When They Come For Me / Remember The Name"
      },
      {
        index: "13",
        name: "Over Each Other",
        href: "https://www.last.fm/music/Linkin+Park/_/Over+Each+Other"
      },
      {
        index: "14",
        name: "Lost in the Echo",
        href: "https://www.last.fm/music/Linkin+Park/_/Lost+In+The+Echo"
      },
      {
        index: "15",
        name: "Given Up",
        href: "https://www.last.fm/music/Linkin+Park/_/Given+Up"
      },
      {
        index: "16",
        name: "One Step Closer",
        href: "https://www.last.fm/music/Linkin+Park/_/One+Step+Closer"
      },
      {
        index: "Act 3",
        name: "Collapse"
      },
      {
        index: "17",
        name: "Lost",
        details: "Piano Version",
        href: "https://www.last.fm/music/Linkin+Park/_/Lost"
      },
      {
        index: "18",
        name: "Breaking The Habit",
        href: "https://www.last.fm/music/Linkin+Park/_/Breaking+The+Habit"
      },
      {
        index: "19",
        name: "What I've Done",
        href: "https://www.last.fm/music/Linkin+Park/_/What+I've+Done"
      },
      {
        index: "Act 4",
        name: "Kintsugi"
      },
      {
        index: "20",
        name: "Leave Out All the Rest",
        href: "https://www.last.fm/music/Linkin+Park/_/Leave+Out+All+the+Rest"
      },
      {
        index: "21",
        name: "My December",
        href: "https://www.last.fm/music/Linkin+Park/_/My+December"
      },
      {
        index: "22",
        name: "Friendly Fire",
        href: "https://www.last.fm/music/Linkin+Park/_/Friendly+Fire"
      },
      {
        index: "23",
        name: "Numb",
        href: "https://www.last.fm/music/Linkin+Park/_/Numb"
      },
      {
        index: "24",
        name: "Heavy Is The Crown",
        href: "https://www.last.fm/music/Linkin+Park/_/Heavy+Is+The+Crown"
      },
      {
        index: "25",
        name: "Bleed It Out",
        href: "https://www.last.fm/music/Linkin+Park/_/Bleed+It+Out"
      },
      {
        index: "Encore",
        name: "Resolution Intro A"
      },
      {
        index: "26",
        name: "Papercut",
        href: "https://www.last.fm/music/Linkin+Park/_/Papercut"
      },
      {
        index: "27",
        name: "In The End",
        href: "https://www.last.fm/music/Linkin+Park/_/In+The+End"
      },
      {
        index: "28",
        name: "Faint",
        href: "https://www.last.fm/music/Linkin+Park/_/Faint"
      }
    ],
    medias: [
      {
        metadata: { src: apiUrl("/videos/lp_1_2024/playlist.m3u8") },
        alt: "Linkin Park - From Zero World Tour - Paris La Défense Arena, Nanterre - 2024-11-03"
      },
      {
        metadata: { src: apiUrl("/videos/lp_2_2024/playlist.m3u8") },
        alt: "Linkin Park - From Zero World Tour - Paris La Défense Arena, Nanterre - 2024-11-03"
      }
    ]
  }
] satisfies ShowData[];

export default shows;
