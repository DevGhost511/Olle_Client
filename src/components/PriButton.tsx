type PriButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}
export default function PriButton ({text, onClick, disabled=false}: PriButtonProps) {
    return (
        <button disabled={disabled} onClick={onClick} className="flex justify-center items-center px-2 py-3 cursor-pointer disabled:cursor-default bg-(--brand-6) hover:bg-(--brand-5) disabled:bg-(--black-3) text-white font-Geist font-medium text-xl  w-full">
            {text}
        </button>
    )
}