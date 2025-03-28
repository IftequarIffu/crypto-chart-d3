'use client'
import AreaChart from "@/components/AreaChart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {

  function transformWholeData(data: any) {
    const transformedData =  []
  
    for(let i=0; i<data.prices.length; i++) {
      transformedData.push({
        "timeStamp": data.prices[i][0],
        "price": data.prices[i][1],
        "volume": data.total_volumes[i][1]
      })
    }
  
    return transformedData
  }
  

  const { isPending, error, data } = useQuery({
    queryKey: [`timeRange-270`],
    queryFn: async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=270`)
        // console.log("API call made")
        const transformedData = transformWholeData(res.data)
        return transformedData
    },
    staleTime: 5*60*1000,
    refetchInterval: 5*60*1000,
    notifyOnChangeProps: "all",
  })



  return (
    <div className="w-full h-screen flex items-center justify-center bg-white text-black">
        <div>
            <AreaChart data={data} />
          </div>
       
    </div>
  );
}
