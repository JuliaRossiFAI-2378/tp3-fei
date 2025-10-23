import { useMemo } from "react";
import AttackDisplay from "@/components/attackDisplay";

export default function ParseTooltipEquip(itemType, item, variant = "player") {
    return useMemo(() => {
    if (item){
        //aca definimos las formulas de cada stat
        const getStats = (zone, material) => ({
            dmg: zone === 3 ? material.defaultDmg : zone === 4 ? material.defaultDmg / 2 : 0,
            health: zone === 1 ? material.defaultHealth : zone === 2 ? material.defaultHealth / 2 : 0,
            armor: zone === 7 ? material.defaultArmor : zone === 8 ? material.defaultArmor / 2 : 0,
            speed: zone === 5 ? material.defaultSpeed : zone === 6 ? material.defaultSpeed / 2 : 0,
        });

        const baseStats = item.base_item ? getStats(item.base_item.zone_id, item.base_item.material) : {};
        const addonStats = item.addon_item ? getStats(item.addon_item.zone_id, item.addon_item.material) : {};

        const statLabels = {
            dmg: "daño",
            health: "salud",
            armor: "armadura",
            speed: "velocidad",
        };

        const stats = Object.keys(statLabels).map((key) => {
            const val = Math.trunc((baseStats[key] || 0) + (addonStats[key] || 0));//lo hacemos entero
            if (val !== 0) {
                const sign = val > 0 ? "+" : "";
                return `${sign}${val} ${statLabels[key]}`;
            }
        }).filter(Boolean);

        const combos = {
            onhit: {
                default: (v, p) => `aplica ${p.effect?.name} ${v}`,
            },
            onattack: {
                default: (v, p) => `aplica ${p.effect?.name} ${v}`,
            },
            onstartself: {
                default: (v, p) => `gana ${p.effect?.name} ${v}`,
            },
            default: {
                default: () => "",
            },
        };

        //A PRUEBA DE IDIOTAS
        const lowerCased = {};
        for (const [triggerKey, effects] of Object.entries(combos)) {
            const tKey = triggerKey.toLowerCase();
            lowerCased[tKey] = {};
            for (const [effectKey, message] of Object.entries(effects)) {
                lowerCased[tKey][effectKey.toLowerCase()] = message;
            }
        }

        //aca juntamos todo
        const groupedByTrigger = {};
        [item.base_item, item.addon_item].forEach((part) => {
            const hasTrigger = part?.trigger?.name;
            const hasEffect = part?.effect?.name;
            if (hasTrigger && hasEffect) {
                const trigger = part.trigger.name.toLowerCase().trim();
                const effect = part.effect.name.toLowerCase().trim();
                const value = part.effectValue ?? 0;
                if (!groupedByTrigger[trigger]) {
                    groupedByTrigger[trigger] = {};
                }
                if (!groupedByTrigger[trigger][effect]) {
                    groupedByTrigger[trigger][effect] = { total: 0, part };
                }
                groupedByTrigger[trigger][effect].total += value;
            }
        });

        // --- Generación de textos por trigger ---
        const effectsByTrigger = Object.entries(groupedByTrigger).map(([trigger, effectsMap]) => {
            const texts = Object.entries(effectsMap).map(([effect, { total, part }]) => {
                const effectText = lowerCased[trigger]?.[effect] ||lowerCased[trigger]?.default ||lowerCased.default.default;
                return effectText(total, part, trigger);
            }).filter(Boolean);
            return { trigger, texts };
        });

        const triggerTextMap = {
            onattack: "al atacar",
            onhit: "al impactar",
            ongethit: "al recibir daño",
            onstartself: "al iniciar el combate",
            onstartenemy: "al iniciar el combate",
        };

        const triggerText = (t) => triggerTextMap[t] || "";


        return (
            <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base capitalize">{item.name}</h4>

                {itemType === "sword" && <AttackDisplay variant={variant} />}

                {stats.length > 0 && itemType !== "sword" && (
                    <div className="text-sm text-gray-300">
                        {stats.map((line, i) => (
                        <p key={i}>{line}</p>
                        ))}
                    </div>
                )}

                {effectsByTrigger.map(({ trigger, texts }, i) => (
                    <p key={i} className="text-sm italic">
                        {`${triggerText(trigger)} ${texts.join(" y ")}`}
                    </p>
                ))}
            </div>
        );
    }
  }, [item, variant]);
}










