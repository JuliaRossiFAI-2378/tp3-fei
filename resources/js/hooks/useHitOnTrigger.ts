import { useEffect, useRef, useState } from "react";

export function useHitOnTrigger( trigger: boolean, damage: number, onEnd?: () => void){
    useEffect(() => {
        const shouldHit = trigger;
        if (shouldHit){

            if (onEnd){
                onEnd();
            }
        }
    }, [trigger, damage, onEnd]);
    return damage;
}
