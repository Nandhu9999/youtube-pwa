import { useYoutubeStore } from "../../store/YoutubeStore"
import VideoInput from "../common/VideoInput";
import YoutubeCard from "../common/YoutubeCard";

function PlaylistPage() {
    const playlist = useYoutubeStore((state) => state.playlist);
    console.log(playlist)
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">Playlist!</div>
            <div className="mt-2 text-center text-xl">

            </div>
            <div className="w-11/12 md:w-1/2 text-center text-gray-500 flex flex-col gap-1">
                {playlist.length === 0 ? <>{"No Items found."}</> : <>
                    {playlist.map(item => <YoutubeCard mode={"playlist"} key={item} videoId={item} />)}</>}
            </div>
            <hr className="py-2" />
            <VideoInput mode={"playlist"} />
        </div>
    )
}

export default PlaylistPage