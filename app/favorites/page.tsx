"use client";
import { useState, useEffect, useRef } from "react";
import { ParticlesBackground } from "@/components/particles-background";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Folder,
  Grid,
  List,
  MoreHorizontal,
  Edit,
  Trash2,
  Heart,
  Download,
  Share2,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollLock } from "@/components/hooks/useScrollLock";
import { useLanguage, useLocalTranslation } from "@/components/language-context";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

interface Collection {
  id: string;
  name: string;
  description?: string;
  count: number;
  images: string[];
}

interface FavoriteImage {
  id: string;
  src: string;
  title: string;
  dateAdded: Date;
}

export default function FavoritesPage() {
  // Language setup
  const { language } = useLanguage();
  const pageTranslations = {
    en: {
      'favorites.title': 'Favorites',
      'favorites.subtitle': 'Organize and manage your saved images',
      'favorites.search': 'Search favorites...',
      'favorites.new_collection': 'New Collection',
      'favorites.collections': 'Collections',
      'favorites.create_collection': 'Create New Collection',
      'favorites.collection_description': 'Create a new collection to organize your favorite images',
      'favorites.collection_name': 'Collection Name',
      'favorites.collection_name_placeholder': 'Enter collection name',
      'favorites.description': 'Description (Optional)',
      'favorites.description_placeholder': 'Enter description',
      'favorites.create': 'Create Collection',
      'favorites.all_favorites': 'All Favorites',
      'favorites.recently_favorited': 'Recently Favorited',
      'favorites.load_more': 'Load More',
      'favorites.view': 'View',
      'favorites.delete': 'Delete',
      'favorites.rename': 'Rename',
      'favorites.empty_collection_message': 'Create a new collection to organize your images',
      'favorites.delete_confirmation': 'Delete Collection',
      'favorites.delete_message': 'Are you sure you want to delete this collection? This action cannot be undone.',
      'favorites.cancel': 'Cancel',
      'favorites.confirm_delete': 'Delete',
      'favorites.edit_collection': 'Edit Collection',
      'favorites.save_changes': 'Save Changes'
    },
    ru: {
      'favorites.title': 'Избранное',
      'favorites.subtitle': 'Организуйте и управляйте вашими сохраненными изображениями',
      'favorites.search': 'Поиск в избранном...',
      'favorites.new_collection': 'Новая коллекция',
      'favorites.collections': 'Коллекции',
      'favorites.create_collection': 'Создать новую коллекцию',
      'favorites.collection_description': 'Создайте новую коллекцию для организации ваших избранных изображений',
      'favorites.collection_name': 'Название коллекции',
      'favorites.collection_name_placeholder': 'Введите название коллекции',
      'favorites.description': 'Описание (Опционально)',
      'favorites.description_placeholder': 'Введите описание',
      'favorites.create': 'Создать коллекцию',
      'favorites.all_favorites': 'Все избранное',
      'favorites.recently_favorited': 'Недавно добавленные',
      'favorites.load_more': 'Загрузить еще',
      'favorites.view': 'Просмотр',
      'favorites.delete': 'Удалить',
      'favorites.rename': 'Переименовать',
      'favorites.empty_collection_message': 'Создайте новую коллекцию для организации ваших изображений',
      'favorites.delete_confirmation': 'Удалить коллекцию',
      'favorites.delete_message': 'Вы уверены, что хотите удалить эту коллекцию? Это действие нельзя отменить.',
      'favorites.cancel': 'Отмена',
      'favorites.confirm_delete': 'Удалить',
      'favorites.edit_collection': 'Редактировать коллекцию',
      'favorites.save_changes': 'Сохранить изменения'
    }
  };

  const { localT } = useLocalTranslation(pageTranslations);

  // Component state
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [collections, setCollections] = useState<Collection[]>([
    { id: "landscapes", name: "Landscapes", count: 24, images: generateMockImages(4, "Landscape") },
    { id: "portraits", name: "Portraits", count: 18, images: generateMockImages(4, "Portrait") },
    { id: "abstract", name: "Abstract", count: 12, images: generateMockImages(4, "Abstract") },
    { id: "sci-fi", name: "Sci-Fi", count: 15, images: generateMockImages(4, "SciFi") },
    { id: "fantasy", name: "Fantasy", count: 20, images: generateMockImages(4, "Fantasy") },
    { id: "architecture", name: "Architecture", count: 8, images: generateMockImages(4, "Architecture") }
  ]);

  const [favorites, setFavorites] = useState<FavoriteImage[]>(generateMockFavorites(15));
  const [currentPage, setCurrentPage] = useState(1);
  const [collectionForm, setCollectionForm] = useState({
    name: '',
    description: ''
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [previewImage, setPreviewImage] = useState<FavoriteImage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Scroll lock for modals
  useScrollLock(newCollectionOpen);
  useScrollLock(deleteDialogOpen);
  useScrollLock(editDialogOpen);
  useScrollLock(previewOpen);

  // Filter collections based on search
  const filteredCollections = collections.filter(collection =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter favorites based on search
  const filteredFavorites = favorites.filter(favorite =>
      favorite.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated favorites (15 per page)
  const paginatedFavorites = filteredFavorites.slice(0, currentPage * 15);

  // Collection form handlers
  const handleCollectionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCollectionForm({
      ...collectionForm,
      [e.target.id]: e.target.value
    });
  };

  const handleCreateCollection = () => {
    if (collectionForm.name.trim() === '') return;

    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      name: collectionForm.name,
      description: collectionForm.description,
      count: 0,
      images: []
    };

    setCollections([...collections, newCollection]);
    setCollectionForm({ name: '', description: '' });
    setNewCollectionOpen(false);
  };

  // Delete collection handlers
  const openDeleteDialog = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCollection = () => {
    if (!selectedCollection) return;
    setCollections(collections.filter(c => c.id !== selectedCollection));
    setDeleteDialogOpen(false);
    setSelectedCollection(null);
  };

  // Edit collection handlers
  const openEditDialog = (collection: Collection) => {
    setEditForm({
      id: collection.id,
      name: collection.name,
      description: collection.description || ''
    });
    setEditDialogOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({
      ...editForm,
      [e.target.id]: e.target.value
    });
  };

  const handleSaveEdit = () => {
    if (editForm.name.trim() === '') return;

    setCollections(collections.map(collection =>
        collection.id === editForm.id
            ? { ...collection, name: editForm.name, description: editForm.description }
            : collection
    ));
    setEditDialogOpen(false);
  };

  // Image preview handler
  const handleImagePreview = (image: FavoriteImage) => {
    setPreviewImage(image);
    setPreviewOpen(true);
  };

  // Load more handler
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Generate mock data
  function generateMockImages(count: number, prefix: string) {
    return Array.from({ length: count }).map((_, i) =>
        `/placeholder.svg?height=100&width=100&text=${prefix}${i+1}`
    );
  }

  function generateMockFavorites(count: number): FavoriteImage[] {
    return Array.from({ length: count }).map((_, i) => ({
      id: `fav-${i+1}`,
      src: `/placeholder.svg?height=200&width=200&text=Fav+${i+1}`,
      title: `Favorite Image ${i+1}`,
      dateAdded: new Date(Date.now() - i * 86400000) // Each one a day earlier
    }));
  }

  return (
      <div className="container relative mx-auto py-8">
        <ParticlesBackground />
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{localT('favorites.title')}</h1>
            <p className="text-muted-foreground">{localT('favorites.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder={localT('favorites.search')}
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={newCollectionOpen} onOpenChange={setNewCollectionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {localT('favorites.new_collection')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{localT('favorites.create_collection')}</DialogTitle>
                  <DialogDescription>
                    {localT('favorites.collection_description')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 modal-scrollable">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {localT('favorites.collection_name')}
                    </label>
                    <Input
                        id="name"
                        placeholder={localT('favorites.collection_name_placeholder')}
                        value={collectionForm.name}
                        onChange={handleCollectionFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      {localT('favorites.description')}
                    </label>
                    <Textarea
                        id="description"
                        placeholder={localT('favorites.description_placeholder')}
                        value={collectionForm.description}
                        onChange={handleCollectionFormChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                      type="submit"
                      onClick={handleCreateCollection}
                      disabled={collectionForm.name.trim() === ''}
                  >
                    {localT('favorites.create')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">{localT('favorites.collections')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCollections.map((collection) => (
                <Card key={collection.id} className="group overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <div className="grid h-full grid-cols-2 grid-rows-2 gap-1 p-2">
                      {collection.images.map((image, i) => (
                          <div key={i} className="overflow-hidden rounded-sm bg-background/50">
                            <img
                                src={image}
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
                          <DropdownMenuItem onClick={() => openEditDialog(collection)}>
                            <Edit className="mr-2 h-4 w-4" />
                            {localT('favorites.rename')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => openDeleteDialog(collection.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {localT('favorites.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
            ))}

            <Card className="flex aspect-[4/3] flex-col items-center justify-center border-dashed p-6">
              <Folder className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {localT('favorites.empty_collection_message')}
              </p>
              <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setNewCollectionOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {localT('favorites.new_collection')}
              </Button>
            </Card>
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">{localT('favorites.all_favorites')}</h2>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="grid">
                <TabsList>
                  <TabsTrigger
                      value="grid"
                      onClick={() => setViewMode("grid")}
                  >
                    <Grid className="mr-2 h-4 w-4" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger
                      value="list"
                      onClick={() => setViewMode("list")}
                  >
                    <List className="mr-2 h-4 w-4" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{localT('favorites.recently_favorited')}</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFavorites.length > 0 ? (
                  viewMode === "grid" ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {paginatedFavorites.map((image) => (
                            <div
                                key={image.id}
                                className="group relative aspect-square overflow-hidden rounded-md border cursor-pointer"
                                onClick={() => handleImagePreview(image)}
                            >
                              <img
                                  src={image.src}
                                  alt={image.title}
                                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="secondary">
                                    {localT('favorites.view')}
                                  </Button>
                                  <Button size="sm" variant="secondary">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <div className="space-y-3">
                        {paginatedFavorites.map((image) => (
                            <div
                                key={image.id}
                                className="flex items-center gap-4 p-3 border rounded-md hover:bg-muted/30 transition-colors cursor-pointer"
                                onClick={() => handleImagePreview(image)}
                            >
                              <img
                                  src={image.src}
                                  alt={image.title}
                                  className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{image.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {image.dateAdded.toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost">
                                  {localT('favorites.view')}
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                        ))}
                      </div>
                  )
              ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No favorites found matching your search.</p>
                  </div>
              )}
            </CardContent>
            {filteredFavorites.length > paginatedFavorites.length && (
                <CardFooter className="flex justify-center">
                  <Button variant="outline" onClick={handleLoadMore}>
                    {localT('favorites.load_more')}
                  </Button>
                </CardFooter>
            )}
          </Card>
        </div>

        {/* Delete Collection Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{localT('favorites.delete_confirmation')}</AlertDialogTitle>
              <AlertDialogDescription>
                {localT('favorites.delete_message')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{localT('favorites.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                  onClick={handleDeleteCollection}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {localT('favorites.confirm_delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Collection Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{localT('favorites.edit_collection')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {localT('favorites.collection_name')}
                </label>
                <Input
                    id="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {localT('favorites.description')}
                </label>
                <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={handleEditFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                  onClick={handleSaveEdit}
                  disabled={editForm.name.trim() === ''}
              >
                {localT('favorites.save_changes')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Image Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{previewImage?.title}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    onClick={() => setPreviewOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-2">
              {previewImage && (
                  <img
                      src={previewImage.src}
                      alt={previewImage.title}
                      className="max-h-[60vh] rounded-md object-contain"
                  />
              )}
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <Button>
                <Heart className="mr-2 h-4 w-4" />
                Add to Collection
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}