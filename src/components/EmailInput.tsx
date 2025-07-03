export default function EmailInput() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <input type="text" placeholder="example@email.com" className="outline-none font-Geist text-(--black-5) placeholder:text-(--black-4) font-medium text-md text-left w-full border-1 border-(--brand-3) rounded-xl py-2 px-4" />
        </div>
    )
}