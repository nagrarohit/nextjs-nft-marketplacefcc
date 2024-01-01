import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"

export default function Home() {
    const { chainId, isWeb3Enabled } = useMoralis()

    // Check if chainId is available before proceeding
    if (!isWeb3Enabled || !chainId) {
        return <div>Web3 Currently Not Enabled</div>
    }

    const chainString = parseInt(chainId).toString()
    const marketplaceAddress = networkMapping[chainString]?.NftMarketplace?.[0]

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    return (
        <div className="container mx-auto mb-10">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap justify-center">
                {loading || !listedNfts ? (
                    <div>Loading...</div>
                ) : (
                    listedNfts.activeItems.map((nft, index) => {
                        const { price, nftAddress, tokenId, seller } = nft
                        return marketplaceAddress ? (
                            <div className="m-4" key={`${nftAddress}${tokenId}`}>
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                />
                            </div>
                        ) : (
                            <div className="m-4" key={index}>
                                <div>Network error, please switch to Eth Sepolia network. </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
