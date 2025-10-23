import { useEffect } from "react";

export function useTakeHit(trigger: boolean, setHp: (value: number | ((prev: number) => number)) => void, setArmor: (value: number | ((prev: number) => number)) => void, damage: number, onEnd?: () => void) {
    useEffect(() => {
        const shouldDamage = trigger;
        if (shouldDamage){
            setArmor(prevArmor => {//si, todo tiene que ir adentro de setArmor, sino no anda ya probe por horas
                const remainingArmor = prevArmor - damage;
                if (remainingArmor >= 0) {
                    if (onEnd){
                        onEnd()
                    }
                    return remainingArmor;
                }

                setHp(prevHp => prevHp + remainingArmor);//sumamos un negativo

                if (onEnd){//lo tenemos dos veces porque a veces no llega aca
                    onEnd()
                }
                return 0;
            });
        }
    }, [trigger, setHp, setArmor, damage, onEnd]);
}


