import SecButton from "./SecButton";
import { useState, useEffect, useRef } from "react";

type Props = {
    name: string,
    image: string,
    price: {min: number, max: number},
    className?: string,
    onClick?: () => void,
    onEdit?: () => void,
    onDelete?: () => void
}

export default function CollectionCard({ name, image, price, className, onClick, onEdit, onDelete }: Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleDropdownToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when clicking dropdown
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(false);
        onEdit?.();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(false);
        onDelete?.();
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${className}`} >
            <div className="w-full border-1 relative rounded-xl border-(--brand-3) cursor-pointer" onClick={onClick}>
                {/* Dropdown button */}
                <div className="absolute top-2 right-2" ref={dropdownRef}>
                    <button
                        onClick={handleDropdownToggle}
                        className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
                        aria-label="Options menu"
                    >
                        <svg
                            className="w-4 h-4 sm:w-4 sm:h-4 text-(--black-5)"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="5" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="12" cy="19" r="2"/>
                        </svg>
                    </button>
                    
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white border border-(--brand-3) rounded-lg shadow-xl py-1 min-w-28 z-30">
                            <button
                                onClick={handleEdit}
                                className="w-full px-4 py-3 text-left text-sm sm:text-sm text-(--black-5) hover:bg-(--brand-2) active:bg-(--brand-2) transition-colors duration-150 touch-manipulation"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full px-4 py-3 text-left text-sm sm:text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 touch-manipulation"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                
                <img src={image} className="w-full rounded-xl h-48 object-cover" alt="collection" />
            </div>
            <p className="font-Geist text-(--black-5) font-medium text-md text-left w-full">
                {name}
            </p>
            <p className="font-Geist text-(--black-5) font-semibold text-md text-left w-full">
                ${price.min} - ${price.max}
            </p>
            <div className="flex flex-row justify-center gap-2 w-full">
                <SecButton text="Ready to Sell" />
                <SecButton text="Add to Wishlist" />
            </div>
        </div>
    )
}