'use client'
import { useState } from "react";

type Props = {
    tabNames: string[];
    onChange: (tab: string) => void;
    className?: string;
};

export default function Tab({ tabNames, onChange, className }: Props) {

    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);}

    return (
        <div className="flex flex-row justify-start items-center gap-4 w-fit">
            {tabNames.map((tab, index) => (
                <div key={index} onClick={() => {
                    handleTabClick(tab) 
                    onChange(tab)
                }} className={`cursor-pointer flex flex-col py-1 w-fit border-b-4 ${tab === activeTab ? 'border-(--black-5)' : 'border-(--black-3)'} ${className}`} >
                    <p className={`text-xl font-abril-fatface ${tab === activeTab ? 'text-(--black-5)' : 'text-(--black-3)'}`}>
                        {tab}
                    </p>
                </div>
            ))}
        </div>
    );
}