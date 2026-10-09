import { useEffect, useState } from "react";

const availableItems = [
    {type: "player_t", image: "/player_t.png"},
    {type: "player_ct", image: "/player_ct.png"},
    { type: "smoke", image: "/smoke.png" },
    { type: "molly", image: "/molotov.png" },
    { type: "flashbang", image: "/flashbang.png" },
    { type: "he", image: "/he.png" }
]

export default function ItemBar({ onAddItem }: { onAddItem: (type: string, x: number, y: number) => void}) {
    const itemSize = 50;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    useEffect(() => {
            const handleMouseMove = (event: MouseEvent) => {
                setMousePosition({ x: event.clientX, y: event.clientY });
            };
    
            window.addEventListener("mousemove", handleMouseMove);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, []);

    const onItemClick = (type: string, x: number, y: number) => {
        // This function will be called when a grenade icon in the sidebar is clicked. It can be used to set some state that indicates which grenade type is currently selected for placement on the map.
        if(!isDragging) {
            onAddItem(type, x, y);
        }
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => {
        if (event.button === 0) {
            setIsDragging(true);
            setSelectedItem(type);
        }
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => {
        if (event.button === 0) {
            setIsDragging(false);
            setSelectedItem(type);
            onItemClick(type, mousePosition.x, mousePosition.y);
        }
    }

    return (
        <div className="w-64 h-2 bg-zinc-900 rounded-xl p-4 flex flex-row gap-4 border border-zinc-800 shrink-0">
            <div className="flex flex-row gap-2">
                {availableItems.map((item) => (
                    <div key={item.type} className="cursor-pointer" onClick={() => onItemClick(item.type, 100, 100)} onMouseDown={(e) => handleMouseDown(e, item.type)} onMouseUp={(e) => handleMouseUp(e, selectedItem || item.type)}>
                        <img src={item.image} alt={item.type} width={itemSize} height={itemSize} />
                    </div>
                ))}
            </div>
        </div>
    )

}
