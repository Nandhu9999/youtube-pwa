import { useEffect, useRef, useState } from "react"
import { useYoutubeStore } from "../../store/YoutubeStore"
import YouTube from "react-youtube"
import VideoInput from "../common/VideoInput"

type YoutubeState = {
    paused: boolean,
    currentTimestamp: number;
}

function HomePage() {
    const [mode, setMode] = useState<"direct" | "playlist">("direct")

    const [count, setCount] = useState(0)

    const videoId = useYoutubeStore((state) => state.videoId)
    const playlist = useYoutubeStore((state) => state.playlist)

    const [isMobile, setIsMobile] = useState(false);
    const [isDoubleVid, setIsDoubleVid] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [YTState, setYTState] = useState<YoutubeState>({ paused: false, currentTimestamp: 0 })


    function triggerReset() {
        setCount((prev) => prev + 1)
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto pb-4">
            {
                videoId
                    ? <>
                        {isMobile && isDoubleVid && <VideoPlayer
                            YTState={YTState}
                            inverted
                            muted
                            videoIds={mode === "direct"
                                ? [videoId]
                                : mode === "playlist"
                                    ? playlist
                                    : []
                            }
                        />}
                        <VideoPlayer
                            YTState={YTState}
                            showControls
                            setYTState={setYTState}
                            videoIds={mode === "direct"
                                ? [videoId]
                                : mode === "playlist"
                                    ? playlist
                                    : []
                            }
                        />
                    </>
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
                {isMobile && <label>
                    Is Double?
                    <input type="checkbox" onChange={(e: any) => setIsDoubleVid(e.target.checked)} className="mx-2 accent-red-500" />
                </label>}
                <button onClick={triggerReset} className="px-2 text-white rounded-md bg-brand-main/50 border-2 border-black/50">RESET COUNTER {"(" + count + ")"}</button>

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
    inverted?: boolean;
    muted?: boolean;
    showControls?: boolean;
    YTState: YoutubeState,
    setYTState?: any;
};

function VideoPlayer({ videoIds, inverted, muted, showControls, YTState }: VideoPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const playerRef = useRef<any>(null);

    const handleVideoEnd = () => {
        if (currentIndex < videoIds.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    useEffect(() => {

        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    }, [currentIndex]);

    useEffect(() => {
        playerRef.current
    }, [YTState])


    return (
        <div className={`w-full p-2 relative ${inverted ? "rotate-180" : ""}`}>
            {inverted && <div className="w-full h-full absolute top-0 left-0 z-50 "></div>}
            <YouTube
                videoId={videoIds[currentIndex]}
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                        autoplay: 1,
                        playsinline: 1,
                        controls: showControls ? 1 : 0,
                    },
                }}
                className="w-full aspect-video rounded"
                onReady={(event: any) => {
                    playerRef.current = event.target;
                    if (muted) { playerRef.current.mute(); }
                }}
                onEnd={handleVideoEnd}
            />
        </div>
    );
}

export default HomePage