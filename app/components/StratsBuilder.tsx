'use client'
import { useEffect, useState } from "react"
import ItemBar from "./ItemBar"
import MapBoard from "./MapBoard"

const availableMaps = [
    { name: "Mirage", image: "/maps/mirage.png" },
    { name: "Inferno", image: "/maps/inferno.png" },
    { name: "Dust2", image: "/maps/dust2.png" },
    { name: "Nuke", image: "/maps/nuke.png" },
    { name: "Overpass", image: "/maps/overpass.png" },
    { name: "Ancient", image: "/maps/ancient.png" },
    { name: "Anubis", image: "/maps/anubis.png" },
    { name: "Cache", image: "/maps/cache.png" },
]

export default function StratsBuilder() {
    const [boardItems, setBoardItems] = useState<any[]>([]); // State to hold the items placed on the board
    const [selectedMap, setSelectedMap] = useState(availableMaps[0]); // State to hold the currently selected map
    const [showMapSelector, setShowMapSelector] = useState(false); // State to control the visibility of the map selector
    

    const addBoardItem = (iconType: string, x: number, y: number) => {
        const newItem = {
            type: iconType,
            x: x,
            y: y
        };
        setBoardItems(prevItems => [...prevItems, newItem]);
    };

    const removeBoardItem = (index: number) => {
        setBoardItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const saveStrategy = () => {
        const strategyData = {
            map: selectedMap.name,
            items: boardItems
        };
        console.log("Saved Strategy:", strategyData);

        // Save the strategyData to json
        const blob = new Blob([JSON.stringify(strategyData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedMap.name}_strategy.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const loadedData = JSON.parse(e.target?.result as string);
                    if (loadedData.map && loadedData.items) {
                        const mapToLoad = availableMaps.find(map => map.name === loadedData.map);
                        if (mapToLoad) {
                            setSelectedMap(mapToLoad);
                            setBoardItems(loadedData.items);
                        }
                    }
                } catch (error) {
                    console.error("Error loading strategy:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="relative flex gap-4">
            <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setShowMapSelector(!showMapSelector)} className="bg-zinc-800 text-white px-4 py-2 rounded-md">
                    {selectedMap.name}
                </button>
                {showMapSelector && (
                    <div className="absolute top-12 right-4 bg-zinc-800 p-4 rounded-xl">
                        <ul>
                            {availableMaps.map(map => (
                                <li key={map.name} onClick={() => {
                                    setSelectedMap(map);
                                    setShowMapSelector(false);
                                    setBoardItems([]); // Clear the board items when a new map is selected
                                }} className={`cursor-pointer ${selectedMap.name === map.name ? "font-bold" : ""}`}>
                                    {map.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <ItemBar onAddItem={addBoardItem} />
            <MapBoard boardItems={boardItems} setBoardItems={setBoardItems} selectedMap={selectedMap} removeBoardItem={removeBoardItem} /> {/* Pass the boardItems state and setter to the MapBoard */}
            <div className="relative">
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                <button onClick={saveStrategy} className="bg-green-600 text-white px-4 py-2 rounded-md">Save Strategy</button>
                <input type="file" accept=".json" onChange={loadStrategy} className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"/>
            </div>
            </div>
        </div>
    )
    
}