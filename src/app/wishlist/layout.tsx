import Menu from "@/components/Menu";
import ProtectPage from "@/components/ProtectPage";

const WishListLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectPage>
            <div className="flex flex-col sm:max-w-6xl w-screen h-dvh pt-2 sm:py-12 sm:px-12 mx-auto">
                <div className="flex flex-row justify-between items-center px-4 sm:px-0">
                    <Menu collapse={false} />
                </div>
                {children}
            </div>
        </ProtectPage>
    )
}

export default WishListLayout;