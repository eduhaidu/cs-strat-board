"use client"

import React, { useEffect, useState, useRef } from "react"
import { Stage, Layer, Image as KonvaImage} from "react-konva"
import useImage from "use-image"

interface BoardItem {
    type: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

interface MapProps {
    name: string;
    image: string;
}

export default function MapBoard({ boardItems, setBoardItems, selectedMap, removeBoardItem }: { boardItems: BoardItem[]; setBoardItems: React.Dispatch<React.SetStateAction<BoardItem[]>>; selectedMap: MapProps; removeBoardItem: (index: number) => void }) {
    const [mapImage] = useImage(selectedMap.image);
    const boardWidth = 800;
    const boardHeight = 800;

    const boardItemSize = 50;

    const [playerTImage] = useImage("/player_t.png");
    const [playerCTImage] = useImage("/player_ct.png");
    const [smokePlacedImage] = useImage("/smoke_placed.png");
    const [mollyPlacedImage] = useImage("/molotov_placed.png");
    const [flashPlacedImage] = useImage("/flashbang_placed.png");
    const [grenadePlacedImage] = useImage("/he_placed.png");
    const [showItemMenu, setShowItemMenu] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [itemMenuPosition, setItemMenuPosition] = useState({ x: 0, y: 0 });
    const stageRef = useRef<any>(null);

    const [isDragging, setIsDragging] = useState(false);
    const getImageForType = (type: string) => {
        switch(type) {
            case "player_t":
                return playerTImage;
            case "player_ct":
                return playerCTImage;
            case "smoke":
                return smokePlacedImage;
            case "molly":
                return mollyPlacedImage;
            case "flashbang":
                return flashPlacedImage;
            case "he":
                return grenadePlacedImage;
            default:
                return undefined;
        }
    };

    useEffect(()=>{
        const handleWindowClick = () => {
            setShowItemMenu(false);
        };

        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    const handleItemMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (event.button !== 2) return; // Only proceed if it's a right-click
        if (event.target === stageRef.current) return;
        const stage = stageRef.current;
        if (stage) {
            const pointerPosition = stage.getPointerPosition();
            const containerRect = stage.container().getBoundingClientRect();
            
            const clickedItemIndex = boardItems.findIndex(item => {
                return (
                    pointerPosition.x >= item.x &&
                    pointerPosition.x <= item.x + boardItemSize &&
                    pointerPosition.y >= item.y &&
                    pointerPosition.y <= item.y + boardItemSize
                );
            });

            if (clickedItemIndex === -1) {
                setShowItemMenu(false);
                return;
            }
            setItemMenuPosition({
                x: pointerPosition.x + containerRect.left,
                y: pointerPosition.y + containerRect.top
            });
            setShowItemMenu(true);
            setSelectedItemIndex(clickedItemIndex);
        };
    }

    return (
        <div className="flex justify-center items-center bg-zinc-900 p-4 rounded-xl" onContextMenu={handleItemMenu}>
            <Stage width={boardWidth} height={boardHeight} ref={stageRef}>
                <Layer>
                    {mapImage && (
                        <KonvaImage
                            image={mapImage}
                            width={boardWidth}
                            height={boardHeight}
                            opacity={0.8}
                        />
                    )}
                </Layer>
                <Layer>
                    {boardItems.map((item, index) => (
                        <KonvaImage
                            key={index}
                            image={getImageForType(item.type)}
                            width={boardItemSize}
                            height={boardItemSize}
                            x={item.x}
                            y={item.y}
                            draggable
                            opacity={isDragging && selectedItemIndex === index ? 0.5 : 1}
                            onDragStart={() => {
                                setIsDragging(true);
                                setSelectedItemIndex(index);
                            }}
                            onDragMove={(e) => {
                                const updatedItems = [...boardItems];
                                updatedItems[index] = {
                                    ...updatedItems[index],
                                    x: e.target.x(),
                                    y: e.target.y()
                                };
                                setBoardItems(updatedItems);
                            }}
                            onDragEnd={(e) => {
                                setIsDragging(false);
                                const updatedItems = [...boardItems];
                                updatedItems[index] = {
                                    ...updatedItems[index],
                                    x: e.target.x(),
                                    y: e.target.y()
                                };
                                setBoardItems(updatedItems);
                            }}
                        />
                    ))}
                </Layer>
            </Stage>
            {showItemMenu && selectedItemIndex !== null && (
                <div 
                    className="absolute bg-zinc-800 text-white p-2 rounded-md z-50"
                    style={{ top: itemMenuPosition.y, left: itemMenuPosition.x, width: "60px", textAlign: "center", zIndex: 1000 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        removeBoardItem(selectedItemIndex);
                        setShowItemMenu(false);
                    }}
                >
                    Delete
                </div>
            )}
        </div>
    )
}