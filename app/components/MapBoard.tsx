"use client"

import React from "react"
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

export default function MapBoard({ boardItems, setBoardItems, selectedMap }: { boardItems: BoardItem[]; setBoardItems: React.Dispatch<React.SetStateAction<BoardItem[]>>; selectedMap: MapProps }) {
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

    return (
        <div className="flex justify-center items-center bg-zinc-900 p-4 rounded-xl">
            <Stage width={boardWidth} height={boardHeight}>
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
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    )
}