"use client";

import { useState, useEffect } from "react";
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
  SlidersHorizontal,
  Grid,
  Rows,
  ChevronDown,
  Sparkles,
  Star,
  Plus,
  Camera,
  Tag,
  Lightbulb,
  ThumbsUp,
  Eye,
  Play // Added Play icon import
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedParticlesBackground } from "@/components/enhanced-particles-background";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePreviewDialog } from "@/components/image-preview-dialog";
import {
  AnimatedCard,
  SparkleButton,
  AnimatedBadge,
  FloatingElement,
  StaggeredContainer
} from "@/components/animated-components";
import { cn } from "@/lib/utils";

export default function EnhancedCommunityGallery() {

  // State for UI controls
  const [viewMode, setViewMode] = useState<"grid" | "rows">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Mock data for the gallery
  const categories = [
    { id: "all", label: "All" },
    { id: "portraits", label: "Portraits" },
    { id: "landscapes", label: "Landscapes" },
    { id: "fantasy", label: "Fantasy" },
    { id: "scifi", label: "Sci-Fi" },
    { id: "abstract", label: "Abstract" },
    { id: "photorealistic", label: "Photorealistic" },
    { id: "anime", label: "Anime" },
    { id: "digital", label: "Digital Art" }
  ];

  const filters = {
    modelType: [
      { id: "all", label: "All Models" },
      { id: "flux", label: "Flux" },
      { id: "sd", label: "Stable Diffusion" },
      { id: "dalle", label: "DALL-E" },
      { id: "midjourney", label: "Midjourney" }
    ],
    timeRange: [
      { id: "all", label: "All Time" },
      { id: "today", label: "Today" },
      { id: "week", label: "This Week" },
      { id: "month", label: "This Month" }
    ]
  };

  const samplePrompts = [
    "A beautiful sunset over mountains with a calm lake reflection",
    "Portrait of a young woman with blue eyes and flowing hair, photorealistic",
    "Fantasy landscape with floating islands and waterfalls, magical atmosphere",
    "Futuristic cityscape at night with neon lights and flying vehicles",
    "Abstract geometric patterns with vibrant colors, digital art style",
    "A serene Japanese garden with cherry blossoms and a small pond",
    "Medieval castle on a hill surrounded by autumn forest, cinematic lighting",
    "Underwater scene with colorful coral reef and tropical fish",
    "Cyberpunk character with neon implants in a rainy street scene",
    "Elegant still life with fruits and flowers in Renaissance style"
  ];

  // Generate mock art gallery data
  const generateGalleryData = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `art-${i}`,
      title: `Artwork ${i + 1}`,
      description: samplePrompts[i % samplePrompts.length],
      image: `/placeholder.svg?height=600&width=600&text=Artwork+${i + 1}`,
      author: {
        name: `Creator ${i % 10 + 1}`,
        avatar: `/placeholder.svg?height=40&width=40&text=C${i % 10 + 1}`
      },
      stats: {
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 2000) + 100
      },
      tags: [
        categories[Math.floor(Math.random() * categories.length)].id,
        categories[Math.floor(Math.random() * categories.length)].id
      ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      featured: Math.random() > 0.8,
      prompt: samplePrompts[i % samplePrompts.length]
    }));
  };

  const [galleryItems, setGalleryItems] = useState(generateGalleryData(24));

  // Featured competition data
  const competitions = [
    {
      title: "Futuristic Utopias",
      image: "/placeholder.svg?height=300&width=500&text=Futuristic+Utopias",
      deadline: "3 days left",
      entries: 128,
      prize: "$500",
      description: "Envision a future where technology and nature coexist harmoniously. Create stunning images of utopian cities with sustainable architecture and thriving ecosystems."
    },
    {
      title: "Mythical Creatures",
      image: "/placeholder.svg?height=300&width=500&text=Mythical+Creatures",
      deadline: "1 week left",
      entries: 87,
      prize: "$300",
      description: "Bring legendary creatures to life with your imagination. Dragons, phoenixes, unicorns, or invent your own mythical beings with detailed characteristics."
    },
    {
      title: "Abstract Emotions",
      image: "/placeholder.svg?height=300&width=500&text=Abstract+Emotions",
      deadline: "2 days left",
      entries: 156,
      prize: "$400",
      description: "Express complex emotions through abstract art. Create images that capture feelings like joy, melancholy, hope, or anxiety using colors, shapes, and compositions."
    }
  ];

  // Collaboration projects data
  const collaborations = [
    {
      title: "Evolving Cityscapes",
      image: "/placeholder.svg?height=400&width=500&text=Evolving+Cityscapes",
      members: 8,
      description: "A collective project exploring how cities might evolve over the next century, combining architectural vision with environmental adaptation."
    },
    {
      title: "Folklore Reimagined",
      image: "/placeholder.svg?height=400&width=500&text=Folklore+Reimagined",
      members: 12,
      description: "Artists from different cultures collaborate to give traditional folklore tales a modern visual interpretation."
    },
    {
      title: "Mind's Eye",
      image: "/placeholder.svg?height=400&width=500&text=Mind's+Eye",
      members: 6,
      description: "An exploration of consciousness and perception through surrealist imagery and dreamscapes."
    }
  ];

  // Tutorial data
  const tutorials = [
    {
      title: "Mastering Prompt Engineering",
      image: "/placeholder.svg?height=300&width=500&text=Prompt+Engineering",
      duration: "25 min",
      level: "Intermediate",
      author: "Prompt Expert",
      views: 1567
    },
    {
      title: "Advanced LoRA Techniques",
      image: "/placeholder.svg?height=300&width=500&text=LoRA+Techniques",
      duration: "40 min",
      level: "Advanced",
      author: "AI Artist Pro",
      views: 982
    },
    {
      title: "Color Theory for AI Art",
      image: "/placeholder.svg?height=300&width=500&text=Color+Theory",
      duration: "30 min",
      level: "All Levels",
      author: "Creative Guide",
      views: 2431
    }
  ];

  // Animation on initial load
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  // Load more items when the page changes
  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setGalleryItems(prev => [...prev, ...generateGalleryData(12)]);
        setLoading(false);
      }, 1000);
    }
  }, [page]);

  // Filter gallery items based on filters
  const getFilteredItems = () => {
    let filtered = [...galleryItems];

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.tags.includes(activeCategory));
    }

    // Filter by search term
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
          item =>
              item.title.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.author.name.toLowerCase().includes(query)
      );
    }

    // Sort items
    if (sortBy === "trending") {
      filtered.sort((a, b) => b.stats.likes - a.stats.likes);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === "top") {
      filtered.sort((a, b) => (b.stats.likes * 2 + b.stats.comments) - (a.stats.likes * 2 + a.stats.comments));
    }

    return filtered;
  };

  const filteredItems = getFilteredItems();

  // Format the timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Handle view item/preview
  const handleViewItem = (index: number) => {
    setSelectedImageIndex(index);
    setPreviewOpen(true);
  };

  // Load more function
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
      <div className="container relative mx-auto py-8">
        <EnhancedParticlesBackground variant="waves" />

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community Hub</h1>
              <p className="text-muted-foreground">Explore creations from the VisioMera community</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search artworks..."
                    className="pl-8 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <div className="px-2 py-1.5">
                    <p className="mb-1 text-xs font-medium">Model Type</p>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.modelType.map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.label}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="px-2 py-1.5">
                    <p className="mb-1 text-xs font-medium">Time Range</p>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.timeRange.map(time => (
                            <SelectItem key={time.id} value={time.id}>
                              {time.label}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="px-2 py-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured-only" className="text-xs">Featured Only</Label>
                      <Switch id="featured-only" />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border rounded-md overflow-hidden">
                <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === "rows" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setViewMode("rows")}
                >
                  <Rows className="h-4 w-4" />
                </Button>
              </div>

              <SparkleButton className="hidden md:flex">
                Upload Creation
              </SparkleButton>
            </div>
          </div>

          {/* Mobile upload button */}
          <div className="md:hidden">
            <SparkleButton className="w-full">
              Upload Your Creation
            </SparkleButton>
          </div>
        </div>

        {/* Featured Competitions */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Competitions</h2>
            <Button variant="ghost" size="sm">
              View All
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((competition, index) => (
                <AnimatedCard
                    key={index}
                    className="group overflow-hidden border-muted/50 hover:border-primary/30"
                >
                  <div className="relative aspect-video">
                    <img
                        src={competition.image}
                        alt={competition.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white">{competition.title}</h3>
                      <p className="text-sm text-white/80">Prize: {competition.prize}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <AnimatedBadge
                            className="bg-black/50 text-white"
                            animation="pulse"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {competition.deadline}
                        </AnimatedBadge>
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          <Trophy className="mr-1 h-3 w-3" />
                          {competition.entries} entries
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {competition.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full group">
                  <span className="relative">
                    Enter Competition
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary-foreground transition-all group-hover:w-full"></span>
                  </span>
                    </Button>
                  </CardFooter>
                </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Main Gallery */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Community Gallery</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">
                  <div className="flex items-center">
                    <Flame className="mr-2 h-4 w-4 text-orange-500" />
                    Trending
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="top">
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-yellow-500" />
                    Top Rated
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="trending">
            <TabsList className="mb-6">
              <TabsTrigger value="trending">
                <Flame className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="newest">
                <Calendar className="mr-2 h-4 w-4" />
                Newest
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
              {viewMode === "grid" ? (
                  <StaggeredContainer
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                      staggerDelay={0.05}
                  >
                    {filteredItems.map((item, i) => (
                        <AnimatedCard
                            key={item.id}
                            className="overflow-hidden cursor-pointer group"
                            onClick={() => handleViewItem(i)}
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {item.featured && (
                                <div className="absolute top-2 right-2">
                                  <AnimatedBadge
                                      className="bg-primary text-primary-foreground"
                                      animation="pulse"
                                  >
                                    <Star className="mr-1 h-3 w-3" /> Featured
                                  </AnimatedBadge>
                                </div>
                            )}
                          </div>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                    src={item.author.avatar}
                                    alt={item.author.name}
                                    className="h-6 w-6 rounded-full border border-muted"
                                />
                                <span className="text-sm font-medium truncate max-w-[100px]">
                            {item.author.name}
                          </span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                <span className="text-xs">
                            {item.stats.likes > 999
                                ? `${(item.stats.likes / 1000).toFixed(1)}K`
                                : item.stats.likes}
                          </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between p-3 pt-0">
                            <div className="flex gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{formatTimestamp(item.timestamp)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{item.stats.comments}</span>
                            </div>
                          </CardFooter>
                        </AnimatedCard>
                    ))}
                  </StaggeredContainer>
              ) : (
                  <StaggeredContainer className="space-y-4" staggerDelay={0.08}>
                    {filteredItems.map((item, i) => (
                        <AnimatedCard
                            key={item.id}
                            className="flex flex-col sm:flex-row overflow-hidden cursor-pointer hover:shadow-md group"
                            onClick={() => handleViewItem(i)}
                        >
                          <div className="aspect-square sm:w-60 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              {item.featured && (
                                  <AnimatedBadge
                                      className="bg-primary text-primary-foreground"
                                      animation="pulse"
                                  >
                                    <Star className="mr-1 h-3 w-3" /> Featured
                                  </AnimatedBadge>
                              )}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.tags.map(tag => {
                                const category = categories.find(c => c.id === tag);
                                return category ? (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {category.label}
                                    </Badge>
                                ) : null;
                              })}
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3">
                              <div className="flex items-center gap-2">
                                <img
                                    src={item.author.avatar}
                                    alt={item.author.name}
                                    className="h-6 w-6 rounded-full border border-muted"
                                />
                                <span className="text-sm">{item.author.name}</span>
                                <span className="text-xs text-muted-foreground">
                            {formatTimestamp(item.timestamp)}
                          </span>
                              </div>

                              <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span className="text-xs">{item.stats.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="text-xs">{item.stats.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span className="text-xs">{item.stats.views}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AnimatedCard>
                    ))}
                  </StaggeredContainer>
              )}

              {/* Load more button */}
              {filteredItems.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="min-w-[200px]"
                    >
                      {loading ? (
                          <>
                            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                              <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                              />
                              <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Loading...
                          </>
                      ) : (
                          <>Load More</>
                      )}
                    </Button>
                  </div>
              )}

              {/* Empty state */}
              {filteredItems.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No results found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                    >
                      Reset Filters
                    </Button>
                  </div>
              )}
            </TabsContent>

            <TabsContent value="newest" className="mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Newest content would go here - using the same structure as trending */}
                <p className="py-12 text-center text-muted-foreground col-span-full">
                  Check out the latest artwork from our talented community.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="collaborations" className="mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {collaborations.map((collab, index) => (
                    <AnimatedCard key={index} className="overflow-hidden">
                      <div className="aspect-video">
                        <img
                            src={collab.image}
                            alt={collab.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold">{collab.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {collab.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {Array.from({ length: Math.min(5, collab.members) }).map((_, j) => (
                                <img
                                    key={j}
                                    src={`/placeholder.svg?height=32&width=32&text=U${j}`}
                                    alt={`Collaborator ${j + 1}`}
                                    className="h-8 w-8 rounded-full border-2 border-background"
                                />
                            ))}
                            {collab.members > 5 && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                                  +{collab.members - 5}
                                </div>
                            )}
                          </div>

                          <Badge variant="outline">Active Project</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full">View Project</Button>
                      </CardFooter>
                    </AnimatedCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tutorials.map((tutorial, index) => (
                    <AnimatedCard key={index} className="overflow-hidden">
                      <div className="aspect-video">
                        <img
                            src={tutorial.image}
                            alt={tutorial.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold line-clamp-1">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          By {tutorial.author} • {tutorial.views.toLocaleString()} views
                        </p>
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
                        <Button className="w-full">Watch Tutorial</Button>
                      </CardFooter>
                    </AnimatedCard>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trending Tags Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Trending Tags</h2>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((category) => (
                <Button
                    key={category.id}
                    variant="outline"
                    className="group flex items-center gap-2"
                    onClick={() => setActiveCategory(category.id)}
                >
                  <Tag className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  {category.label}
                  <Badge variant="secondary" className="ml-1">
                    {Math.floor(Math.random() * 500) + 50}
                  </Badge>
                </Button>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-4 rounded-lg border bg-muted/20 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">AI Art Creation Tips</h3>
              <p className="text-muted-foreground">
                Looking to improve your generations? Try using detailed descriptions, specify lighting conditions,
                and include style references in your prompts.
              </p>
            </div>
            <Button className="mt-2 md:mt-0">
              View Guides
            </Button>
          </div>
        </div>

        {/* Image Preview Dialog */}
        {selectedImageIndex !== null && (
            <ImagePreviewDialog
                open={previewOpen}
                onOpenChange={setPreviewOpen}
                image={filteredItems[selectedImageIndex]?.image || ""}
                prompt={filteredItems[selectedImageIndex]?.description || ""}
                timestamp={formatTimestamp(filteredItems[selectedImageIndex]?.timestamp || "")}
                tags={filteredItems[selectedImageIndex]?.tags.map(tag => {
                  const category = categories.find(c => c.id === tag);
                  return category?.label || tag;
                }) || []}
            />
        )}
      </div>
  );
}