"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Target, RefreshCw } from "lucide-react"

const optionsData = [
  {
    strike: 19500,
    callLTP: 245.5,
    callChange: +12.3,
    callVolume: 45678,
    callOI: 123456,
    putLTP: 89.75,
    putChange: -5.2,
    putVolume: 34567,
    putOI: 98765,
    itm: false,
  },
  {
    strike: 19550,
    callLTP: 198.25,
    callChange: +8.45,
    callVolume: 56789,
    callOI: 145678,
    putLTP: 112.3,
    putChange: -3.15,
    putVolume: 43210,
    putOI: 87654,
    itm: false,
  },
  {
    strike: 19600,
    callLTP: 156.75,
    callChange: +6.2,
    callVolume: 67890,
    callOI: 167890,
    putLTP: 138.9,
    putChange: -1.85,
    putVolume: 54321,
    putOI: 76543,
    itm: false,
  },
  {
    strike: 19650,
    callLTP: 118.4,
    callChange: +4.15,
    callVolume: 78901,
    callOI: 189012,
    putLTP: 168.25,
    putChange: +2.45,
    putVolume: 65432,
    putOI: 65432,
    itm: true, // ATM
  },
  {
    strike: 19700,
    callLTP: 85.6,
    callChange: +2.3,
    callVolume: 89012,
    callOI: 201234,
    putLTP: 201.75,
    putChange: +8.9,
    putVolume: 76543,
    putOI: 54321,
    itm: true,
  },
  {
    strike: 19750,
    callLTP: 58.9,
    callChange: +1.25,
    callVolume: 90123,
    callOI: 223456,
    putLTP: 238.4,
    putChange: +15.6,
    putVolume: 87654,
    putOI: 43210,
    itm: true,
  },
  {
    strike: 19800,
    callLTP: 38.75,
    callChange: +0.85,
    callVolume: 101234,
    callOI: 245678,
    putLTP: 278.9,
    putChange: +22.3,
    putVolume: 98765,
    putOI: 32109,
    itm: true,
  },
]

const expiryDates = [
  { value: "2024-01-25", label: "25 Jan 2024 (7 days)" },
  { value: "2024-02-01", label: "01 Feb 2024 (14 days)" },
  { value: "2024-02-29", label: "29 Feb 2024 (42 days)" },
  { value: "2024-03-28", label: "28 Mar 2024 (70 days)" },
]

export default function OptionsPage() {
  const [selectedExpiry, setSelectedExpiry] = useState("2024-01-25")
  const [selectedSymbol, setSelectedSymbol] = useState("NIFTY")
  const [spotPrice] = useState(19674.25)

  const maxCallOI = Math.max(...optionsData.map((d) => d.callOI))
  const maxPutOI = Math.max(...optionsData.map((d) => d.putOI))

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Options Chain</h1>
          <p className="text-gray-600 mt-2">Live options data with Greeks and analytics</p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Symbol:</label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NIFTY">NIFTY</SelectItem>
                    <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                    <SelectItem value="FINNIFTY">FINNIFTY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Expiry:</label>
                <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {expiryDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  Spot: ₹{spotPrice.toLocaleString()}
                </Badge>
              </div>

              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options Chain Table */}
        <Card>
          <CardHeader>
            <CardTitle>Options Chain - {selectedSymbol}</CardTitle>
            <CardDescription>
              Live options data for {expiryDates.find((d) => d.value === selectedExpiry)?.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center bg-green-50">OI</TableHead>
                    <TableHead className="text-center bg-green-50">Volume</TableHead>
                    <TableHead className="text-center bg-green-50">Change</TableHead>
                    <TableHead className="text-center bg-green-50">LTP</TableHead>
                    <TableHead className="text-center font-bold">Strike</TableHead>
                    <TableHead className="text-center bg-red-50">LTP</TableHead>
                    <TableHead className="text-center bg-red-50">Change</TableHead>
                    <TableHead className="text-center bg-red-50">Volume</TableHead>
                    <TableHead className="text-center bg-red-50">OI</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-center text-xs bg-green-50">CALL</TableHead>
                    <TableHead className="text-center text-xs bg-green-50">CALL</TableHead>
                    <TableHead className="text-center text-xs bg-green-50">CALL</TableHead>
                    <TableHead className="text-center text-xs bg-green-50">CALL</TableHead>
                    <TableHead className="text-center text-xs">PRICE</TableHead>
                    <TableHead className="text-center text-xs bg-red-50">PUT</TableHead>
                    <TableHead className="text-center text-xs bg-red-50">PUT</TableHead>
                    <TableHead className="text-center text-xs bg-red-50">PUT</TableHead>
                    <TableHead className="text-center text-xs bg-red-50">PUT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optionsData.map((row) => (
                    <TableRow key={row.strike} className={row.strike === 19650 ? "bg-yellow-50 border-yellow-200" : ""}>
                      {/* Call OI */}
                      <TableCell className="text-center bg-green-50/50">
                        <div className="relative">
                          <div
                            className="absolute inset-0 bg-green-200 opacity-30"
                            style={{ width: `${(row.callOI / maxCallOI) * 100}%` }}
                          />
                          <span className="relative text-sm">{row.callOI.toLocaleString()}</span>
                        </div>
                      </TableCell>

                      {/* Call Volume */}
                      <TableCell className="text-center bg-green-50/50 text-sm">
                        {row.callVolume.toLocaleString()}
                      </TableCell>

                      {/* Call Change */}
                      <TableCell className="text-center bg-green-50/50">
                        <span className={`text-sm ${row.callChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {row.callChange >= 0 ? "+" : ""}
                          {row.callChange}
                        </span>
                      </TableCell>

                      {/* Call LTP */}
                      <TableCell className="text-center bg-green-50/50 font-medium">₹{row.callLTP}</TableCell>

                      {/* Strike Price */}
                      <TableCell className="text-center font-bold text-lg">
                        {row.strike === 19650 && (
                          <Badge variant="secondary" className="mr-2">
                            ATM
                          </Badge>
                        )}
                        {row.strike}
                      </TableCell>

                      {/* Put LTP */}
                      <TableCell className="text-center bg-red-50/50 font-medium">₹{row.putLTP}</TableCell>

                      {/* Put Change */}
                      <TableCell className="text-center bg-red-50/50">
                        <span className={`text-sm ${row.putChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {row.putChange >= 0 ? "+" : ""}
                          {row.putChange}
                        </span>
                      </TableCell>

                      {/* Put Volume */}
                      <TableCell className="text-center bg-red-50/50 text-sm">
                        {row.putVolume.toLocaleString()}
                      </TableCell>

                      {/* Put OI */}
                      <TableCell className="text-center bg-red-50/50">
                        <div className="relative">
                          <div
                            className="absolute inset-0 bg-red-200 opacity-30"
                            style={{ width: `${(row.putOI / maxPutOI) * 100}%` }}
                          />
                          <span className="relative text-sm">{row.putOI.toLocaleString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Options Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Call Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Max Call OI</span>
                <span className="font-medium">19800 Strike</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Call Put Ratio</span>
                <span className="font-medium">0.85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Call Unwinding</span>
                <span className="font-medium text-red-600">19500, 19550</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                Put Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Max Put OI</span>
                <span className="font-medium">19600 Strike</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Put Writing</span>
                <span className="font-medium text-green-600">19650, 19700</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Put Unwinding</span>
                <span className="font-medium text-red-600">19750, 19800</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-500" />
                Key Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Support</span>
                <span className="font-medium text-green-600">19600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resistance</span>
                <span className="font-medium text-red-600">19750</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Range</span>
                <span className="font-medium">19600 - 19750</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
