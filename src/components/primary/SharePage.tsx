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
        const potentialVideoId = useYoutubeStore.getState()._extractYouTubeVideoId(text);
        if (potentialVideoId) {
            useYoutubeStore.getState().addToHistory(potentialVideoId)
            useYoutubeStore.getState().setVideoId(potentialVideoId)
            navigate("/")
        };
    }, []);

    console.log(data)

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">Share Here</div>

            <div className="mt-4 px-2">
                {data?.title ? (
                    <>
                        <h1 className="font-bold text-center">- Shared Content -</h1>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                            <p>{data.url}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No shared content available.</p>
                )}
            </div>
        </div>
    );
}
