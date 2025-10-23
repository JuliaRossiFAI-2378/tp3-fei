import { useEffect, useRef } from 'react';

export default function OverlayVideo({ onReady }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const handlePlaying = () => {
            onReady?.(); //el overlay espera esto
        };

        video.playbackRate = 0.6;//ts llora si le pongo esto al html directamente
        video.addEventListener("playing", handlePlaying);

        return () => video.removeEventListener("playing", handlePlaying);
    }, [onReady]);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <video
                ref={videoRef}
                id="overlay"
                src="/videos/videoplayback.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover opacity-5 pointer-events-none"
            />
        </div>
    );
}
