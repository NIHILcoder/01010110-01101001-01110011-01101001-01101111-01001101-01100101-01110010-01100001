"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    Sparkles,
    Save,
    Share2,
    Download,
    Upload,
    Trash2,
    Copy,
    RefreshCw,
    ChevronDown,
    Wand2,
    Layers,
    Plus,
    Send,
    Maximize2,
    RotateCw,
    ZoomIn,
    ZoomOut,
    Image,
    Star,
    Lightbulb,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useLanguage, useLocalTranslation } from "@/components/language-context";

export function ImprovedGenerationForm() {
    const { t, language } = useLanguage();

    // Page-specific translations
    const pageTranslations = {
        en: {
            'generator.tooltip.enhance': 'AI will enhance your prompt with additional details',
            'generator.image_size': 'Image Size',
            'generator.prompt_suggestions': 'Common Tags',
            'generator.detailed': 'detailed',
            'generator.high_quality': 'high quality',
            'generator.photorealistic': 'photorealistic',
            'generator.8k': '8k',
            'generator.cinematic': 'cinematic lighting',
            'generator.sharp_focus': 'sharp focus',
            'generator.studio_quality': 'studio quality',
            'generator.professional': 'professional',
            'generator.trending': 'trending on artstation',
            'generator.image_appears_here': 'Your generated image will appear here',
            'generator.start_prompt': 'Start by entering a detailed prompt',
            'generator.upload_img_tooltip': 'Use an existing image as a starting point',
            'generator.zoom_level': 'Zoom level',
            'generator.share_community_btn': 'Share to Community',
            'generator.drag_drop': 'Drag & drop an image here',
            'generator.drop_here': 'Drop image here',
            'generator.uploading': 'Uploading...',
        },
        ru: {
            'generator.tooltip.enhance': 'ИИ улучшит ваш промпт дополнительными деталями',
            'generator.image_size': 'Размер изображения',
            'generator.prompt_suggestions': 'Популярные теги',
            'generator.detailed': 'детализированный',
            'generator.high_quality': 'высокое качество',
            'generator.photorealistic': 'фотореалистичный',
            'generator.8k': '8k',
            'generator.cinematic': 'кинематографическое освещение',
            'generator.sharp_focus': 'резкий фокус',
            'generator.studio_quality': 'студийное качество',
            'generator.professional': 'профессиональный',
            'generator.trending': 'популярно на artstation',
            'generator.image_appears_here': 'Ваше сгенерированное изображение появится здесь',
            'generator.start_prompt': 'Начните с ввода подробного промпта',
            'generator.upload_img_tooltip': 'Использовать существующее изображение в качестве основы',
            'generator.zoom_level': 'Масштаб',
            'generator.share_community_btn': 'Поделиться с сообществом',
            'generator.drag_drop': 'Перетащите изображение сюда',
            'generator.drop_here': 'Бросьте изображение здесь',
            'generator.uploading': 'Загрузка...',
        }
    };

    const { localT } = useLocalTranslation(pageTranslations);

    const [generating, setGenerating] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [negativePrompt, setNegativePrompt] = useState<string>("");
    const [showTagSuggestions, setShowTagSuggestions] = useState<boolean>(false);
    const [zoomLevel, setZoomLevel] = useState<number>(100);
    const [activeTab, setActiveTab] = useState<string>("basic");
    const [aspectRatio, setAspectRatio] = useState<string>("1:1");
    const [enhancePrompt, setEnhancePrompt] = useState<boolean>(false);
    const [selectedModel, setSelectedModel] = useState<string>("flux");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const promptInputRef = useRef<HTMLTextAreaElement>(null);
    const generationContainerRef = useRef<HTMLDivElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    // Common tags for prompt suggestions
    const commonTags = [
        { key: 'generator.detailed', value: 'detailed' },
        { key: 'generator.high_quality', value: 'high quality' },
        { key: 'generator.photorealistic', value: 'photorealistic' },
        { key: 'generator.8k', value: '8k' },
        { key: 'generator.cinematic', value: 'cinematic lighting' },
        { key: 'generator.sharp_focus', value: 'sharp focus' },
    ];

    // Models available for selection
    const availableModels = [
        { id: "flux", name: "Flux Realistic", image: "/placeholder.svg?height=80&width=80&text=Flux" },
        { id: "anime", name: "Anime Diffusion", image: "/placeholder.svg?height=80&width=80&text=Anime" },
        { id: "dreamshaper", name: "Dreamshaper", image: "/placeholder.svg?height=80&width=80&text=Dream" },
        { id: "realistic", name: "Realistic Vision", image: "/placeholder.svg?height=80&width=80&text=Real" }
    ];

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        setShowTagSuggestions(e.target.value.length > 0);
    };

    const addTagToPrompt = (tag: string) => {
        if (prompt.trim().length > 0 && !prompt.endsWith(' ')) {
            setPrompt(prev => `${prev}, ${tag}`);
        } else {
            setPrompt(prev => `${prev}${tag}`);
        }
        promptInputRef.current?.focus();
    };

    const handleGenerate = () => {
        if (!prompt.trim()) {
            return;
        }

        setGenerating(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setGenerating(false);
                    setGeneratedImage("/placeholder.svg?height=1024&width=1024&text=Generated+Image");
                    return 0;
                }
                return prev + 4;
            });
        }, 100);
    };

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setSourceImage(e.target.result as string);
                setIsUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    // Drag and drop handlers
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    };

    // Effect to set up the drag and drop listeners
    useEffect(() => {
        const dropZone = dropZoneRef.current;
        if (!dropZone) return;

        dropZone.addEventListener('dragenter', handleDragEnter as any);
        dropZone.addEventListener('dragleave', handleDragLeave as any);
        dropZone.addEventListener('dragover', handleDragOver as any);
        dropZone.addEventListener('drop', handleDrop as any);

        return () => {
            dropZone.removeEventListener('dragenter', handleDragEnter as any);
            dropZone.removeEventListener('dragleave', handleDragLeave as any);
            dropZone.removeEventListener('dragover', handleDragOver as any);
            dropZone.removeEventListener('drop', handleDrop as any);
        };
    }, []);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-0">
                {/* Settings Panel */}
                <div className="w-full lg:col-span-1">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{t('generation.image_settings')}</CardTitle>
                                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                                    <SelectTrigger className="w-[120px] h-8 text-xs">
                                        <SelectValue placeholder={t('ui.aspect_ratio')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1:1">1:1 {t('ui.square')}</SelectItem>
                                        <SelectItem value="4:3">4:3 {t('ui.standard')}</SelectItem>
                                        <SelectItem value="16:9">16:9 {t('ui.widescreen')}</SelectItem>
                                        <SelectItem value="9:16">9:16 {t('ui.portrait')}</SelectItem>
                                        <SelectItem value="2:3">2:3 {t('ui.portrait')}</SelectItem>
                                        <SelectItem value="3:2">3:2 {t('ui.landscape')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <CardDescription className="text-xs">{t('generation.configure_parameters')}</CardDescription>
                        </CardHeader>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <div className="px-4">
                                <TabsList className="w-full">
                                    <TabsTrigger value="basic" className="flex-1 text-xs py-1">
                                        {t('generation.basic')}
                                    </TabsTrigger>
                                    <TabsTrigger value="advanced" className="flex-1 text-xs py-1">
                                        {t('generation.advanced')}
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="basic" className="pt-1">
                                <CardContent className="space-y-3 p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="prompt" className="text-sm font-medium">{t('generation.prompt')}</Label>
                                            <div className="flex items-center space-x-1">
                                                <Switch
                                                    id="enhance-prompt"
                                                    checked={enhancePrompt}
                                                    onCheckedChange={setEnhancePrompt}
                                                />
                                                <Label htmlFor="enhance-prompt" className="text-xs">{t('generation.ai_enhance')}</Label>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                                <Lightbulb className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{localT('generator.tooltip.enhance')}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Textarea
                                                id="prompt"
                                                placeholder={t('generation.prompt_placeholder')}
                                                className="min-h-[100px] resize-none text-sm"
                                                value={prompt}
                                                onChange={handlePromptChange}
                                                ref={promptInputRef}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowTagSuggestions(!showTagSuggestions)}
                                                className="text-xs h-7"
                                            >
                                                <Plus className="mr-1 h-3 w-3" />
                                                {t('generation.suggestions')}
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-xs h-7">
                                                <Save className="mr-1 h-3 w-3" />
                                                {t('generation.save_prompt')}
                                            </Button>
                                        </div>

                                        {/* Tag Suggestions */}
                                        {showTagSuggestions && (
                                            <div className="rounded-md border bg-card p-2 shadow-sm">
                                                <h4 className="mb-1 text-xs font-medium">{localT('generator.prompt_suggestions')}</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {commonTags.map((tag) => (
                                                        <Badge
                                                            key={tag.key}
                                                            variant="outline"
                                                            className="cursor-pointer hover:bg-primary/10 text-xs"
                                                            onClick={() => addTagToPrompt(tag.value)}
                                                        >
                                                            {localT(tag.key)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="negative-prompt" className="text-sm font-medium">
                                            {t('generation.negative_prompt')}
                                        </Label>
                                        <Textarea
                                            id="negative-prompt"
                                            placeholder={t('generation.negative_prompt_placeholder')}
                                            className="min-h-[60px] resize-none text-sm"
                                            value={negativePrompt}
                                            onChange={(e) => setNegativePrompt(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">{t('generation.model_selection')}</Label>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {availableModels.map((model) => (
                                                <div
                                                    key={model.id}
                                                    className={cn(
                                                        "flex cursor-pointer flex-col items-center gap-1 rounded-md border p-1.5 transition-all hover:border-primary hover:bg-secondary",
                                                        selectedModel === model.id && "border-primary bg-primary/5"
                                                    )}
                                                    onClick={() => setSelectedModel(model.id)}
                                                >
                                                    <img
                                                        src={model.image}
                                                        alt={model.name}
                                                        className="h-10 w-10 rounded-md object-cover"
                                                    />
                                                    <span className="text-center text-xs">{model.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </TabsContent>
                            <TabsContent value="advanced" className="pt-1">
                                <CardContent className="space-y-3 p-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="seed" className="text-sm">{t('generation.seed')}</Label>
                                        <div className="flex gap-1">
                                            <Input id="seed" type="number" placeholder="Random" className="flex-1 h-8 text-sm" />
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <RefreshCw className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="steps" className="text-sm">{t('generation.sampling_steps')}</Label>
                                            <span className="text-xs text-muted-foreground">30</span>
                                        </div>
                                        <Slider id="steps" defaultValue={[30]} min={20} max={150} step={1} className="py-1" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="cfg" className="text-sm">{t('generation.cfg_scale')}</Label>
                                            <span className="text-xs text-muted-foreground">7.0</span>
                                        </div>
                                        <Slider id="cfg" defaultValue={[7]} min={1} max={20} step={0.1} className="py-1" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="sampler" className="text-sm">{t('generation.sampler')}</Label>
                                        <Select defaultValue="euler_a">
                                            <SelectTrigger id="sampler" className="h-8 text-sm">
                                                <SelectValue placeholder={t('generation.sampler')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="euler_a">Euler Ancestral</SelectItem>
                                                <SelectItem value="euler">Euler</SelectItem>
                                                <SelectItem value="ddim">DDIM</SelectItem>
                                                <SelectItem value="dpm_2">DPM++ 2M</SelectItem>
                                                <SelectItem value="dpm_2_a">DPM++ 2M Ancestral</SelectItem>
                                                <SelectItem value="lcm">LCM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-sm">{t('generation.image_to_image')}</Label>

                                        {/* Drag & Drop Area */}
                                        <div
                                            ref={dropZoneRef}
                                            className={cn(
                                                "relative flex h-24 flex-col items-center justify-center rounded-md border border-dashed transition-colors",
                                                isDragging ? "border-primary bg-primary/5" : "hover:border-primary hover:bg-secondary/50",
                                                (sourceImage || isUploading) && "border-solid"
                                            )}
                                            onClick={handleFileUpload}
                                        >
                                            {isUploading ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <RotateCw className="mb-1 h-4 w-4 animate-spin text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground">{localT('generator.uploading')}</p>
                                                </div>
                                            ) : sourceImage ? (
                                                <div className="relative h-full w-full">
                                                    <img
                                                        src={sourceImage}
                                                        alt="Source"
                                                        className="h-full w-full object-cover rounded-md"
                                                    />
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute right-1 top-1 h-6 w-6 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSourceImage(null);
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ) : isDragging ? (
                                                <>
                                                    <Image className="mb-1 h-6 w-6 text-primary" />
                                                    <p className="text-xs text-primary">{localT('generator.drop_here')}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="mb-1 h-5 w-5 text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground">{localT('generator.drag_drop')}</p>
                                                </>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileInputChange}
                                            />
                                        </div>

                                        {/* Strength slider (only show when source image is present) */}
                                        {sourceImage && (
                                            <div className="mt-2 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="img2img-strength" className="text-xs">Strength</Label>
                                                    <span className="text-xs text-muted-foreground">0.75</span>
                                                </div>
                                                <Slider
                                                    id="img2img-strength"
                                                    defaultValue={[0.75]}
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                    className="py-1"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
                        <CardFooter className="p-3">
                            <Button onClick={handleGenerate} disabled={generating} className="w-full h-9">
                                {generating ? (
                                    <>
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        {t('generation.generating')} {progress}%
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        {t('generation.generate')}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="w-full lg:col-span-2">
                    <Card className="flex flex-col shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                            <CardTitle className="text-base">{t('generation.preview')}</CardTitle>
                            {generatedImage && (
                                <div className="flex items-center gap-1.5">
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                                        <ZoomOut className="h-3.5 w-3.5" />
                                    </Button>
                                    <span className="text-xs">{zoomLevel}%</span>
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}>
                                        <ZoomIn className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="p-0">
                            <div
                                ref={generationContainerRef}
                                className={cn(
                                    "generation-preview relative w-full bg-muted/10",
                                    aspectRatio === "1:1" ? "aspect-square" :
                                        aspectRatio === "4:3" ? "aspect-[4/3]" :
                                            aspectRatio === "16:9" ? "aspect-[16/9]" :
                                                aspectRatio === "9:16" ? "aspect-[9/16]" :
                                                    aspectRatio === "2:3" ? "aspect-[2/3]" :
                                                        "aspect-[3/2]",
                                    "border-b"
                                )}
                            >
                                {generating ? (
                                    <div className="flex h-full w-full flex-col items-center justify-center">
                                        <RotateCw className="mb-3 h-10 w-10 animate-spin text-primary" />
                                        <Progress value={progress} className="w-2/3 max-w-md" />
                                        <p className="mt-3 text-sm text-muted-foreground">{t('generation.creating_masterpiece')} {progress}%</p>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {progress < 30 && t('generation.analyzing_prompt')}
                                            {progress >= 30 && progress < 60 && t('generation.generating_composition')}
                                            {progress >= 60 && progress < 90 && t('generation.adding_details')}
                                            {progress >= 90 && t('generation.finalizing')}
                                        </div>
                                    </div>
                                ) : generatedImage ? (
                                    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
                                        <div
                                            className="h-full w-full transition-transform duration-300 ease-in-out"
                                            style={{
                                                transform: `scale(${zoomLevel / 100})`,
                                            }}
                                        >
                                            <img
                                                src={generatedImage}
                                                alt="Generated image"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-4 text-center">
                                        <div className="rounded-full bg-muted/80 p-3">
                                            <Sparkles className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="mt-3 text-sm text-muted-foreground">{localT('generator.image_appears_here')}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{localT('generator.start_prompt')}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        {generatedImage && (
                            <CardFooter className="flex flex-wrap justify-between gap-2 p-3 pt-3">
                                <div className="flex gap-1.5">
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Save className="mr-1.5 h-3.5 w-3.5" />
                                        {t('generation.save')}
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Download className="mr-1.5 h-3.5 w-3.5" />
                                        {t('generation.download')}
                                    </Button>
                                </div>
                                <div className="flex gap-1.5">
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                                        {t('generation.variations')}
                                    </Button>
                                    <Button variant="default" size="sm" className="h-8">
                                        <Send className="mr-1.5 h-3.5 w-3.5" />
                                        {t('generation.share_community')}
                                    </Button>
                                </div>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}