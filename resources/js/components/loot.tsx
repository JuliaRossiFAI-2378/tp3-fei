import { useState } from "react";
import { useDragContext } from "@/hooks/DragContext";

export default function Loot({ material }) {
    const { setDraggedMaterial } = useDragContext();
    const [isDragging, setIsDragging] = useState(false);
    const [mousePos, setMouseXY] = useState({ x: 0, y: 0 });

    const handleMouseMove = (moveEvent) => {
        setMouseXY({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = () => {
        setDraggedMaterial(null);
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleDragStart = (dragEvent) => {
        dragEvent.preventDefault(); //para no ir pintando todo de azul
        setDraggedMaterial(material);
        setIsDragging(true);
        setMouseXY({ x: dragEvent.clientX, y: dragEvent.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <>
            <div onMouseDown={handleDragStart} className={`w-20 h-20 border border-gray-500 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing ${isDragging ? "invisible" : ""}`} >
                <img src={`/images/materials/${material.image}`} className="rounded-xl object-contain w-16 h-16 pointer-events-none" />
            </div>
            {/* yo cuando hago los elementos dos veces <|:-) */}
            {isDragging && (
                <div className="fixed pointer-events-none z-50 w-20 h-20" style={{ top: mousePos.y - 40, left: mousePos.x - 40, opacity: 0.9 }} >
                    <div className="w-20 h-20 border border-gray-500 rounded-xl flex items-center justify-center pointer-events-none">
                        <img src={`/images/materials/${material.image}`} className="rounded-xl object-contain w-16 h-16 pointer-events-none" />
                    </div>
                </div>
            )}
        </>
    );
}



