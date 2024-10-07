import { useYoutubeStore } from "../../store/YoutubeStore"
import YoutubeCard from "../common/YoutubeCard";

function HistoryPage() {
    const history = useYoutubeStore((state) => state.history);
    console.log(history)
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">History!</div>
            <div className="mt-2 text-center text-xl">

            </div>
            <div className="w-11/12 md:w-1/2 text-center text-gray-500 flex flex-col gap-1">
                {history.length === 0 ? <>{"No Items found."}</> : <>
                    {history.map(item => <YoutubeCard mode={"direct"} key={item} videoId={item} />)}</>}
            </div>
        </div>
    )
}


export default HistoryPage