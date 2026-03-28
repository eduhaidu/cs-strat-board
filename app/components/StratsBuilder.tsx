'use client'
import { useState } from "react"
import Sidebar from "./Sidebar"
import MapBoard from "./MapBoard"

const availableMaps = [
    { name: "Mirage", image: "/maps/mirage.png" },
    { name: "Inferno", image: "/maps/inferno.png" },
    { name: "Dust2", image: "/maps/dust2.png" },
    { name: "Nuke", image: "/maps/nuke.png" },
    { name: "Overpass", image: "/maps/overpass.png" },
    { name: "Ancient", image: "/maps/ancient.png" },
    { name: "Anubis", image: "/maps/anubis.png" },
]

export default function StratsBuilder() {
    const [boardItems, setBoardItems] = useState<any[]>([]); // State to hold the items placed on the board
    const [selectedMap, setSelectedMap] = useState(availableMaps[0]); // State to hold the currently selected map

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
            <ul>
                {availableMaps.map(map => (
                    <li key={map.name} onClick={() => setSelectedMap(map)} className={`cursor-pointer ${selectedMap.name === map.name ? "font-bold" : ""}`}>
                        {map.name}
                    </li>
                ))}
            </ul>
            <Sidebar onAddItem={addBoardItem}/> {/* Pass the addBoardItem function to the Sidebar */}
            <MapBoard boardItems={boardItems} setBoardItems={setBoardItems} selectedMap={selectedMap} /> {/* Pass the boardItems state and setter to the MapBoard */}
        </div>
    )
    
}