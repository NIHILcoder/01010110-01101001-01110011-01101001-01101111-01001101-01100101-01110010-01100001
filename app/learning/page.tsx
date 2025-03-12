import { ParticlesBackground } from "@/components/particles-background"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, Star, Users, Video } from "lucide-react"

export default function LearningPage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <p className="text-muted-foreground">Tutorials, guides, and resources to help you master AI art generation</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Featured Tutorials</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Getting Started with VisioMera",
              image: "/placeholder.svg?height=300&width=500&text=Getting+Started",
              duration: "15 min",
              level: "Beginner",
              author: "VisioMera Team",
            },
            {
              title: "Advanced Prompt Engineering",
              image: "/placeholder.svg?height=300&width=500&text=Prompt+Engineering",
              duration: "25 min",
              level: "Intermediate",
              author: "Prompt Expert",
            },
            {
              title: "Mastering LoRA Models",
              image: "/placeholder.svg?height=300&width=500&text=LoRA+Models",
              duration: "35 min",
              level: "Advanced",
              author: "AI Artist Pro",
            },
          ].map((tutorial, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative aspect-video">
                <img
                  src={tutorial.image || "/placeholder.svg"}
                  alt={tutorial.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <Badge className="absolute left-2 top-2 bg-black/70">
                  <Video className="mr-1 h-3 w-3" />
                  Tutorial
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground">By {tutorial.author}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary">
                    <Clock className="mr-1 h-3 w-3" />
                    {tutorial.duration}
                  </Badge>
                  <Badge variant="secondary">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {tutorial.level}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Tutorial
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="guides">
          <TabsList className="mb-4">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="community">Community Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="mt-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Understanding Model Parameters",
                  description: "Learn how different parameters affect your generations",
                  category: "Technical",
                  readTime: "8 min",
                },
                {
                  title: "Creating Consistent Characters",
                  description: "Techniques for generating the same character across multiple images",
                  category: "Character Design",
                  readTime: "12 min",
                },
                {
                  title: "Effective Negative Prompts",
                  description: "How to use negative prompts to improve your results",
                  category: "Prompting",
                  readTime: "10 min",
                },
                {
                  title: "Composition Basics for AI Art",
                  description: "Apply traditional art composition rules to AI generation",
                  category: "Art Theory",
                  readTime: "15 min",
                },
                {
                  title: "Working with ControlNet",
                  description: "Guide to using ControlNet for precise control over generations",
                  category: "Advanced",
                  readTime: "20 min",
                },
                {
                  title: "Optimizing for Different Aspect Ratios",
                  description: "Tips for getting good results at various aspect ratios",
                  category: "Technical",
                  readTime: "7 min",
                },
              ].map((guide, index) => (
                <Card key={index} className="flex overflow-hidden">
                  <CardContent className="flex-1 p-4">
                    <Badge className="mb-2">{guide.category}</Badge>
                    <h3 className="font-bold">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {guide.readTime} read
                    </div>
                  </CardContent>
                  <div className="flex w-24 items-center justify-center bg-muted">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "AI Art Fundamentals",
                  description: "A comprehensive introduction to AI art generation",
                  lessons: 12,
                  duration: "3 hours",
                  level: "Beginner",
                  rating: 4.8,
                },
                {
                  title: "Professional AI Art Techniques",
                  description: "Advanced techniques for creating professional quality AI art",
                  lessons: 18,
                  duration: "5 hours",
                  level: "Intermediate",
                  rating: 4.9,
                },
                {
                  title: "Workflow Optimization",
                  description: "Streamline your AI art generation workflow",
                  lessons: 8,
                  duration: "2 hours",
                  level: "All Levels",
                  rating: 4.7,
                },
              ].map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Lessons</span>
                        <span className="font-medium">{course.lessons}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Level</span>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rating</span>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "VisioMera Discord Community",
                  description:
                    "Join our Discord server to connect with other AI artists, share your work, and get help",
                  members: "5,200+",
                  type: "Community",
                },
                {
                  title: "Weekly Prompt Challenge",
                  description: "Participate in our weekly prompt challenge to practice your skills and win prizes",
                  participants: "350+ weekly",
                  type: "Event",
                },
                {
                  title: "Model Showcase & Reviews",
                  description: "Community-driven reviews and showcases of the latest AI models",
                  contributors: "120+",
                  type: "Resource",
                },
                {
                  title: "Prompt Library",
                  description: "Browse and contribute to our community prompt library",
                  prompts: "2,500+",
                  type: "Resource",
                },
              ].map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <Badge className="w-fit">{resource.type}</Badge>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        {resource.members || resource.participants || resource.contributors || resource.prompts}{" "}
                        {resource.members
                          ? "members"
                          : resource.participants
                            ? "participants"
                            : resource.contributors
                              ? "contributors"
                              : "prompts"}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {resource.type === "Community"
                        ? "Join Community"
                        : resource.type === "Event"
                          ? "Participate"
                          : "Explore"}
                    </Button>
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

