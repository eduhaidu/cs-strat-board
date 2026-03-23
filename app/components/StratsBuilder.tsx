'use client'
import { useState } from "react"
import Sidebar from "./Sidebar"
import MapBoard from "./MapBoard"
import useImage from "use-image";

export default function StratsBuilder() {
    const [boardItems, setBoardItems] = useState<any[]>([]); // State to hold the items placed on the board

    const addBoardItem = (iconType: string) => {
        const newItem = {
            type: iconType,
            x: 100, // Default X position, can be updated based on user interaction
            y: 100  // Default Y position, can be updated based on user interaction
        };
        setBoardItems(prevItems => [...prevItems, newItem]);
    };

    return (
        <div className="flex gap-4">
            <Sidebar onAddItem={addBoardItem}/> {/* Pass the addBoardItem function to the Sidebar */}
            <MapBoard boardItems={boardItems} setBoardItems={setBoardItems} /> {/* Pass the boardItems state and setter to the MapBoard */}
        </div>
    )
    
}