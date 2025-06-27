

export default function ChattingInput() {
    return (
        <div className="flex flex-row items-center justify-around gap-3 border-1 border-(--brand-6)  w-full bg-white pl-4 pr-1 py-1">
                <input type="text" placeholder="Ask Olle about your collectible or just ask anything" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-xl text-left w-full border-0 " />
            
            <button className="flex px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                <img src="send.svg" alt="icon" />
            </button>
        </div>
    )
}