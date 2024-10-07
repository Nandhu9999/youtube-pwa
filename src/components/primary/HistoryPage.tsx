import { useNavigate } from "react-router-dom";
import { useYoutubeStore } from "../../store/YoutubeStore"

function HistoryPage() {
    const history = useYoutubeStore((state) => state.history);
    console.log(history)
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">History!</div>
            <div className="mt-2 text-center text-xl">

            </div>
            <hr className="my-4" />
            <div className="mt-4 w-11/12 md:w-1/2 text-center text-gray-500">
                {history.length === 0 ? <>{"No Items found."}</> : <>
                    {history.map(item => <YoutubeCard key={item} videoId={item} />)}</>}
            </div>
        </div>
    )
}

type YoutubeCardProps = {
    videoId: string;
}
function YoutubeCard({ videoId }: YoutubeCardProps) {
    const navigate = useNavigate();
    function watchAgain() {
        console.log("playing", videoId)
        useYoutubeStore.getState().setVideoId(videoId);
        navigate("/")
    }
    function removeVideo() {
        useYoutubeStore.getState().removeFromHistory(videoId)
    }

    return (<div onClick={watchAgain} className="cursor-pointer w-full h-16 rounded-lg p-2 bg-black/50 text-white">
        <div>
            <span className="font-bold">Video ID:</span>{" " + videoId}
        </div>
        <div className="flex flex-row-reverse flex-start w-full">
            <button onClick={removeVideo}>🗑️</button>
        </div>
    </div>);
}

export default HistoryPage