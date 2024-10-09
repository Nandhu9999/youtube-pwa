import { useEffect, useState } from "react";
import { useYoutubeStore } from "../../store/YoutubeStore";
import { useNavigate } from "react-router-dom";

export default function SharePage() {
    const [data, setData] = useState<{
        title: string;
        text: string;
        url: string;
    } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const title = queryParams.get("title") || "";
        const text = queryParams.get("text") || "";
        const url = queryParams.get("url") || "";
        setData({
            title: title,
            text: text,
            url: url,
        });
    }, []);

    function playDirectly() {
        if (data == null || data.text == "") return;
        const potentialVideoId = useYoutubeStore.getState()._extractYouTubeVideoId(data.text);
        if (!potentialVideoId) return
        useYoutubeStore.getState().addToHistory(potentialVideoId)
        useYoutubeStore.getState().setVideoId(potentialVideoId)
        navigate("/")
    }
    function addToPlaylist() {
        if (data == null || data.text == "") return;
        const potentialVideoId = useYoutubeStore.getState()._extractYouTubeVideoId(data.text);
        if (!potentialVideoId) return
        useYoutubeStore.getState().addToPlaylist(potentialVideoId)
        navigate("/")
    }



    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">Share Here!</div>

            <div className="mt-4 px-2">
                {data?.title ? (
                    <>
                        <h1 className="font-bold text-center">- Shared Content -</h1>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                            <p>{data.url}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={playDirectly} className="px-2 text-white rounded-md bg-brand-main/50 border-2 border-black/50">Play Directy</button>
                            <button onClick={addToPlaylist} className="px-2 text-white rounded-md bg-brand-main/50 border-2 border-black/50">Add To Playlist</button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No shared content available.</p>
                )}
            </div>
        </div>
    );
}
