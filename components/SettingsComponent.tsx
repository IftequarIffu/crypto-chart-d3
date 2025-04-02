"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function SettingsComponent() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [dataRefresh, setDataRefresh] = useState("5")

  const { setTheme } = useTheme()

  return (
    <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-200 mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">General Settings</CardTitle>
        <CardDescription>Manage your dashboard preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="notifications" className="flex flex-col space-y-1">
            <span>Notifications</span>
            <span className="font-normal text-xs text-muted-foreground">
              Receive notifications about price changes
            </span>
          </Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
            className="data-[state=checked]:bg-[#4b40ee]"
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
            <span>Dark Mode</span>
            <span className="font-normal text-xs text-muted-foreground">Toggle between light and dark theme</span>
          </Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={() => {
              if (darkMode) {
                setTheme("light")
                setDarkMode(false)
              }
              else {
                setTheme("dark")
                setDarkMode(true)
              }
            }}
            className="data-[state=checked]:bg-[#4b40ee]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="refresh-rate">Data Refresh Rate</Label>
          <Select value={dataRefresh} onValueChange={setDataRefresh}>
            <SelectTrigger id="refresh-rate" className="border-muted-foreground/20 bg-card">
              <SelectValue placeholder="Select refresh rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Every 1 minute</SelectItem>
              <SelectItem value="5">Every 5 minutes</SelectItem>
              <SelectItem value="15">Every 15 minutes</SelectItem>
              <SelectItem value="30">Every 30 minutes</SelectItem>
              <SelectItem value="60">Every hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-[#4b40ee] hover:bg-[#4b40ee]/90">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

