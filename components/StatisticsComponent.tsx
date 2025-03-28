import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


const StatisticsComponent = () => {
  return (
    <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200 mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Volume Categories</CardTitle>
          <CardDescription>Trading volume distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#4b40ee]"></div>
                  <span className="text-sm font-medium">Low Volume</span>
                </div>
                <Badge variant="outline" className="bg-muted/50">
                  24%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="h-full w-[24%] rounded-full bg-[#4b40ee]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#6d64f0]"></div>
                  <span className="text-sm font-medium">Medium Volume</span>
                </div>
                <Badge variant="outline" className="bg-muted/50">
                  32%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="h-full w-[32%] rounded-full bg-[#6d64f0]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#8f88f2]"></div>
                  <span className="text-sm font-medium">High Volume</span>
                </div>
                <Badge variant="outline" className="bg-muted/50">
                  28%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="h-full w-[28%] rounded-full bg-[#8f88f2]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#b1acf5]"></div>
                  <span className="text-sm font-medium">Very High Volume</span>
                </div>
                <Badge variant="outline" className="bg-muted/50">
                  16%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="h-full w-[16%] rounded-full bg-[#b1acf5]"></div>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground">Based on 30-day trading volume</div>
          </div>
        </CardContent>
      </Card>
  )
}

export default StatisticsComponent