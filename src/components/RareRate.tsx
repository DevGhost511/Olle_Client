type RareRateProps = {
    rarerate: number;
}

export default function RareRate({rarerate}: RareRateProps) {

    return (
        <>
            <div className="flex flex-col justify-center items-start gap-2 font-Geist  text-(--black-5)">
                <p className="text-lg font-normal">
                    Estimated Value
                </p>
                <div className="flex flex-row items-center justify-start gap-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <img key={index} src={index < rarerate ? "Polygon.svg" : "polygonLight.svg"} alt="Polygon" />
                    ))}
                </div>
            </div>
        </>
    )
}