import ParseTooltipEquip from "@/components/parseTooltipEquip";
import parseTooltipMaterial from "@/components/parseTooltipMaterial";
import { useDragContext } from "@/hooks/DragContext";
import ParseTooltipMaterialCompare from "./parseTooltipMaterialCompare";

export default function EquipmentSlot({type, variant, item, hoverMix = false, showTooltip, hideTooltip, updateTooltip, id}) {
    const { draggedMaterial } = useDragContext();
    
    const typeVariantMap = {
        upper: variant === "ghost" ? "Ehead" : "head",
        sword: variant === "ghost" ? "Esword" : "sword",
        shield: variant === "ghost" ? "Eshield" : "shield",
        lower: variant === "ghost" ? "Elegs" : "legs",
    };

    const typeMap = {
        upper: "upper",
        sword: "sword",
        shield: "shield",
        lower: "legs",
    };

    const zoneMap = {
        upper: [1, 2],
        sword: [3, 4],
        lower: [5, 6],
        shield: [7, 8],
    };

    const [baseZone, addonZone] = zoneMap[type];
    const baseZoneClass = `zone${baseZone}`;
    const addonZoneClass = `zone${addonZone}`;

    const typeItemMap = {
        upper: { base: "helm", addon: "pauldrons" },
        sword: { base: "blade", addon: "hilt" },
        lower: { base: "leggings", addon: "boots" },
        shield: { base: "shield-center", addon: "shield-rim" },
    };

    const getImagePath = (layer) => `/images/equipment/${typeItemMap[type][layer === "base_item" ? "base" : "addon"]}/${item?.[layer]?.image ?? ""}`;

    const itemClass = typeVariantMap[type];
    const itemLabel = typeMap[type];

    const baseTooltip = parseTooltipMaterial(type, "base", item?.base_item ?? null);
    const addonTooltip = parseTooltipMaterial(type, "addon", item?.addon_item ?? null);
    const unifiedTooltip = ParseTooltipEquip(type, item, variant);

    const baseCompareTooltip = draggedMaterial ? (
        <ParseTooltipMaterialCompare type={type} subType="base" currentItem={item?.base_item} draggedMaterial={draggedMaterial} />
    ) : null;

    const addonCompareTooltip = draggedMaterial ? (
        <ParseTooltipMaterialCompare type={type} subType="addon" currentItem={item?.addon_item} draggedMaterial={draggedMaterial} />
    ) : null;

    const handleDrop = (zone_id) => {
      if (draggedMaterial){
        console.log("dropeamos algo en: zoneid " +zone_id);
        //logica para guardar todo SUERTE
      }
    }

    return (
        <div
            id={id} className={`${itemClass} relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden`} {...(!hoverMix ? {onMouseEnter: (mouseEvent) => showTooltip(mouseEvent, unifiedTooltip), onMouseLeave: hideTooltip, onMouseMove: updateTooltip } : {})} >
            <img src={getImagePath("base_item")} className={`zone${baseZone} absolute w-full h-full object-cover`} onMouseEnter={(mouseEvent) => showTooltip(mouseEvent, draggedMaterial ? baseCompareTooltip : hoverMix ? baseTooltip ?? <p>{itemLabel} (Base)</p> : unifiedTooltip) } onMouseLeave={hideTooltip} onMouseMove={updateTooltip} onMouseUp={() => handleDrop(baseZone)} />

            <img src={getImagePath("addon_item")} className={`zone${addonZone} absolute w-full h-full object-cover`} onMouseEnter={(mouseEvent) => showTooltip(mouseEvent, draggedMaterial ? addonCompareTooltip : hoverMix ? addonTooltip ?? <p>{itemLabel} (Base)</p> : unifiedTooltip) } onMouseLeave={hideTooltip} onMouseMove={updateTooltip} onMouseUp={() => handleDrop(addonZone)} />
        </div>
    );
}
