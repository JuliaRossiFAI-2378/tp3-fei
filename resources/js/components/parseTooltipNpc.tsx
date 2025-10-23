import { useMemo } from "react";
import AttackDisplay from "@/components/attackDisplay";

export default function ParseTooltipNpc({ npc }) {
    return useMemo(() => {
        if (npc){
            const triggerTextMap = {
                onattack: "al atacar",
                onhit: "al impactar",
                ongethit: "al recibir daño",
                onstartself: "al iniciar el combate",
                onstartenemy: "al iniciar el combate",
                default: "al debugear",
            };

            const combos = {
                onhit:{
                    default: (v, p) => `aplica ${p.effect?.name ?? "?"} ${v}`
                },
                onattack:{
                    default: (v, p) => `aplica ${p.effect?.name ?? "?"} ${v}`
                },
                ongethit:{
                    default: (v, p) => `aplica ${p.effect?.name ?? "?"} ${v}`
                },
                onstartenemy:{
                    default: (v, p) => `aplica ${p.effect?.name ?? "?"} ${v}`
                },
                onstartself:{
                    default: (v, p) => `gana ${p.effect?.name ?? "?"} ${v}`
                },
                default:{
                    default: () => `aplica debug`
                },
            };

            const lowerCased = {};
            for (const [tKey, effects] of Object.entries(combos)) {
                const tLower = tKey.toLowerCase();
                lowerCased[tLower] = {};
                for (const [eKey, message] of Object.entries(effects)) {
                    lowerCased[tLower][eKey.toLowerCase()] = message;
                }
            }

            const effectGroups = [];
            (npc.effect_triggers ?? []).forEach((effectTrigger) => {
                const triggerName = String(effectTrigger.trigger?.name).trim().toLowerCase();
                const effectName = effectTrigger.effect?.name ?? effectTrigger.effect?.id;
                const effectValue = effectTrigger.pivot?.effectValue ?? effectTrigger.effectValue;
                const existingGroup = effectGroups.find(group => group.trigger === triggerName);
                const effectItem = { effectName, value: effectValue, raw: effectTrigger };
                if (existingGroup) {
                    existingGroup.items.push(effectItem);
                } else {
                    effectGroups.push({ trigger: triggerName || "default", items: [effectItem] });
                }
            });

            //texto final
            const effectLines = effectGroups.map((group) => {
                const effectFunctions = lowerCased[group.trigger] ?? lowerCased["default"];
                const textPieces = group.items.map((item) => {
                        const effectKey = String(item.effectName ?? "").trim().toLowerCase();
                        const effectGenerator = (effectKey && effectFunctions[effectKey]) || effectFunctions["default"];
                        return effectGenerator(item.value, item.raw);
                    })
                    .filter(Boolean);
                return { trigger: group.trigger, textPieces };
            });

            return (
                <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-base capitalize">{npc.name}</h4>
                    <AttackDisplay variant={"enemy"} />
                    {effectLines.map((entry, i) => {
                        const parsedTrigger = triggerTextMap[entry.trigger] ?? triggerTextMap.default;
                        const joined = entry.textPieces.join(" y ");
                        const line = parsedTrigger ? `${parsedTrigger} ${joined}` : joined;
                        return (
                            <p key={i} className="text-sm italic">
                                {line}
                            </p>
                            );
                    })}
                </div>
            );
        }
    }, [npc]);
}

