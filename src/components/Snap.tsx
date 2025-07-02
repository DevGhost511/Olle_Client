

export default function Snap() {
    return (
        <div className="flex flex-row items-center justify-around gap-3 border-1 border-(--brand-6) w-full bg-white px-1 py-1">
            <div className="flex flex-row items-center justify-start gap-4 w-full">
                <button className="flex px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                    <img src="plus.svg" alt="icon" />
                </button>
                <input type="text" placeholder="Ask Olle about your collectible or just ask anything" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-md text-left w-full border-0 " />

            </div>
            <button className="flex px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                <img src="camera.svg" alt="icon" />
            </button>

        </div>
    )
}