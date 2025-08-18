'use client'
import { useState } from "react";

type Props = {
    tabNames: string[];
    onChange: (tab: string) => void;
    className?: string;
    containerClassName?: string;
    badgeCounts?: { [key: string]: number };
};

export default function Tab({ tabNames, onChange, className, containerClassName, badgeCounts }: Props) {

    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);}

    return (
        <div className={`flex flex-row ${containerClassName}`}>
            {tabNames.map((tab, index) => (
                <div key={index} onClick={() => {
                    handleTabClick(tab) 
                    onChange(tab)
                }} className={`cursor-pointer flex flex-col py-1 w-fit border-b-4 ${tab === activeTab ? 'border-(--black-5)' : 'border-(--black-3)'} ${className}`} >
                    <div className="flex flex-row items-center gap-2">
                        <p className={`text-xl font-abril-fatface ${tab === activeTab ? 'text-(--black-5)' : 'text-(--black-3)'}`}>
                            {tab}
                        </p>
                        {badgeCounts && badgeCounts[tab] !== undefined && (
                            <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${tab === activeTab ? 'text-white bg-(--black-5)' : 'text-(--black-4) bg-(--black-2)'}`}>
                                {badgeCounts[tab]}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}