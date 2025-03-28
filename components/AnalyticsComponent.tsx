import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function AnalyticsComponent(){
  return (
    <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200 mt-6 mb-[190px]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Technical Indicators</CardTitle>
          <CardDescription>Analysis of key technical indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Moving Averages</h4>
                <Badge className="bg-emerald-500">BUY</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MA7</span>
                  <span className="font-medium">
                    $51,450
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MA30</span>
                  <span className="font-medium">
                    $49,875
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MA90</span>
                  <span className="font-medium">
                    $48,300
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Oscillators</h4>
                <Badge className="bg-yellow-500 text-black">NEUTRAL</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">RSI (14)</span>
                  <span className="font-medium">58.3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MACD</span>
                  <span className="font-medium text-emerald-500">Bullish</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stoch RSI</span>
                  <span className="font-medium text-red-500">Overbought</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Pivot Points</h4>
                <Badge className="bg-[#4b40ee]">STANDARD</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">S3</span>
                  <span className="font-medium">
                    $49,350
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pivot</span>
                  <span className="font-medium">
                    $52,500
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">R3</span>
                  <span className="font-medium">
                    $55,650
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
