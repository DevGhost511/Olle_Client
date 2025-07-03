'use client'
import { time } from "console";
import { useState } from "react";

type MessageCardProps = {
    image: string;
    title: string;
    messageContent: string;
    isRead?: boolean;
    category : string;
    time : string;
}

export default function MessageCard ({image, title, messageContent, isRead, category, time}: MessageCardProps) {

    return (
        <div className={`flex flex-row justify-start items-center gap-4 w-full border-1 border-(--brand-3) rounded-xl p-2 ${isRead ? 'bg-inherit' : 'bg-white'}`}>
            <div className="border-1 border-(--brand-3) rounded-xl w-24 h-24 sm:w-32 sm:h-32">
               <img src={image} alt="snap" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-2 overflow-hidden max-h-24 h-full sm:max-h-40">
                {!isRead && (<div className="w-fit px-2 py-1 rounded-full bg-(--brand-6) text-md font-medium text-white">
                    New Message
                </div>)}
                <p className={`w-full text-left font-Geist text-lg text-(--black-5) text-nowrap ${isRead ? 'font-normal' : 'font-semibold'}`}>
                    {title}
                </p>
                <p>
                    {time}
                </p>
                
                <p className="w-full flex flex-1 text-left font-Geist text-md font-normal text-(--black-4) ">
                    {messageContent}
                </p>
            </div>
        </div>
    )
}