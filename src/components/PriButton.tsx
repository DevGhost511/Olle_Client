type PriButtonProps = {
    text: string;
}
export default function PriButton ({text}: PriButtonProps) {
    return (
        <button className="flex justify-center items-center px-2 py-3 cursor-pointer bg-(--brand-6) hover:bg-(--brand-5) text-white font-Geist font-medium text-xl  w-full">
            {text}
        </button>
    )
}