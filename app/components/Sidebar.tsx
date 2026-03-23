
const availableItems = [
    {type: "player_t", image: "/player_t.png"},
    {type: "player_ct", image: "/player_ct.png"},
    { type: "smoke", image: "/smoke.png" },
    { type: "molly", image: "/molotov.png" },
    { type: "flashbang", image: "/flashbang.png" },
    { type: "he", image: "/he.png" }
]

export default function Sidebar({ onAddItem }: { onAddItem: (type: string) => void }) {
    const itemSize = 50;

    const onItemClick = (type: string) => {
        // This function will be called when a grenade icon in the sidebar is clicked. It can be used to set some state that indicates which grenade type is currently selected for placement on the map.
        onAddItem(type);
    }

    return (
        <div className="w-64 bg-zinc-900 rounded-xl p-4 flex flex-col gap-4 border border-zinc-800 shrink-0">
            <div className="flex flex-row gap-2">
                {availableItems.map((item) => (
                    <div key={item.type} className="cursor-pointer" onClick={() => onItemClick(item.type)}>
                        <img src={item.image} alt={item.type} width={itemSize} height={itemSize} />
                    </div>
                ))}
            </div>
        </div>
    )

}