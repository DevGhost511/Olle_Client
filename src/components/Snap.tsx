

export default function Snap() {
    return (
        <div className="flex flex-row items-center justify-around gap-3 border-1 border-(--brand-6) h-12 w-full bg-white px-4">
            <div className="flex flex-row items-center justify-start gap-4 w-full">
                <img src="plus.svg" alt="icon" />
                <input type="text" placeholder="Ask Olle about your collectible or just ask anything" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-xl text-left w-full border-0 " />

            </div>
            <img src="camera.svg" alt="icon" />

        </div>
    )
}