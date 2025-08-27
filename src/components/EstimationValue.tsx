type EstimationValueProps = {
    min: number
    max: number
}

export default function EstimationValue ({min, max} : EstimationValueProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-start gap-2 font-Geist  text-(--black-5)">
                <p className="text-md font-normal">
                    Estimated Value
                </p>
                <p className=" text-xl font-abril-fatface">
                    ${min} - ${max}
                </p>
            </div>
        </>
    )

}