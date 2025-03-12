import { ParticlesBackground } from "@/components/particles-background"
import { GenerationStatistics } from "@/components/generation-statistics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, Search, Trash2 } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Generation History</h1>
        <p className="text-muted-foreground">View and manage your previous generations</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Generations</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search history..." className="pl-8 w-[200px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Images</SelectItem>
                    <SelectItem value="saved">Saved Only</SelectItem>
                    <SelectItem value="shared">Shared Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid">
                <div className="mb-4 flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export History
                  </Button>
                </div>

                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="group relative aspect-square overflow-hidden rounded-md border">
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Image+${i + 1}`}
                          alt={`Generated image ${i + 1}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary">
                              View
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="truncate">
                            {i % 2 === 0 ? "Landscape with mountains" : "Portrait of a character"}
                          </div>
                          <div className="flex items-center gap-1 text-white/70">
                            <Clock className="h-3 w-3" />
                            {i < 5 ? "Today" : i < 10 ? "Yesterday" : `${i - 9} days ago`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  <div className="space-y-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-md border p-3 hover:bg-muted/50">
                        <img
                          src={`/placeholder.svg?height=80&width=80&text=Image+${i + 1}`}
                          alt={`Generated image ${i + 1}`}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">
                            {i % 2 === 0 ? "Landscape with mountains" : "Portrait of a character"}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            Prompt: A {i % 2 === 0 ? "beautiful landscape" : "detailed portrait"} with{" "}
                            {i % 3 === 0 ? "mountains" : "ocean"} in the background, detailed, high quality
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {i < 5 ? "Today" : i < 10 ? "Yesterday" : `${i - 9} days ago`}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {`${10 + i}:${i < 10 ? "0" + i : i} AM`}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <GenerationStatistics />
        </div>
      </div>
    </div>
  )
}

