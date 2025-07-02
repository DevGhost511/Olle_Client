type PriButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
}
export default function PriButton ({text, onClick, disabled=false, icon, }: PriButtonProps) {
    return (
        <button disabled={disabled} onClick={onClick} className="flex flex-row gap-4 justify-center items-center px-1 py-3 cursor-pointer disabled:cursor-default bg-(--brand-6) hover:bg-(--brand-5) disabled:bg-(--black-3) text-white font-Geist font-medium text-md  w-full">
            {icon && <img src={icon} alt="icon" />}
            <p>{text}</p>
        </button>
    )
}