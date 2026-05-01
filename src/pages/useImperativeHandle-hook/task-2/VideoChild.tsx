import {useImperativeHandle, forwardRef, useRef} from "react"

export type refType = {
    pause: () => void,
    start: () => void,
    restart: () => void,
    loop: () => void,
    muted: () => void
}

export type propsType = {
    children: React.ReactNode
}

export const VideoChild = forwardRef<refType, propsType>(({children}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    useImperativeHandle(ref, () => ({
        pause: () => {
            if(!videoRef.current) return
            videoRef.current.pause()
        },
        start: () => {
            if(!videoRef.current) return
            videoRef.current.play()
        },
        restart: () => {
            if(!videoRef.current) return
            // not use load method which leads to hard refresh
            videoRef.current.currentTime = 0
            videoRef.current.play()
        },
        loop: () => {
            if(!videoRef.current) return
            videoRef.current.loop = true
        },
        muted: () => {
            if(!videoRef.current) return
            videoRef.current.muted = true
        }
    }), [])

    return <section className="video-container">
        <h2>Show the best movie in the box office for last year</h2>
        <video src="" ref={videoRef} width={600} height={800}>
            Your browser does not support video element
        </video>
        {children}
    </section> 
})