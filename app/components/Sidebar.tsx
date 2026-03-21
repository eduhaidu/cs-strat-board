import Document, { Html } from "next/document";
import {Stage, Layer, Image as KonvaImage, Group} from "react-konva"
import useImage from "use-image"

export default function Sidebar() {
    const [smokeImage] = useImage("/smoke.png");
    const [mollyImage] = useImage("/molotov.png");
    const [flashImage] = useImage("/flashbang.png");
    const [grenadeImage] = useImage("/he.png");
    const grenadeSize = 50;

    const onGrenadeClick = (type: string) => {
        // This function will be called when a grenade icon in the sidebar is clicked. It can be used to set some state that indicates which grenade type is currently selected for placement on the map.
        console.log(`Selected grenade type: ${type}`);
    }

    return (
        <Group x={100} y={10}>
                {smokeImage && (
                    <KonvaImage
                        image={smokeImage}
                        width={grenadeSize}
                        height={grenadeSize}
                        x={20}
                        y={20}
                        onClick={() => onGrenadeClick("smoke")}
                    />
                )}
                {mollyImage && (
                    <KonvaImage
                        image={mollyImage}
                        width={grenadeSize}
                        height={grenadeSize}
                        x={40}
                        y={20}
                        onClick={() => onGrenadeClick("molly")}
                    />
                )}
                {flashImage && (
                    <KonvaImage
                        image={flashImage}
                        width={grenadeSize}
                        height={grenadeSize}
                        x={60}
                        y={20}
                        onClick={() => onGrenadeClick("flashbang")}
                    />
                )}
                {grenadeImage && (
                    <KonvaImage
                        image={grenadeImage}
                        width={grenadeSize}
                        height={grenadeSize}
                        x={80}
                        y={20}
                        onClick={()=>onGrenadeClick("he")}
                    />
                )}
            </Group>
    )

}