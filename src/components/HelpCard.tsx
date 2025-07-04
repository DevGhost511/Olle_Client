type HelpCardProps = {
    image: string;
    question: string;
    answer: string;
}

export default function HelpCard({ image, question, answer }: HelpCardProps) {
    return (
        <div className="hover:bg-white cursor-pointer flex flex-row w-full p-2 gap-4 justify-start items-start border-1 border-(--brand-3) rounded-xl">
            <div className="border-1 flex justify-center items-center border-(--brand-3) rounded-xl w-24 h-24 sm:w-24 sm:h-24 bg-white">
                <img src={image} alt="snap" />
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-3 overflow-hidden max-h-32 h-full sm:max-h-40">
                <div className="flex-1 flex flex-col justify-start items-start gap-3 overflow-hidden max-h-32 h-full sm:max-h-40">
                    <p className="w-full text-left font-Geist text-lg text-(--black-5) text-nowrap text-normal">
                        {question}
                    </p>
                    <p className="w-full flex flex-1 overflow-hidden text-left font-Geist text-md font-normal text-(--black-4) ">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}