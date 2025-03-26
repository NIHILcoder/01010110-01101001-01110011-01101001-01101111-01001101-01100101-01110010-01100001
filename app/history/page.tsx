"use client";

import { useState } from "react";
import { ParticlesBackground } from "@/components/particles-background";
import { GenerationStatistics } from "@/components/generation-statistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Download,
  Search,
  Trash2,
  Filter,
  Grid,
  Rows,
  SlidersHorizontal,
  BarChart2,
  Eye
} from "lucide-react";
import { useLanguage, useLocalTranslation } from "@/components/language-context";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();

  // Page-specific translations
  const pageTranslations = {
    en: {
      'history.page_title': 'Generation History',
      'history.page_subtitle': 'View and manage your previous generations',
      'history.recent_generations': 'Recent Generations',
      'history.search_placeholder': 'Search history...',
      'history.filter_by': 'Filter by',
      'history.all_images': 'All Images',
      'history.saved_only': 'Saved Only',
      'history.shared_only': 'Shared Only',
      'history.grid_view': 'Grid View',
      'history.list_view': 'List View',
      'history.export_history': 'Export History',
      'history.view_image': 'View',
      'history.delete_image': 'Delete',
      'history.landscape': 'Landscape with mountains',
      'history.portrait': 'Portrait of a character',
      'history.prompt': 'Prompt:',
      'history.beautiful_landscape': 'beautiful landscape',
      'history.detailed_portrait': 'detailed portrait',
      'history.with_mountains': 'with mountains',
      'history.with_ocean': 'with ocean',
      'history.in_background': 'in the background, detailed, high quality',
      'history.today': 'Today',
      'history.yesterday': 'Yesterday',
      'history.days_ago': 'days ago',
      'history.detailed_view': 'Detailed View',
      'history.no_results': 'No results found',
      'history.try_another_search': 'Try another search term or filter',
      'history.processing_details': 'Processing Details',
      'history.model_used': 'Model Used',
      'history.generation_time': 'Generation Time',
      'history.image_size': 'Image Size',
      'history.flux_realistic': 'Flux Realistic',
      'history.seconds': 'seconds',
      'history.resolution': 'px',
    },
    ru: {
      'history.page_title': 'История генераций',
      'history.page_subtitle': 'Просмотр и управление вашими предыдущими генерациями',
      'history.recent_generations': 'Недавние генерации',
      'history.search_placeholder': 'Поиск в истории...',
      'history.filter_by': 'Фильтровать',
      'history.all_images': 'Все изображения',
      'history.saved_only': 'Только сохраненные',
      'history.shared_only': 'Только опубликованные',
      'history.grid_view': 'Сетка',
      'history.list_view': 'Список',
      'history.export_history': 'Экспорт истории',
      'history.view_image': 'Просмотр',
      'history.delete_image': 'Удалить',
      'history.landscape': 'Пейзаж с горами',
      'history.portrait': 'Портрет персонажа',
      'history.prompt': 'Промпт:',
      'history.beautiful_landscape': 'красивый пейзаж',
      'history.detailed_portrait': 'детальный портрет',
      'history.with_mountains': 'с горами',
      'history.with_ocean': 'с океаном',
      'history.in_background': 'на фоне, детализированный, высокое качество',
      'history.today': 'Сегодня',
      'history.yesterday': 'Вчера',
      'history.days_ago': 'дней назад',
      'history.detailed_view': 'Подробный просмотр',
      'history.no_results': 'Результаты не найдены',
      'history.try_another_search': 'Попробуйте другой поисковый запрос или фильтр',
      'history.processing_details': 'Детали обработки',
      'history.model_used': 'Использованная модель',
      'history.generation_time': 'Время генерации',
      'history.image_size': 'Размер изображения',
      'history.flux_realistic': 'Flux Реалистичный',
      'history.seconds': 'секунд',
      'history.resolution': 'пх',
    }
  };

  const { localT } = useLocalTranslation(pageTranslations);

  // Generate sample history data
  const generateHistoryItems = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `history-${i}`,
      image: `/placeholder.svg?height=200&width=200&text=Image+${i + 1}`,
      prompt: i % 2 === 0
          ? `${localT('history.beautiful_landscape')} ${localT('history.with_mountains')} ${localT('history.in_background')}`
          : `${localT('history.detailed_portrait')} ${localT('history.with_ocean')} ${localT('history.in_background')}`,
      timestamp: i < 5
          ? localT('history.today')
          : i < 10
              ? localT('history.yesterday')
              : `${i - 9} ${localT('history.days_ago')}`,
      isSaved: i % 3 === 0,
      isShared: i % 4 === 0,
      viewCount: Math.floor(Math.random() * 20) + 1,
      model: "flux_realistic",
      generationTime: Math.floor(Math.random() * 8) + 3,
      size: "1024x1024"
    }));
  };

  const historyItems = generateHistoryItems(16);

  // Filter history items based on search and filter
  const getFilteredHistoryItems = () => {
    return historyItems.filter(item => {
      // Apply search filter
      if (searchQuery && !item.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Apply category filter
      if (selectedFilter === "saved" && !item.isSaved) {
        return false;
      }
      if (selectedFilter === "shared" && !item.isShared) {
        return false;
      }

      return true;
    });
  };

  const filteredItems = getFilteredHistoryItems();

  return (
      <div className="container relative mx-auto py-8">
        <ParticlesBackground />

        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold">{localT('history.page_title')}</h1>
          <p className="text-muted-foreground">{localT('history.page_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{localT('history.recent_generations')}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={localT('history.search_placeholder')}
                        className="pl-8 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                      value={selectedFilter}
                      onValueChange={setSelectedFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{localT('history.filter_by')}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{localT('history.all_images')}</SelectItem>
                      <SelectItem value="saved">{localT('history.saved_only')}</SelectItem>
                      <SelectItem value="shared">{localT('history.shared_only')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grid">
                  <div className="mb-4 flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger
                          value="grid"
                          onClick={() => setViewMode("grid")}
                          className="flex items-center gap-2"
                      >
                        <Grid className="h-4 w-4" />
                        {localT('history.grid_view')}
                      </TabsTrigger>
                      <TabsTrigger
                          value="list"
                          onClick={() => setViewMode("list")}
                          className="flex items-center gap-2"
                      >
                        <Rows className="h-4 w-4" />
                        {localT('history.list_view')}
                      </TabsTrigger>
                    </TabsList>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {localT('history.export_history')}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Export your generation history as CSV
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <TabsContent value="grid" className="mt-0">
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {filteredItems.map((item, i) => (
                              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-md border">
                                <img
                                    src={item.image}
                                    alt={`Generated image ${i + 1}`}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="secondary">
                                      {localT('history.view_image')}
                                    </Button>
                                    <Button size="sm" variant="secondary">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  <div className="truncate">
                                    {i % 2 === 0 ? localT('history.landscape') : localT('history.portrait')}
                                  </div>
                                  <div className="flex items-center gap-1 text-white/70">
                                    <Clock className="h-3 w-3" />
                                    {item.timestamp}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    {item.isSaved && (
                                        <Badge variant="outline" className="bg-primary/20 text-[10px] h-4">
                                          Saved
                                        </Badge>
                                    )}
                                    {item.isShared && (
                                        <Badge variant="outline" className="bg-blue-500/20 text-[10px] h-4">
                                          Shared
                                        </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Search className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">{localT('history.no_results')}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{localT('history.try_another_search')}</p>
                        </div>
                    )}
                  </TabsContent>

                  <TabsContent value="list" className="mt-0">
                    {filteredItems.length > 0 ? (
                        <div className="space-y-2">
                          {filteredItems.map((item, i) => (
                              <div key={item.id} className="flex items-center gap-4 rounded-md border p-3 hover:bg-muted/50">
                                <img
                                    src={item.image}
                                    alt={`Generated image ${i + 1}`}
                                    className="h-16 w-16 rounded-md object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium">
                                    {i % 2 === 0 ? localT('history.landscape') : localT('history.portrait')}
                                  </div>
                                  <div className="text-sm text-muted-foreground truncate">
                                    {localT('history.prompt')} {item.prompt}
                                  </div>
                                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {item.timestamp}
                              </span>
                                    <span className="text-muted-foreground text-[10px]">•</span>
                                    <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                      {item.viewCount}
                              </span>
                                    <div className="flex items-center gap-2">
                                      {item.isSaved && (
                                          <Badge variant="outline" className="bg-primary/20 text-[10px] h-5">
                                            Saved
                                          </Badge>
                                      )}
                                      {item.isShared && (
                                          <Badge variant="outline" className="bg-blue-500/20 text-[10px] h-5">
                                            Shared
                                          </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    {localT('history.view_image')}
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Search className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">{localT('history.no_results')}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{localT('history.try_another_search')}</p>
                        </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <GenerationStatistics />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  {localT('history.processing_details')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3 bg-secondary/10">
                      <div className="text-sm text-muted-foreground">{localT('history.model_used')}</div>
                      <div className="mt-1 font-medium">{localT('history.flux_realistic')}</div>
                    </div>
                    <div className="rounded-lg border p-3 bg-secondary/10">
                      <div className="text-sm text-muted-foreground">{localT('history.generation_time')}</div>
                      <div className="mt-1 font-medium">5.2 {localT('history.seconds')}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/10">
                    <div className="text-sm text-muted-foreground">{localT('history.image_size')}</div>
                    <div className="mt-1 font-medium">1024 × 1024 {localT('history.resolution')}</div>
                  </div>

                  <div className="rounded-lg border p-3 space-y-2 bg-secondary/10">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Sampling Steps</div>
                      <div className="text-sm text-muted-foreground">30</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">CFG Scale</div>
                      <div className="text-sm text-muted-foreground">7.5</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Sampler</div>
                      <div className="text-sm text-muted-foreground">Euler a</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Seed</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[120px]">1234567890</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}