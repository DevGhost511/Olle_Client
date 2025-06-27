
type ValuationProps = {
    value: number
}

export default function Valuation ({value} : ValuationProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-start gap-2 font-Geist  text-(--black-5)">
                <p className="text-lg font-normal">
                    Estimated Value
                </p>
                <p className=" text-2xl font-semibold">
                    ${value}
                </p>
            </div>
        </>
    )

}