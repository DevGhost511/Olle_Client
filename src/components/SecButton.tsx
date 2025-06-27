
type SecButtonProps = {
    text: string;
}

export default function SecButton({text}: SecButtonProps) {
    return(
        <button className="cursor-pointer text-(--brand-6) font-Geist font-medium text-lg text-center w-full border-1 border-(--brand-6) py-2 bg-(--brand-2) hover:bg-white">
            {text}
        </button>
    )
}