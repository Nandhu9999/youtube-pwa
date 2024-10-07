import { useState } from "react"
import { useYoutubeStore } from "../../store/YoutubeStore"
import YouTube from "react-youtube"

function HomePage() {
    const videoId = useYoutubeStore((state) => state.videoId)
    const [link, setLink] = useState("")
    function submitLink(e: any) {
        e.preventDefault()
        useYoutubeStore.getState().setVideo(link)
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto pb-4">
            {
                videoId
                    ? <VideoPlayer videoId={videoId} />
                    : <GeneralInfo />
            }
            <div className="w-1/2 text-center text-gray-500 gap-2 flex flex-col items-center">
                <span>
                    {"Insert a youtube link below to play the video."}
                </span>
                <form onSubmit={submitLink} className="flex gap-2 items-center">

                    <input value={link} onChange={(e) => setLink(e.target.value)} type="search" placeholder={"https://youtube.com/v?=xxx"} className="px-2 py-1 rounded-lg border-2 border-brand-main outline-none focus:ring-2 ring-brand-main ring-offset-2 max-w-[300px]" />
                    {link !== "" && <button type="submit" className="p-1.5 border-2 border-brand-main aspect-square rounded-lg grid place-content-center outline-none active:scale-95 focus:ring-2 ring-brand-main ring-offset-2">🔍</button>}
                </form>
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
    videoId: string;
}
function VideoPlayer({ videoId }: VideoPlayerProps) {
    return (
        <div className="w-full p-2">
            <YouTube videoId={videoId} opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                    autoplay: 1,
                }
            }} className="w-full aspect-video rounded" />
        </div>
    );
}

export default HomePage