import { create } from "zustand";

type YoutubeStore = {
  videoId: string | null;
  setVideo: (videoUrl: string | null) => void;
  setVideoId: (videoId: string | null) => void;

  history: string[];
  playlist: string[];

  addToHistory: (videoId: string) => void;
  addToPlaylist: (videoId: string) => void;
  removeFromHistory: (videoId: string) => void;
  removeFromPlaylist: (videoId: string) => void;

  _extractYouTubeVideoId: (videoUrl: string) => string | null;
  _getYouTubeMetaData: (videoId: string) => void;
};

export const useYoutubeStore = create<YoutubeStore>((set, get) => ({
  videoId: null,
  history: JSON.parse(localStorage.getItem("history") || "[]"),
  playlist: JSON.parse(localStorage.getItem("playlist") || "[]"),

  setVideoId: (videoId) => set({ videoId }),
  setVideo: (_) => {
    alert("disabled");
    return;
    // console.log(videoUrl);
    // if (videoUrl) {
    //   const videoId = get()._extractYouTubeVideoId(videoUrl);
    //   if (videoId) {
    //     set({ videoId });
    //     get().addToHistory(videoId);
    //   } else {
    //     alert("video Url failed..");
    //   }
    // } else {
    //   set({ videoId: null });
    // }
  },
  addToHistory: (videoId) => {
    let newHistory: string[] = get().history.concat([videoId]);
    newHistory = [...new Set(newHistory)];

    if (newHistory.length > 32) {
      newHistory = newHistory.slice(-32);
    }

    set({ history: newHistory });
    localStorage.setItem("history", JSON.stringify(get().history));
  },
  removeFromHistory: (videoId) => {
    set({ history: get().history.filter((item) => item !== videoId) });
    localStorage.setItem("history", JSON.stringify(get().history));
  },

  addToPlaylist: (videoId) => {
    let newPlaylist: string[] = get().playlist.concat([videoId]);
    newPlaylist = [...new Set(newPlaylist)];

    if (newPlaylist.length > 32) {
      newPlaylist = newPlaylist.slice(-32);
    }

    set({ playlist: newPlaylist });
    localStorage.setItem("playlist", JSON.stringify(get().playlist));
  },
  removeFromPlaylist: (videoId) => {
    set({ playlist: get().playlist.filter((item) => item !== videoId) });
    localStorage.setItem("playlist", JSON.stringify(get().playlist));
  },

  _extractYouTubeVideoId: (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);

    return match ? match[1] : null;
  },

  _getYouTubeMetaData: async (videoId: string) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
      // Fetch the HTML of the YouTube video page
      const response = await fetch(videoUrl);
      const html = await response.text();

      // Create a new DOM parser to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract Open Graph meta tags
      const ogTitle = doc
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content");
      const ogDescription = doc
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content");
      const ogImage = doc
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content");
      const ogUrl = doc
        .querySelector('meta[property="og:url"]')
        ?.getAttribute("content");

      // Return the extracted metadata
      const details = {
        title: ogTitle,
        description: ogDescription,
        thumbnail: ogImage,
        url: ogUrl,
      };
      console.log(details);
    } catch (error) {
      console.error("Error fetching video metadata:", error);
    }
  },
}));
