import { ConnectButton } from "web3uikit"
import Link from "next/link"
export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
                <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center">
                <Link href="/" className="block md:inline-block mr-4 mb-2 md:mb-0 p-2 md:p-4">
                    Home
                </Link>
                <Link
                    href="/sell-nft"
                    className="block md:inline-block mr-4 mb-2 md:mb-0 p-2 md:p-4"
                >
                    Sell page
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
