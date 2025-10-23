import { useState, useEffect } from "react";

export function useIncrementTrigger(play: boolean, step: number, interval: number, limit: number, onTrigger: () => void){
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (play){
            const timer = setInterval(() => {
                setValue(prev => {
                    const next = prev + step;
                    const shouldTrigger = next >= limit;

                    if (shouldTrigger){
                        onTrigger();
                        return limit; //se queda en el limite hasta que lo reinicien
                    }
                    return next;
                });
            }, interval);

            return () => clearInterval(timer);
        }
    }, [play, step, interval, limit, onTrigger]);

    return { value, setValue };
}
