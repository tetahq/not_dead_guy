import React, { useEffect, useRef } from 'react'
export default function Video({ src, isPlay } : {src: string, isPlay?: boolean}) {
    const refVideo = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!refVideo.current || typeof isPlay === 'undefined') {
            return;
        }

        !isPlay ? refVideo.current?.pause() : refVideo.current?.play()
    },[isPlay])

    return (
        <video width="100%" height="auto" controls={false} autoPlay={false} playsInline muted={false} loop ref={refVideo} >
            <source src={src} type="video/mp4" />
        </video>
);
}
