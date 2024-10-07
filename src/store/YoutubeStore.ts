import { create } from "zustand";

type YoutubeStore = {
  videoId: string | null;
  setVideo: (videoUrl: string | null) => void;
  setVideoId: (videoId: string | null) => void;

  history: string[];
  addToHistory: (videoId: string) => void;
  removeFromHistory: (videoId: string) => void;

  _extractYouTubeVideoId: (videoUrl: string) => string | null;
};

export const useYoutubeStore = create<YoutubeStore>((set, get) => ({
  videoId: null,
  history: JSON.parse(localStorage.getItem("history") || "[]"),

  setVideoId: (videoId) => set({ videoId }),
  setVideo: (videoUrl) => {
    console.log(videoUrl);
    if (videoUrl) {
      const videoId = get()._extractYouTubeVideoId(videoUrl);
      if (videoId) {
        set({ videoId });
        get().addToHistory(videoId);
      } else {
        alert("video Url failed..");
      }
    } else {
      set({ videoId: null });
    }
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

  _extractYouTubeVideoId: (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);

    return match ? match[1] : null;
  },
}));
