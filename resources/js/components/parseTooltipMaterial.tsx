import { useMemo } from "react";

export default function parseTooltipMaterial(itemType, subType, item) {
    return useMemo(() => {
    if (item){
        const triggerRaw = item.trigger?.name;
        const effectRaw = item.effect?.name;
        const value = item.effectValue;
        const trigger = triggerRaw.trim().toLowerCase();
        const effect = effectRaw.trim().toLowerCase();

        // ;_;
        const subTypeNames = {
            sword: { base: "blade", addon: "hilt" },
            shield: { base: "center", addon: "rim" },
            upper: { base: "helm", addon: "pauldrons" },
            lower: { base: "leggings", addon: "boots" },
        };

        const displayPartName = subTypeNames[itemType]?.[subType] ?? subType;

        //mensajitos completitos :)
        const combos = {
            onhit: {
                default: (v, p) => `Al impactar aplica ${p.effect?.name ?? "?"} ${v}.`,
            },
            onattack: {
                default: (v, p) => `Al atacar aplica ${p.effect?.name ?? "?"} ${v}.`,
            },
            ongethit: {
                default: (v, p) => `Al recibir daño aplica ${p.effect?.name ?? "?"} ${v}.`,
            },
            onstartenemy: {
                default: (v, p) => `Al iniciar el combate aplica ${p.effect?.name ?? "?"} ${v}.`,
            },
            onstartself: {
                default: (v, p) => `Al iniciar el combate gana ${p.effect?.name ?? "?"} ${v}.`,
            },
            default: {
                default: () => ``,
            },
        };

        //LIMPIAMOS LA CACA PARA QUE NO HAYA ERRORES TONTOS DE DOS HORAS
        const lowercaseCombos = {};
        for (const [rawTrigger, effectsByEffectName] of Object.entries(combos)) {
            const triggerKey = rawTrigger.toLowerCase();
            lowercaseCombos[triggerKey] = {};

            for (const [rawEffect, message] of Object.entries(effectsByEffectName)) {
                const effectKey = rawEffect.toLowerCase();
                lowercaseCombos[triggerKey][effectKey] = message;
            }
        }

        // saquenme de aca
        const byTrigger = lowercaseCombos[trigger] ?? lowercaseCombos["default"];
        const generator = (effect && byTrigger[effect]) || byTrigger["default"] || lowercaseCombos["default"]["default"];
        const description = generator(value, item, triggerRaw);

        // LAS FORMULAS SON LAS FORMULAS OK
        const getStats = (zone, material) => ({
            dmg: zone === 3 ? material.defaultDmg : zone === 4 ? material.defaultDmg / 2 : 0,
            health: zone === 1 ? material.defaultHealth : zone === 2 ? material.defaultHealth / 2 : 0,
            armor: zone === 7 ? material.defaultArmor : zone === 8 ? material.defaultArmor / 2 : 0,
            speed: zone === 5 ? material.defaultSpeed : zone === 6 ? material.defaultSpeed / 2 : 0,
        });

        const rawStats = getStats(item.zone_id, item.material);

        // --- Formato legible de estadísticas ---
        const statLabels = {
            dmg: "daño",
            health: "salud",
            armor: "armadura",
            speed: "velocidad",
        };

        const statLines = Object.entries(rawStats).filter(([, val]) => val !== 0 && !isNaN(val)).map(([key, val]) => {
            const sign = val > 0 ? "+" : "";
            const rounded = Math.trunc(val);
            return `${sign}${rounded} ${statLabels[key]}`;
        });

        return (
            <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base capitalize">
                    {item.material?.name} {item.name}
                </h4>
                {statLines.length > 0 && (
                    <div className="text-sm text-gray-300">
                        {statLines.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                )}

                <p className="text-sm italic">{description}</p>
            </div>
        );
    }
  }, [itemType, subType, item]);
}

