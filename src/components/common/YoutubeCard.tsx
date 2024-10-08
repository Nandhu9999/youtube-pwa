import { useNavigate } from "react-router-dom";
import { useYoutubeStore } from "../../store/YoutubeStore";

type YoutubeCardProps = {
    mode: "direct" | "playlist";
    videoId: string;
}
function YoutubeCard({ mode, videoId }: YoutubeCardProps) {
    const navigate = useNavigate();
    function watchAgain() {
        console.log("playing", videoId)
        useYoutubeStore.getState().setVideoId(videoId);
        navigate("/")
    }
    function removeVideo() {
        if (mode === "direct") {
            useYoutubeStore.getState().removeFromHistory(videoId)
        } else if (mode === "playlist") {
            useYoutubeStore.getState().removeFromPlaylist(videoId)
        }
    }
    function getVideoInfo() {
        useYoutubeStore.getState()._getYouTubeMetaData(videoId)
    }

    return (<div className=" w-full h-16 rounded-lg p-2 divide-y-4 divide-black/0 bg-black/50 text-white">
        <div onClick={watchAgain} className="bg-black/50 rounded-md cursor-pointer">
            <span className="font-bold">Video ID:</span>{" " + videoId}
        </div>
        <div className="flex flex-row-reverse flex-start w-full gap-2">
            <button onClick={removeVideo}>🗑️</button>
            <button onClick={getVideoInfo}>ℹ️</button>
        </div>
    </div>);
}

export default YoutubeCard;