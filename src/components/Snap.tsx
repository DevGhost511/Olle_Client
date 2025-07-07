

export default function Snap() {
    return (
        <div className="flex flex-row items-center justify-around gap-3 rounded-xl border border-(--black-2) [&:has(input:focus)]:border-(--brand-6) [&:has(input:focus)]:outline-4 [&:has(input:focus)]:outline-(--brand-3) w-full bg-white px-1 py-1 sm:mt-4">
            <div className="flex flex-row items-center justify-start gap-4 w-full">
                <button className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                    <img src="plus.svg" alt="icon" />
                </button>
                <input type="text" placeholder="Ask Olle about your collectible or just ask anything" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-lg text-left w-full border-0 " />

            </div>
            <button className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                <img src="camera.svg" alt="icon" />
            </button>
        </div>
    )
}