'use client'

import { useState } from "react"
import Menu from "@/components/Menu"
import Tab from "@/components/Tab"
import MessageCard from "@/components/MessageCard"
import Snap from "@/components/Snap"

const tabNames = ["All", "Inquiries", "Matches"]

const Message = [
    {
        title: "We Found Philippe Naurilus 5711/1A !",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        image: "Assets/watch1.jpg",
        isRead: false,
        Category: "Inquiries",
        time: "9:00 am, Today"
    },
    {
        title: "We Found Philippe Naurilus 5711/1A !",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        image: "Assets/car2.jpg",
        isRead: true,
        Category: "Inquiries",
        time: "9:00 am, Today"

    },
    {
        title: "We Found Philippe Naurilus 5711/1A !",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        image: "Assets/watch2.jpg",
        isRead: true,
        Category: "Matches",
        time: "9:00 am, Today"


    },
    {
        title: "We Found Philippe Naurilus 5711/1A !",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        image: "Assets/watch3.jpg",
        isRead: true,
        Category: "Matches",
        time: "9:00 am, Today"


    },
    {
        title: "We Found Philippe Naurilus 5711/1A !",
        messageContent: "We found a Philippe Naurilus 5711/1A in your area. Would you like to see it?",
        image: "Assets/car1.jpg",
        isRead: true,
        Category: "Matches",
        time: "9:00 am, Today"


    },
]

export default function Inbox() {

    const [activeTab, setActiveTab] = useState(tabNames[0]);
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-screen pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className="px-4 sm:px-0 w-full">
                <Menu collapse={false} />
            </div>
            <p className="font-abril-fatface text-xl text-(--black-5) text-center py-4 sm:py-10">
                My Inbox
            </p>
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-0">
                <Tab onChange={handleTabChange} tabNames={tabNames} className="my-2 sm:my-4" />
            </div>
            <div className="flex flex-1 overflow-auto flex-col w-full">
                <div className="flex flex-1 flex-col overflow-auto w-full gap-2 px-4 sm:px-0">
                    {Message.map((message, index) => {
                        if (message.Category === activeTab)
                            return (
                                <MessageCard time={message.time} image={message.image} title={message.title} messageContent={message.messageContent} isRead={message.isRead} category={message.Category} />
                            )
                        else if (activeTab === "All")
                            return (
                                <MessageCard time={message.time} image={message.image} title={message.title} messageContent={message.messageContent} isRead={message.isRead} category={message.Category} />
                            )

                        else return null;
                    })}


                </div>

            </div>
            <div className="w-full px-4 pt-4 pb-6 sm:p-0 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap />

            </div>
        </div>
    )
}