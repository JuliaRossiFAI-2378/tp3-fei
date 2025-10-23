import { createContext, useContext } from "react";

export const PlayerStatsContext = createContext({
    damage: 0,
    cooldown: 0,
    speed: 0,
});

export const EnemyStatsContext = createContext({
    damage: 0,
    cooldown: 0,
    speed: 0,
});

export const usePlayerStats = () => useContext(PlayerStatsContext);
export const useEnemyStats = () => useContext(EnemyStatsContext);
