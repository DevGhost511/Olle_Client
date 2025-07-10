'use client'

import Menu from "@/components/Menu"
import HelpCard from "@/components/HelpCard";
import Snap from "@/components/Snap";

const FAQ = [
    {
        question: "Track a Collectible ",
        answer: "Add an item to securely track its details and value.",
        image: "target.svg",
    },
    {
        question: "View Market Trends",
        answer: "Add an item to securely track its details and value.",
        image: "trend.svg",
    },
    {
        question: "Sell Discreetly",
        answer: "Add an item to securely track its details and value.",
        image: "sell.svg",
    },
    {
        question: "Message Concierge",
        answer: "Add an item to securely track its details and value.",
        image: "concierge.svg",
    }
]



export default function Page() {
    return (
        <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-2 sm:py-12 sm:px-12 mx-auto">
            <div className="px-4 sm:px-0 w-full">
                <Menu collapse={false} />
            </div>
            <p className="font-abril-fatface text-xl text-(--black-5) text-center py-8 px-4 sm:py-10">
                Help Center - What Would You Like to do?
            </p>
            <div className="flex flex-1 overflow-auto flex-col w-full">
                <div className="flex flex-1 flex-col overflow-auto w-full gap-2 px-4 sm:px-0">
                    {FAQ.map((faq, index) => {
                        return (
                            <HelpCard key={index} image={faq.image} question={faq.question} answer={faq.answer} />
                        )
                    })}

                </div>
            </div>
            <div className="w-full px-4 pt-4 pb-6 sm:p-0 sm:shadow-none bg-white sm:bg-inherit  shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02),0_-4px_6px_-2px_rgba(0,0,0,0.02)]">
                <Snap />

            </div>
        </div>
    )
}