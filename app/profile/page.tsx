import { ParticlesBackground } from "@/components/particles-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart, Image, Heart, Trophy, Users, Bookmark, Settings, Edit } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="/placeholder.svg?height=128&width=128&text=UN"
                alt="User profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <Button variant="secondary" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Name</h1>
              <p className="text-muted-foreground">@username</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">Artist</Badge>
                <Badge variant="outline">Designer</Badge>
                <Badge variant="outline">AI Enthusiast</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { title: "Generations", value: "248", icon: Image },
            { title: "Likes", value: "1.2K", icon: Heart },
            { title: "Competitions", value: "12", icon: Trophy },
            { title: "Followers", value: "356", icon: Users },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="portfolio">
          <TabsList className="mb-4">
            <TabsTrigger value="portfolio">
              <Image className="mr-2 h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="collections">
              <Bookmark className="mr-2 h-4 w-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="mr-2 h-4 w-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="image-grid">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-md">
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Artwork+${i + 1}`}
                        alt={`Artwork ${i + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            View
                          </Button>
                          <Button size="sm" variant="secondary">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collections" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {["Landscapes", "Portraits", "Abstract", "Sci-Fi", "Fantasy", "Favorites"].map(
                    (collection, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <img
                            src={`/placeholder.svg?height=200&width=400&text=${collection}`}
                            alt={collection}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{collection}</h3>
                          <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 20) + 5} items</p>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Activity Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Activity chart would be displayed here</p>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Created a new artwork",
                        time: "2 hours ago",
                        icon: Image,
                      },
                      {
                        action: "Entered the Sci-Fi Landscapes competition",
                        time: "1 day ago",
                        icon: Trophy,
                      },
                      {
                        action: "Received 24 likes on your artwork",
                        time: "2 days ago",
                        icon: Heart,
                      },
                      {
                        action: "Gained 5 new followers",
                        time: "3 days ago",
                        icon: Users,
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "First Creation",
                      description: "Created your first artwork",
                      unlocked: true,
                    },
                    {
                      title: "Popular Creator",
                      description: "Received 100+ likes on your artworks",
                      unlocked: true,
                    },
                    {
                      title: "Competition Winner",
                      description: "Won a community competition",
                      unlocked: false,
                    },
                    {
                      title: "Prolific Artist",
                      description: "Created 50+ artworks",
                      unlocked: true,
                    },
                    {
                      title: "Style Master",
                      description: "Used 10 different style presets",
                      unlocked: false,
                    },
                    {
                      title: "Community Pillar",
                      description: "Gained 500+ followers",
                      unlocked: false,
                    },
                  ].map((achievement, index) => (
                    <Card
                      key={index}
                      className={`border ${achievement.unlocked ? "bg-background" : "bg-muted/50 opacity-70"}`}
                    >
                      <CardContent className="p-4">
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Trophy
                            className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <Badge variant={achievement.unlocked ? "default" : "outline"} className="mt-2">
                          {achievement.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

