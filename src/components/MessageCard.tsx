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
        <div className={`flex flex-row justify-start items-start gap-4 w-full border-1 border-(--brand-3) rounded-xl p-2 ${isRead ? 'bg-inherit' : 'bg-white'}`}>
            <div className="border-1 border-(--brand-3) rounded-xl w-32 h-32 sm:w-32 sm:h-32">
               <img src={image} alt="snap" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-3 overflow-hidden max-h-32 h-full sm:max-h-40">
                <div className="flex-1 flex flex-col justify-start items-start gap-1 w-full">
                {!isRead && (<div className="w-fit px-2 py-1 rounded-full bg-(--brand-6) text-md font-medium text-white">
                    New Message
                </div>)}
                <p className={`w-full text-left font-Geist text-lg text-(--black-5) text-nowrap ${isRead ? 'font-normal' : 'font-semibold'}`}>
                    {title}
                </p>
                <p className="w-full flex text-left font-Geist text-md font-normal text-(--black-4) ">
                    {time}
                </p>
                </div>
                <p className="w-full flex flex-1 overflow-clip text-left font-Geist text-md font-normal text-(--black-4) ">
                    {messageContent}
                </p>
            </div>
        </div>
    )
}