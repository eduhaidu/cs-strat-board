
import useImage from "use-image"

const availableGrenades = [
    { type: "smoke", image: "/smoke.png" },
    { type: "molly", image: "/molotov.png" },
    { type: "flashbang", image: "/flashbang.png" },
    { type: "he", image: "/he.png" }
]

export default function Sidebar({ onAddItem }: { onAddItem: (type: string) => void }) {
    const [smokeImage] = useImage("/smoke.png");
    const [mollyImage] = useImage("/molotov.png");
    const [flashImage] = useImage("/flashbang.png");
    const [grenadeImage] = useImage("/he.png");

    const grenadeSize = 50;

    const onGrenadeClick = (type: string) => {
        // This function will be called when a grenade icon in the sidebar is clicked. It can be used to set some state that indicates which grenade type is currently selected for placement on the map.
        onAddItem(type);
    }

    return (
        <div className="w-64 bg-zinc-900 rounded-xl p-4 flex flex-col gap-4 border border-zinc-800 shrink-0">
            <div className="flex flex-row gap-2">
                {availableGrenades.map((grenade) => (
                    <div key={grenade.type} className="cursor-pointer" onClick={() => onGrenadeClick(grenade.type)}>
                        <img src={grenade.image} alt={grenade.type} width={grenadeSize} height={grenadeSize} />
                    </div>
                ))}
            </div>
        </div>
    )

}