import {useRef} from "react"
import { type refType, VideoChild } from "./VideoChild"


export const VideoParent = () => {
    const videoControlsRef = useRef<refType>(null)
    return <VideoChild ref={videoControlsRef}>
        <div className="video-controls">
            <h2>Control Buttons</h2>
            <button type="button" onClick={() => videoControlsRef.current?.start()}>Start Video</button>
            <button type="button" onClick={() => videoControlsRef.current?.pause()}>Pause Video</button>
            <button type="button" onClick={() => videoControlsRef.current?.restart()}>Restart Video</button>
            <button type="button" onClick={() => videoControlsRef.current?.loop()}>Turn On Autoplay</button>
            <button type="button" onClick={() => videoControlsRef.current?.muted()}>Mute Video</button>
        </div>
    </VideoChild>
}
