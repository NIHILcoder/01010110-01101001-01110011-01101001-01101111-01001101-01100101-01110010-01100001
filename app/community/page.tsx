import {
  Trophy,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Filter,
  Flame,
  Calendar,
  Award,
  Users,
  BookOpen,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParticlesBackground } from "@/components/particles-background"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CommunityPage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Community Hub</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="portraits">Portraits</SelectItem>
                <SelectItem value="landscapes">Landscapes</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="scifi">Sci-Fi</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search artworks..." className="pl-8 w-[200px]" />
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">Explore creations from the VisioMera community</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Featured Competitions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Sci-Fi Landscapes",
              image: "/placeholder.svg?height=300&width=500&text=Sci-Fi+Landscapes",
              deadline: "3 days left",
              entries: 128,
              prize: "$500",
            },
            {
              title: "Character Design Challenge",
              image: "/placeholder.svg?height=300&width=500&text=Character+Design",
              deadline: "1 week left",
              entries: 87,
              prize: "$300",
            },
            {
              title: "Abstract Emotions",
              image: "/placeholder.svg?height=300&width=500&text=Abstract+Emotions",
              deadline: "2 days left",
              entries: 156,
              prize: "$400",
            },
          ].map((competition, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative aspect-video">
                <img
                  src={competition.image || "/placeholder.svg"}
                  alt={competition.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold text-white">{competition.title}</h3>
                  <p className="text-sm text-white/80">Prize: {competition.prize}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-black/50">
                      <Clock className="mr-1 h-3 w-3" />
                      {competition.deadline}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/50">
                      <Trophy className="mr-1 h-3 w-3" />
                      {competition.entries} entries
                    </Badge>
                  </div>
                </div>
              </div>
              <CardFooter className="p-4">
                <Button className="w-full">Enter Competition</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Community Gallery</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trending">
          <TabsList className="mb-4">
            <TabsTrigger value="trending">
              <Flame className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="newest">
              <Calendar className="mr-2 h-4 w-4" />
              Newest
            </TabsTrigger>
            <TabsTrigger value="top">
              <Award className="mr-2 h-4 w-4" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="collaborations">
              <Users className="mr-2 h-4 w-4" />
              Collaborations
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <BookOpen className="mr-2 h-4 w-4" />
              Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-0">
            <div className="image-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer group">
                      <div className="aspect-square">
                        <img
                          src={`/placeholder.svg?height=300&width=300&text=Artwork+${i + 1}`}
                          alt={`Artwork ${i + 1}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={`/placeholder.svg?height=24&width=24&text=U`}
                              alt="User avatar"
                              className="h-6 w-6 rounded-full"
                            />
                            <span className="text-sm font-medium">User {i + 1}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-3 pt-0">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          <span className="text-xs">{Math.floor(Math.random() * 20)}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Share2 className="mr-1 h-4 w-4" />
                          <span className="text-xs">Share</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Artwork Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <img
                          src={`/placeholder.svg?height=600&width=600&text=Artwork+${i + 1}`}
                          alt={`Artwork ${i + 1}`}
                          className="w-full rounded-md object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold">Artwork Title {i + 1}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created by User {i + 1} • {Math.floor(Math.random() * 10) + 1} days ago
                          </p>
                        </div>
                        <p>
                          This is a detailed description of the artwork. The artist used various techniques and styles
                          to create this unique piece.
                        </p>
                        <div>
                          <h4 className="text-sm font-medium">Prompt</h4>
                          <p className="text-sm text-muted-foreground">
                            A {i % 2 === 0 ? "futuristic" : "fantasy"} scene with {i % 3 === 0 ? "mountains" : "ocean"}{" "}
                            in the background, detailed, high quality, 8k
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Fantasy</Badge>
                          <Badge variant="outline">Portrait</Badge>
                          <Badge variant="outline">Digital Art</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Heart className="mr-2 h-4 w-4" />
                            Like
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                        <div className="rounded-md border p-3">
                          <h4 className="mb-2 text-sm font-medium">Comments</h4>
                          <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, j) => (
                              <div key={j} className="flex gap-2">
                                <img
                                  src={`/placeholder.svg?height=32&width=32&text=U${j}`}
                                  alt="User avatar"
                                  className="h-8 w-8 rounded-full"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">User {j + 1}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {Math.floor(Math.random() * 24) + 1}h ago
                                    </span>
                                  </div>
                                  <p className="text-sm">
                                    Amazing work! I love the {j % 2 === 0 ? "colors" : "composition"}.
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="newest" className="mt-0">
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Switch to the "Trending" tab to see example content</p>
            </div>
          </TabsContent>

          <TabsContent value="top" className="mt-0">
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Switch to the "Trending" tab to see example content</p>
            </div>
          </TabsContent>

          <TabsContent value="collaborations" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={`/placeholder.svg?height=300&width=500&text=Collaboration+${i + 1}`}
                      alt={`Collaboration ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">Collaborative Project {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">
                      A joint project between multiple artists exploring{" "}
                      {i % 2 === 0 ? "futuristic landscapes" : "fantasy characters"}
                    </p>
                    <div className="mt-2 flex -space-x-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <img
                          key={j}
                          src={`/placeholder.svg?height=32&width=32&text=U${j}`}
                          alt={`Collaborator ${j + 1}`}
                          className="h-8 w-8 rounded-full border-2 border-background"
                        />
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                        +2
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">View Project</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={`/placeholder.svg?height=300&width=500&text=Tutorial+${i + 1}`}
                      alt={`Tutorial ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">
                      {i % 3 === 0
                        ? "Mastering Prompt Engineering"
                        : i % 3 === 1
                          ? "Advanced LoRA Techniques"
                          : "Creating Photorealistic Portraits"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      By Expert User {i + 1} • {Math.floor(Math.random() * 10) + 1} days ago
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        {Math.floor(Math.random() * 20) + 5} min
                      </Badge>
                      <Badge variant="secondary">
                        <BookOpen className="mr-1 h-3 w-3" />
                        {i % 2 === 0 ? "Beginner" : "Advanced"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">View Tutorial</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

