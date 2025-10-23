import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import OverlayVideo from "@/components/OverlayVideo";

const GCLayout = ({children}) => {
    const flamesConfig = [  { bottom: "23vh", x: 29, scale: 1.0 },  //arriba
                            { bottom: "31vh", x: 33, scale: 0.8 },  //medio
                            { bottom: "38vh", x: 36, scale: 0.6 }   //abajo
                        ];
    const [overlayReady, setOverlayReady] = useState(false);
    const [imagesReady, setImagesReady] = useState(false);
    const [flamesVisible, setFlamesVisible] = useState(Array(flamesConfig.length).fill(false));
    const [backgroundImage, setBackgroundImage] = useState("/images/fondo.jpg");
    const [showBlackScreen, setShowBlackScreen] = useState(true);
    const [blackFadeOut, setBlackFadeOut] = useState(false);

    const videoRef = useRef(null);
    const canvasRefsLeft = useRef([]);
    const canvasRefsRight = useRef([]);
    const animationRef = useRef(null);

    // precargamo img
    useEffect(() => {
        const imagePaths = ["/images/fondo.jpg", "/images/fondo1.jpg", "/images/fondo2.jpg", "/images/fondo3.jpg"];
        let loadedImagesCount = 0;
        imagePaths.forEach((src) => {
            const img = new Image();
            img.onload = () => {
                loadedImagesCount++;
                if (loadedImagesCount === imagePaths.length) {
                    setImagesReady(true);
                }
            };
            img.src = src;
        });
    }, []);

    // aca esta la magia del cine
    useEffect(() => {
        if (overlayReady && imagesReady){
            // fade pantalla negra
            setTimeout(() => {
                setBlackFadeOut(true);
                setTimeout(() => setShowBlackScreen(false), 500); //ms
            }, 100);

            const initialDelay = 1200;
            flamesConfig.forEach((_, flameIndex) => {//_ significa q no se usa, es param obligatorio y solo queremos el index
                setTimeout(() => {
                    setFlamesVisible((prevState) => {
                        const newState = [...prevState];
                        newState[flameIndex] = true;
                        return newState;
                    });
                    setBackgroundImage(`/images/fondo${flameIndex + 1}.jpg`);
                }, initialDelay + flameIndex * 700);
            });
        }
    }, [overlayReady, imagesReady]);

    // dibujamos video en canvas para que no se mate mi pc
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement){
            const startDrawing = () => {
                const allCanvasElements = [...canvasRefsLeft.current, ...canvasRefsRight.current];
                const contextList = allCanvasElements.map((canvasElement) => (canvasElement ? canvasElement.getContext("2d") : null));

                const draw = () => {
                    if (videoElement.readyState >= 2) {
                        contextList.forEach((context) => {
                            if (context) {
                                const { width, height } = context.canvas;
                                context.clearRect(0, 0, width, height);
                                context.drawImage(videoElement, 0, 0, width, height);
                            }
                        });
                    }
                    animationRef.current = requestAnimationFrame(draw);
                };
                animationRef.current = requestAnimationFrame(draw);
            };

            videoElement.play().then(() => startDrawing()).catch(() => {
                videoElement.addEventListener("playing", startDrawing, { once: true });
            });

            return () => cancelAnimationFrame(animationRef.current);
        }
    }, []);

    const renderFlame = (flameConfig, flameNumber, side = "left") => {
        const isLeftSide = side === "left";
        const canvasRefs = isLeftSide ? canvasRefsLeft : canvasRefsRight;
        const horizontalSide = isLeftSide ? "left" : "right";
        const translateXValue = isLeftSide ? "-50%" : "50%";
        const videoSize = `clamp(${120 * flameConfig.scale}px, ${16 * flameConfig.scale}vw, ${240 * flameConfig.scale}px)`;

        return (
            <div key={`${side}-${flameNumber}`} className="absolute pointer-events-none" style={{ bottom: flameConfig.bottom, [horizontalSide]: `${flameConfig.x}vw`, transform: `translateX(${translateXValue})`, width: videoSize, height: videoSize }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <img src="/images/backgroundTorch.png" alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "auto", zIndex: 1, pointerEvents: "none" }} />
                    <canvas ref={(flame) => (canvasRefs.current[flameNumber] = flame)} width={240} height={240} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "100%", height: "auto", mixBlendMode: "screen", opacity: flamesVisible[flameNumber] ? 1 : 0, transition: "opacity 0.5s ease-in" }} />
                    <motion.div className="absolute rounded-full" style={{ width: "100%", height: "100%", top: 0, left: 0, zIndex: 9999, background: "radial-gradient(circle, rgba(255,0,0,0.4) 0%, rgba(255,140,0,0.15) 45%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none", opacity: flamesVisible[flameNumber] ? 1 : 0 }} animate={flamesVisible[flameNumber] ? { opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] } : {}} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                </div>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {showBlackScreen && <div className={`fixed inset-0 bg-black z-[99999] transition-opacity duration-500 ${blackFadeOut ? "opacity-0" : "opacity-100"}`} />}
            <OverlayVideo onReady={() => setOverlayReady(true)} />
            <video ref={videoRef} src="/videos/flames.webm" muted loop playsInline style={{ display: "none" }} preload="auto" disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" disableRemotePlayback />
            <div className="absolute inset-0 z-0 bg-no-repeat bg-center" style={{ backgroundImage: `url("${backgroundImage}")`, backgroundSize: "100% 100vh", backgroundPosition: "center top" }} />
            {flamesConfig.map((flameConfig, flameNumber) => (
                <div key={`pair-${flameNumber}`}>
                    {renderFlame(flameConfig, flameNumber, "left")}
                    {renderFlame(flameConfig, flameNumber, "right")}
                </div>
            ))}
            <div className="relative z-30">
                {children}
            </div>
        </div>
    );
};

export default GCLayout;
