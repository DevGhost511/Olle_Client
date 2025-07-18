

export default function ChattingInput() {
    return (
        <div className="flex flex-row items-center justify-around gap-3 border-1 border-(--brand-3) [&:has(input:focus)]:border-(--brand-6) [&:has(input:focus)]:outline-4 [&:has(input:focus)]:outline-(--brand-3) w-full bg-white pl-4 pr-1 py-1 rounded-xl">
                <input type="text" placeholder="Type your message here" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-lg text-left w-full border-0 " />
            
            <button className="flex rounded-lg px-2 py-2 cursor-pointer hover:bg-(--brand-2)">
                <img className="w-7 h-7" src="/send.svg" alt="icon" />
            </button>
        </div>
    )
}