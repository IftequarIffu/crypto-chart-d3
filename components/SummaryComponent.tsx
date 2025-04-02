import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function SummaryComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Market Overview</CardTitle>
          <CardDescription>Current market status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Market Sentiment</span>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Bullish</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-medium">$1.02 Trillion</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">24h Trading Volume</span>
              <span className="font-medium">$42.5 Billion</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">BTC Dominance</span>
              <span className="font-medium">48.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Price Metrics</CardTitle>
          <CardDescription>Key price indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between border-b border-muted pb-2">
              <span className="text-sm font-medium">Highest Price</span>
              <span className="font-medium text-[#4b40ee]">$82347</span>
            </div>
            <div className="flex items-center justify-between border-b border-muted pb-2">
              <span className="text-sm font-medium">Lowest Price</span>
              <span className="font-medium text-[#4b40ee]">$37987</span>
            </div>
            <div className="flex items-center justify-between border-b border-muted pb-2">
              <span className="text-sm font-medium">Average Price</span>
              <span className="font-medium text-[#4b40ee]">
                $65436
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price Change</span>
              <span className={`font-medium text-emerald-500 `}>
                +25.00%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Market Summary</CardTitle>
          <CardDescription>Recent performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm font-medium mb-2">30-Day Performance</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-muted-foreground/20">
                  <div className="h-full w-[65%] rounded-full bg-[#4b40ee]"></div>
                </div>
                <span className="text-sm font-medium">+25%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

