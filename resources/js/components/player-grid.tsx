import { useState } from "react";
import EquipmentSlot from "./equipmentSlot";
import ParseTooltipNpc from "./parseTooltipNpc";

export default function Grid({variant, sword, shield, upper, lower, npc, ghost, hoverMix = false}) {
    const [tooltip, setTooltip] = useState(null);
    const showTooltip = (mouseEvent, text) => {
        setTooltip({ x: mouseEvent.clientX + 6, y: mouseEvent.clientY - 20, text });
    };
    const hideTooltip = () => setTooltip(null);
    const updateTooltip = (mouseEvent) => setTooltip((prev) => (prev ? { ...prev, x: mouseEvent.clientX + 6, y: mouseEvent.clientY - 20 } : prev));

    const data =
        variant === "ghost" && ghost
        ? {
            sword: ghost.equipments?.find((equip) => equip.type?.name === "sword"),
            shield: ghost.equipments?.find((equip) => equip.type?.name === "shield"),
            upper: ghost.equipments?.find((equip) => equip.type?.name === "helm"),
            lower: ghost.equipments?.find((equip) => equip.type?.name === "boots"),
        } : variant === "player" ? { sword, shield, upper, lower }
        : { npc };

    return (
        <div style={{backgroundImage: variant === "player" || variant === "ghost" ? `url(/images/stick.png)` : "", backgroundSize: "cover"}} className={`${variant === "player" ? "player [grid-area:player]" : "enemy [grid-area:enemy]"} rounded-xl border border-sidebar-border/70 dark:border-sidebar-border relative`} >
            {(variant === "player" || variant === "ghost") && (
                <>
                    <EquipmentSlot type="upper" variant={variant} item={data.upper} hoverMix={hoverMix} showTooltip={showTooltip} hideTooltip={hideTooltip} updateTooltip={updateTooltip} />
                    <EquipmentSlot id={variant === "player" ? "playerWeapon" : "ghostWeapon"} type="sword" variant={variant}  item={data.sword} hoverMix={hoverMix} showTooltip={showTooltip} hideTooltip={hideTooltip} updateTooltip={updateTooltip} />
                    <EquipmentSlot type="shield" variant={variant} item={data.shield}  hoverMix={hoverMix} showTooltip={showTooltip} hideTooltip={hideTooltip} updateTooltip={updateTooltip} />
                    <EquipmentSlot type="lower" variant={variant} item={data.lower} hoverMix={hoverMix} showTooltip={showTooltip} hideTooltip={hideTooltip} updateTooltip={updateTooltip} />
                </>
            )}

            {variant === "npc" && npc && (
                <div className="absolute inset-0 w-full h-full">
                    <div id="enemy" >
                        <img src={`/images/NPCs/${npc?.image}`} className="object-contain" onMouseEnter={(mouseEvent) => showTooltip(mouseEvent, <ParseTooltipNpc npc={npc} variant="enemy" />)} onMouseLeave={hideTooltip} onMouseMove={updateTooltip} />
                    </div>
                    <p>soy {npc.name}</p>
                    <p>Vida: {npc.hp}</p>
                </div>
            )}


            {tooltip && (
                <div className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none" style={{ top: tooltip.y, left: tooltip.x }}>
                    {tooltip.text}
                </div>
            )}


            {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className={`space${i}`}></div>
            ))}
        </div>
    );
}