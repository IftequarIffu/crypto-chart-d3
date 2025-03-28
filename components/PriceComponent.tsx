// import React from 'react'
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
// import { COINGECKO_API_URL } from '@/lib/constants'

// const PriceComponent = () => {

//     const { isPending, error, data: coinPriceData } = useQuery({
//         queryKey: [`price`],
//         queryFn: async () => {
//             const res = await axios.get(`${COINGECKO_API_URL}/api/v3/coins/bitcoin`)
//             // console.log("API call made")
//             // const transformedData = transformWholeData(res.data)
//             const currentPrice = res.data.market_data.current_price.usd
//             const priceChange24hr = res.data.market_data.price_change_24h
//             const priceChangePerc24hr = res.data.market_data.price_change_percentage_24h
//             return {
//                 currentPrice,
//                 priceChange24hr,
//                 priceChangePerc24hr
//             }
//         },
//         staleTime: 2*60*1000,
//         refetchInterval: 60*1000,
//         notifyOnChangeProps: "all",
//       })




//   return (
//     {
//         coinData && 
//         <div className="space-y-1 font-semibold">
//             <div className="flex gap-1 items-start">
//                 <h1 className="text-4xl">{convertIntegerToCommaFormat(coinData?.currentPrice)}</h1>
//                 <p className="text-gray-600/50 font-semibold ">USD</p>
//             </div>
//             <div className={`flex gap-1 text-sm font-semibold ${coinData?.priceChange24hr > 0 ? "text-green-600" : "text-red-600"}`}>
//                 <p>
//                     {coinData?.priceChange24hr > 0 && "+"}
//                     {coinData?.priceChange24hr.toFixed(2)}
//                 </p>
//                 <p>({coinData?.priceChangePerc24hr.toFixed(2)}%)</p>
//             </div>

//         </div>
//     }
//   )
// }

// export default PriceComponent