type RareRateProps = {
    rarerate: number;
    iconsize: string;
}

export default function RareRate({rarerate, iconsize}: RareRateProps) {

    return (
        <>
            <div className="flex flex-col justify-center items-start gap-2 font-Geist  text-(--black-5)">
                <p className="text-md font-normal">
                    RareRate
                </p>
                <div className={`flex flex-row items-center justify-start gap-2 `}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <img className={`${iconsize}`} key={index} src={index < rarerate ? "/Polygon.svg" : "/PolygonLight.svg"} alt="Polygon" />
                    ))}
                </div>
            </div>
        </>
    )
}