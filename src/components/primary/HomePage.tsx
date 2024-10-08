import { useEffect, useRef, useState } from "react"
import { useYoutubeStore } from "../../store/YoutubeStore"
import YouTube from "react-youtube"
import VideoInput from "../common/VideoInput"

function HomePage() {
    const [mode, setMode] = useState<"direct" | "playlist">("direct")

    const videoId = useYoutubeStore((state) => state.videoId)
    const playlist = useYoutubeStore((state) => state.playlist)

    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto pb-4">
            {
                videoId
                    ? <VideoPlayer videoIds={mode === "direct"
                        ? [videoId]
                        : mode === "playlist"
                            ? playlist
                            : []
                    }
                    />
                    : <GeneralInfo />
            }
            <div className="w-1/2 text-center text-gray-500 gap-2 flex flex-col items-center">
                <span>
                    {"Insert a youtube link below to play the video."}
                </span>
                <label>
                    Use Playlist?
                    <input type="checkbox" onChange={(e: any) => setMode(e.target.checked ? "playlist" : "direct")} className="mx-2 accent-red-500" />
                </label>
                <VideoInput mode={"direct"} />
            </div>
        </div>
    )
}

function GeneralInfo() {
    return (
        <>
            <div className="text-3xl font-bold">Hello!</div>
            <div className="mt-2 text-center text-xl">
                {"Welcome to a Youtube Progressive Web App (PWA)."}
            </div>
        </>
    );
}

type VideoPlayerProps = {
    videoIds: string[];
};

function VideoPlayer({ videoIds }: VideoPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const playerRef = useRef<any>(null);

    const handleVideoEnd = () => {
        if (currentIndex < videoIds.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1); // Go to the next video
        } else {
            setCurrentIndex(0); // Optionally loop back to the first video
        }
    };

    useEffect(() => {
        // If you want the next video to automatically play when changing index
        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    }, [currentIndex]);

    return (
        <div className="w-full p-2">
            <YouTube
                videoId={videoIds[currentIndex]}
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                        autoplay: 1,
                        playsinline: 1,
                    },
                }}
                className="w-full aspect-video rounded"
                onReady={(event: any) => {
                    playerRef.current = event.target;
                }}
                onEnd={handleVideoEnd}
            />
        </div>
    );
}

export default HomePage