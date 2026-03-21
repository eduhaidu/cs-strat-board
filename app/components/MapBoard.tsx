"use client"

import React from "react"
import { Stage, Layer, Image as KonvaImage, Circle } from "react-konva"
import Sidebar from "./Sidebar"
import useImage from "use-image"

export default function MapBoard() {
    const [mapImage] = useImage("/mirage.png");
    const [smokeImage] = useImage("/smoke_placed.png");
    const [mollyImage] = useImage("/molotov_placed.png");
    const [flashImage] = useImage("/flashbang.png");
    const [grenadeImage] = useImage("/he.png");

    const boardWidth = 800;
    const boardHeight = 800;

    const selectGrenadeImage = (type: string) => {
        switch(type) {
            case "smoke":
                return smokeImage;
            case "molly":
                return mollyImage;
            case "flashbang":
                return flashImage;
            case "he":
                return grenadeImage;
            default:
                return undefined;
        }
    }

    const instantiateGrenade = (type: string) => {
        // When clicking on the nade icon in the sidebar, this function will be called to create a new grenade on the map
        const grenadeImage = selectGrenadeImage(type);
        const grenadeSize = 50;
        return (
            <KonvaImage
                image={grenadeImage}
                width={grenadeSize}
                height={grenadeSize}
                x={20} // Set initial x position (can be updated to click location)
                y={20} // Set initial y position (can be updated to click location)
                draggable
            />
        )
    }

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
                    <Sidebar />
                </Layer>
            </Stage>
        </div>
    )
}