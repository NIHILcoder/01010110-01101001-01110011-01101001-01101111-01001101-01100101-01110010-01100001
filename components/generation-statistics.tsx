"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type definition for chart tooltip context
interface ChartTooltipContext {
  label?: string;
  raw?: number;
  formattedValue?: string;
  dataset?: {
    label?: string;
  };
  dataIndex?: number;
}

export function GenerationStatistics() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("week")

  // Mock data for charts
  const generationData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Generations",
        data: [12, 19, 8, 15, 12, 25, 18],
        backgroundColor: "hsl(var(--primary) / 0.5)",
        borderColor: "hsl(var(--primary))",
        borderWidth: 2,
      },
    ],
  }

  const modelUsageData = {
    labels: ["Flux Realistic", "Anime Diffusion", "Dreamshaper", "Realistic Vision", "Other"],
    datasets: [
      {
        label: "Model Usage",
        data: [35, 25, 15, 20, 5],
        backgroundColor: [
          "hsl(var(--primary) / 0.7)",
          "hsl(var(--primary) / 0.6)",
          "hsl(var(--primary) / 0.5)",
          "hsl(var(--primary) / 0.4)",
          "hsl(var(--primary) / 0.3)",
        ],
        borderColor: "hsl(var(--background))",
        borderWidth: 2,
      },
    ],
  }

  const timeSpentData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Minutes Spent",
        data: [45, 60, 30, 75, 40, 90, 65],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generation Statistics</CardTitle>
            <CardDescription>Track your AI art generation activity</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={(value: "day" | "week" | "month" | "year") => setTimeRange(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generations">
            <TabsList className="mb-4">
              <TabsTrigger value="generations">Generations</TabsTrigger>
              <TabsTrigger value="models">Model Usage</TabsTrigger>
              <TabsTrigger value="time">Time Spent</TabsTrigger>
            </TabsList>

            <TabsContent value="generations" className="space-y-4">
              <div className="h-[300px]">
                <BarChart
                    data={generationData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Number of Generations",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Day of Week",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          mode: "index",
                          intersect: false,
                        },
                      },
                    }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Total Generations</div>
                  <div className="text-2xl font-bold">109</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Average Per Day</div>
                  <div className="text-2xl font-bold">15.6</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Most Active Day</div>
                  <div className="text-2xl font-bold">Saturday</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="models">
              <div className="h-[300px]">
                <PieChart
                    data={modelUsageData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                        },
                        tooltip: {
                          callbacks: {
                            label: (context: ChartTooltipContext) => {
                              const label = context.label || "";
                              const value = context.raw || 0;
                              return `${label}: ${value}%`;
                            },
                          },
                        },
                      },
                    }}
                />
              </div>
            </TabsContent>

            <TabsContent value="time">
              <div className="h-[300px]">
                <LineChart
                    data={timeSpentData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Minutes",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Day of Week",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          mode: "index",
                          intersect: false,
                        },
                      },
                    }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Total Time</div>
                  <div className="text-2xl font-bold">405 min</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Average Per Day</div>
                  <div className="text-2xl font-bold">57.9 min</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Longest Session</div>
                  <div className="text-2xl font-bold">90 min</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  )
}