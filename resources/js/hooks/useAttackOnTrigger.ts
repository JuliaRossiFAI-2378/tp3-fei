import { useEffect, useRef, useState } from "react";

export function useAttackOnTrigger(trigger, elementId, animationClass, onEnd){
    useEffect(() => {
        if (trigger){
            const element = document.getElementById(elementId);
            if (element){

            // agregamos la clase de animación
            element.classList.add(animationClass);

            const handleAnimationEnd = () => {
                element.classList.remove(animationClass);
                onEnd(); //triggerea el hit
            };

            //registrar listener
            element.addEventListener("animationend", handleAnimationEnd);

            //cleanup para que no se dispare dos veces
            return () => {
                element.removeEventListener("animationend", handleAnimationEnd);
            };
            }
        }
    }, [trigger]);
}
