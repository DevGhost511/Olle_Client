
type SecButtonProps = {
    text: string;
    onClick?: () => void;
}

export default function SecButton({text, onClick}: SecButtonProps) {
    return(
        <button onClick={onClick} className="cursor-pointer text-(--brand-6) font-Geist font-medium text-lg text-center w-full border-1 border-(--brand-6) py-3 bg-(--brand-2) hover:bg-white">
            {text}
        </button>
    )
}