import { ParticlesBackground } from "@/components/particles-background"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Folder, Grid, List, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FavoritesPage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-muted-foreground">Organize and manage your saved images</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search favorites..." className="pl-8 w-[200px]" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
                <DialogDescription>Create a new collection to organize your favorite images</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Collection Name
                  </label>
                  <Input id="name" placeholder="Enter collection name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <Input id="description" placeholder="Enter description" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Collection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Collections</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Landscapes", count: 24 },
            { name: "Portraits", count: 18 },
            { name: "Abstract", count: 12 },
            { name: "Sci-Fi", count: 15 },
            { name: "Fantasy", count: 20 },
            { name: "Architecture", count: 8 },
          ].map((collection, index) => (
            <Card key={index} className="group overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <div className="grid h-full grid-cols-2 grid-rows-2 gap-1 p-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-sm bg-background/50">
                      <img
                        src={`/placeholder.svg?height=100&width=100&text=${collection.name.charAt(0)}${i}`}
                        alt={`${collection.name} preview ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary">View Collection</Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">{collection.count} images</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex aspect-[4/3] flex-col items-center justify-center border-dashed p-6">
            <Folder className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-center text-sm text-muted-foreground">Create a new collection to organize your images</p>
            <Button variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              New Collection
            </Button>
          </Card>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Favorites</h2>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="grid">
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid className="mr-2 h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="mr-2 h-4 w-4" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recently Favorited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-md border">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=Fav+${i + 1}`}
                    alt={`Favorite image ${i + 1}`}
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
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">Load More</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

