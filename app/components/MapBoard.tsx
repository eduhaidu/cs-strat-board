"use client"

import React, {useState} from "react"
import { Stage, Layer, Image as KonvaImage} from "react-konva"
import useImage from "use-image"

interface BoardItem {
    type: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

export default function MapBoard({ boardItems, setBoardItems }: { boardItems: BoardItem[]; setBoardItems: React.Dispatch<React.SetStateAction<BoardItem[]>> }) {
    const [mapImage] = useImage("/mirage.png");
    const boardWidth = 800;
    const boardHeight = 800;

    const [smokePlacedImage] = useImage("/smoke_placed.png");
    const [mollyPlacedImage] = useImage("/molotov_placed.png");
    const [flashPlacedImage] = useImage("/flashbang_placed.png");
    const [grenadePlacedImage] = useImage("/he_placed.png");

//     React.useEffect(() => {
//         // This effect will run whenever the boardItems state changes. It will update the boardItems with the correct images based on their type.
//         const updatedBoardItems = boardItems.map(item => {
//             let image;
//             switch(item.type) {
//                 case "smoke":
//                     image = smokePlacedImage;
//                     break;
//                 case "molly":
//                     image = mollyPlacedImage;
//                     break;
//                 case "flashbang":
//                     image = flashPlacedImage;
//                     break;
//                 case "he":
//                     image = grenadePlacedImage;
//                     break;
//                 default:
//                     image = null;
//             }
//             return { ...item, image };
//         });
//         setBoardItems(updatedBoardItems);
//     }
// ), [boardItems, smokePlacedImage, mollyPlacedImage, flashPlacedImage, grenadePlacedImage];

    const getImageForType = (type: string) => {
        switch(type) {
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
                            width={item.width}
                            height={item.height}
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