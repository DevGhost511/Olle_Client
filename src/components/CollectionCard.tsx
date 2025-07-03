import SecButton from "./SecButton";

type Props = {
    name: string,
    image: string,
    price: number,
    className?: string
}

export default function CollectionCard({ name, image, price, className }: Props) {
    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${className}`} >
            <div className="w-full border-1 rounded-xl border-(--brand-3)">
                <img src={image} className="w-full rounded-xl h-48 object-cover" alt="collection" />
            </div>
            <p className="font-Geist text-(--black-5) font-medium text-md text-left w-full">
                {name}
            </p>
            <p className="font-Geist text-(--black-5) font-semibold text-md text-left w-full">
                ${price}
            </p>
            <div className="flex flex-row justify-center gap-2 w-full">
                <SecButton text="Ready to Sell" />
                <SecButton text="Add to Wishlist" />
            </div>
        </div>
    )
}