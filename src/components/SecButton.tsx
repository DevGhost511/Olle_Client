
type SecButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
}

export default function SecButton({text, onClick, disabled, icon}: SecButtonProps) {
    return(
        <button onClick={onClick} disabled={disabled} className="flex flex-row justify-center items-center gap-4 cursor-pointer disabled:cursor-default text-(--brand-6) disabled:text-(--black-3) font-Geist font-medium text-md text-center w-full border-1 border-(--brand-6) rounded-xl disabled:border-(--black-3) py-3 bg-(--brand-2) disabled:bg-inherit  hover:bg-white">
            {icon && <img src={icon} alt="icon" />}
            <p>{text}</p>
        </button>
    )
}