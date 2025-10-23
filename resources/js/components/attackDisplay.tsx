import { useContext } from "react";
import { PlayerStatsContext, EnemyStatsContext } from "@/hooks/StatsContext";

export default function AttackDisplay({ variant }) {
    const stats = variant === "player" ? useContext(PlayerStatsContext) : useContext(EnemyStatsContext);
    if (stats){
        const damage = stats.damage ?? 0;
        const cooldown = stats.cooldown ?? 0;
        const speed = stats.speed ?? 0;
        return (
            <div className="flex flex-col gap-0.5">
                <p className="text-sm text-gray-300">Daño: {damage}</p>
                <p className="text-sm text-gray-300">Enfriamiento: {cooldown.toFixed(2)}/{speed.toFixed(2)}</p>
            </div>
        );
    }
}