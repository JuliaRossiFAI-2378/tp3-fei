// DragContext.jsx
import { createContext, useContext, useState } from "react";

const DragContext = createContext();

export function DragProvider({ children }) {
    const [draggedMaterial, setDraggedMaterial] = useState(null);

    return (
        <DragContext.Provider value={{ draggedMaterial, setDraggedMaterial }}>
            {children}
        </DragContext.Provider>
    );
}

export function useDragContext() {
    return useContext(DragContext);
}


