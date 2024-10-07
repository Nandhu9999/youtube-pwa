import { useState } from 'react'
import { useYoutubeStore } from '../../store/YoutubeStore'

type VideoInputProps = {
    mode: "direct" | "playlist"
}
function VideoInput({ mode }: VideoInputProps) {
    const [link, setLink] = useState("")
    function submitLink(e: any) {
        e.preventDefault()
        const videoId = useYoutubeStore.getState()._extractYouTubeVideoId(link)
        if (!videoId) {
            alert("video Url failed..");
            return;
        }
        if (mode === "direct") {
            useYoutubeStore.getState().setVideoId(videoId)
            useYoutubeStore.getState().addToHistory(videoId)
        } else if (mode === "playlist") {
            useYoutubeStore.getState().addToPlaylist(videoId)
        }
    }
    console.log(mode)

    return (
        <form onSubmit={submitLink} className="flex gap-2 items-center">

            <input value={link} onChange={(e) => setLink(e.target.value)} type="search" placeholder={"https://youtube.com/v?=xxx"} className="px-2 py-1 rounded-lg border-2 border-brand-main outline-none focus:ring-2 ring-brand-main ring-offset-2 max-w-[300px]" />
            {link !== "" && <button type="submit" className="p-1.5 border-2 border-brand-main aspect-square rounded-lg grid place-content-center outline-none active:scale-95 focus:ring-2 ring-brand-main ring-offset-2">🔍</button>}
        </form>
    )
}

export default VideoInput