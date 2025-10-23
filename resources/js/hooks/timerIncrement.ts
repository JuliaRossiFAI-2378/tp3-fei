import { useEffect, useRef, useState } from "react";

export function timerIncrement(play: boolean, duration: number, step: number, interval: number, triggerAt: number){
    const [timer, setTimer] = useState(0);
    const [stormDamage, setStormDamage] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
    	if (play){
        	intervalRef.current = setInterval(() => {
				setTimer(prevTimer => {
					const nextTimer = prevTimer + step;
					const cappedTimer = nextTimer >= duration ? duration : nextTimer;

					//solo incrementamos stormDamage si llegamo al trigger
					if (cappedTimer >= triggerAt){
					setStormDamage(prevDamage => prevDamage + step);
					}

					//limite duro para la tormenta por si acaso
					if (nextTimer >= duration && intervalRef.current){
						clearInterval(intervalRef.current);
					}

					return cappedTimer;
				});
			}, interval);
			
			return () => {
				if (intervalRef.current){clearInterval(intervalRef.current)}
			};
    	}
    }, [play, duration, step, interval, triggerAt]);

    return { timer, stormDamage, setTimer, setStormDamage };
}
