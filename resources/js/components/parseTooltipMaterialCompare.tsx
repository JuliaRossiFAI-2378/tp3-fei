import parseTooltipMaterial from "./parseTooltipMaterial";

export default function ParseTooltipMaterialCompare({ type, subType, currentItem, draggedMaterial }) {
    if (draggedMaterial){//si no estamos arrastrando hace la funcion normal
    const currentTooltip = parseTooltipMaterial(type, subType, currentItem);
    const newItem = {...currentItem, material: draggedMaterial};
    const newTooltip = parseTooltipMaterial(type, subType, newItem);

    return (
        <div className="flex flex-col gap-1">
            <div className="opacity-40 line-through">
                {currentTooltip}
            </div>
            <div className="border-t border-gray-500 pt-1">
                {newTooltip}
            </div>
        </div>
    );
    }else{
        return parseTooltipMaterial(type, subType, currentItem);
    }
}

