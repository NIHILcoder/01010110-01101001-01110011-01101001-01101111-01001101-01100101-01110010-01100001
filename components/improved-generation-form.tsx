"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    X,
    Check
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
            'generator.tag_added': 'Tag added to prompt',
            'generator.prompt_copied': 'Prompt copied to clipboard',
            'generator.processing.0': 'Analyzing your prompt...',
            'generator.processing.25': 'Gathering visual elements...',
            'generator.processing.50': 'Crafting composition...',
            'generator.processing.75': 'Adding details and refinements...',
            'generator.processing.95': 'Applying final touches...',
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
            'generator.tag_added': 'Тег добавлен в промпт',
            'generator.prompt_copied': 'Промпт скопирован в буфер обмена',
            'generator.processing.0': 'Анализируем ваш промпт...',
            'generator.processing.25': 'Собираем визуальные элементы...',
            'generator.processing.50': 'Создаём композицию...',
            'generator.processing.75': 'Добавляем детали и улучшения...',
            'generator.processing.95': 'Применяем финальные штрихи...',
        }
    };
    const { localT } = useLocalTranslation(pageTranslations);

    // Состояния
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
    const [notification, setNotification] = useState<{message: string, visible: boolean}>({message: '', visible: false});
    const [lastCopiedPrompt, setLastCopiedPrompt] = useState<string>("");
    const [processingStage, setProcessingStage] = useState<string>("");
    const [promptFocused, setPromptFocused] = useState<boolean>(false);

    // Рефы
    const fileInputRef = useRef<HTMLInputElement>(null);
    const promptInputRef = useRef<HTMLTextAreaElement>(null);
    const generationContainerRef = useRef<HTMLDivElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    // Популярные теги
    const commonTags = [
        { key: 'generator.detailed', value: 'детализированный' },
        { key: 'generator.high_quality', value: 'высокое качество' },
        { key: 'generator.photorealistic', value: 'фотореалистичный' },
        { key: 'generator.8k', value: '8k' },
        { key: 'generator.cinematic', value: 'кинематографическое освещение' },
        { key: 'generator.sharp_focus', value: 'резкий фокус' },
    ];

    // Доступные модели
    const availableModels = [
        { id: "flux", name: "Flux Realistic", image: "/placeholder.svg?height=80&width=80&text=Flux" },
        { id: "anime", name: "Anime Diffusion", image: "/placeholder.svg?height=80&width=80&text=Anime" },
        { id: "dreamshaper", name: "Dreamshaper", image: "/placeholder.svg?height=80&width=80&text=Dream" },
        { id: "realistic", name: "Realistic Vision", image: "/placeholder.svg?height=80&width=80&text=Real" }
    ];

    // Анимационные варианты
    const fadeInOut = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const slideUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const scale = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };

    const pulse = {
        hidden: { scale: 1 },
        visible: {
            scale: [1, 1.05, 1],
            transition: {
                repeat: Infinity,
                repeatType: "loop" as const,
                duration: 2
            }
        }
    };

    // Обработчики
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        if (e.target.value.length > 0) {
            setShowTagSuggestions(true);
        }
    };

    const addTagToPrompt = (tag: string) => {
        if (prompt.trim().length > 0 && !prompt.endsWith(' ')) {
            setPrompt(prev => `${prev}, ${tag}`);
        } else {
            setPrompt(prev => `${prev}${tag}`);
        }
        promptInputRef.current?.focus();

        // Показать уведомление
        setNotification({
            message: localT('generator.tag_added'),
            visible: true
        });

        setTimeout(() => {
            setNotification({
                message: '',
                visible: false
            });
        }, 2000);
    };

    const copyPromptToClipboard = () => {
        navigator.clipboard.writeText(prompt);
        setLastCopiedPrompt(prompt);

        // Показать уведомление
        setNotification({
            message: localT('generator.prompt_copied'),
            visible: true
        });

        setTimeout(() => {
            setNotification({
                message: '',
                visible: false
            });
        }, 2000);
    };

    // Обновление этапа обработки в зависимости от прогресса
    useEffect(() => {
        if (generating) {
            if (progress < 25) {
                setProcessingStage(localT('generator.processing.0'));
            } else if (progress < 50) {
                setProcessingStage(localT('generator.processing.25'));
            } else if (progress < 75) {
                setProcessingStage(localT('generator.processing.50'));
            } else if (progress < 95) {
                setProcessingStage(localT('generator.processing.75'));
            } else {
                setProcessingStage(localT('generator.processing.95'));
            }
        }
    }, [progress, generating, localT]);

    const handleGenerate = () => {
        if (!prompt.trim()) {
            return;
        }
        setGenerating(true);
        setProgress(0);

        // Анимированный прогресс с переменной скоростью
        let currentProgress = 0;
        const interval = setInterval(() => {
            // Постепенно замедляем прогресс к концу
            let step = Math.max(0.5, 5 - (currentProgress / 20));

            currentProgress += step;
            if (currentProgress >= 100) {
                clearInterval(interval);
                setGenerating(false);
                setGeneratedImage("/placeholder.svg?height=1024&width=1024&text=Generated+Image");
                return;
            }
            setProgress(currentProgress);
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
            const result = e.target?.result;
            if (result) {
                // Имитация загрузки для демонстрации анимации
                setTimeout(() => {
                    setSourceImage(result as string);
                    setIsUploading(false);
                }, 1000);
            }
        };
        reader.readAsDataURL(file);
    };

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

    // Эффект для настройки области перетаскивания
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
            {/* Уведомление */}
            <AnimatePresence>
                {notification.visible && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeInOut}
                        className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                    >
                        <Check className="h-4 w-4" />
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-0">
                {/* Панель настроек */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full lg:col-span-1"
                >
                    <Card className="shadow-sm border-muted/80 hover:border-primary/30 transition-colors duration-300">
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
                                            <Label
                                                htmlFor="prompt"
                                                className={`text-sm font-medium transition-colors duration-200 ${promptFocused ? "text-primary" : ""}`}
                                            >
                                                {t('generation.prompt')}
                                            </Label>
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
                                                className={cn(
                                                    "min-h-[100px] resize-none text-sm transition-all duration-300",
                                                    promptFocused ? "border-primary ring-1 ring-primary" : ""
                                                )}
                                                value={prompt}
                                                onChange={handlePromptChange}
                                                ref={promptInputRef}
                                                onFocus={() => setPromptFocused(true)}
                                                onBlur={() => setPromptFocused(false)}
                                            />
                                            {enhancePrompt && (
                                                <motion.div
                                                    className="absolute right-2 bottom-2 text-primary"
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={pulse}
                                                >
                                                    <Sparkles className="h-4 w-4" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowTagSuggestions(!showTagSuggestions)}
                                                className="text-xs h-7 relative overflow-hidden group"
                                            >
                                                <span className="relative z-10 flex items-center">
                                                    <Plus className="mr-1 h-3 w-3 group-hover:rotate-90 transition-transform duration-200" />
                                                    {t('generation.suggestions')}
                                                </span>
                                                <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 relative overflow-hidden group"
                                                onClick={copyPromptToClipboard}
                                            >
                                                <span className="relative z-10 flex items-center">
                                                    {lastCopiedPrompt === prompt ? (
                                                        <Check className="mr-1 h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <Copy className="mr-1 h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
                                                    )}
                                                    {t('generation.save_prompt')}
                                                </span>
                                                <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                                            </Button>
                                        </div>
                                        {/* Блок с тегами */}
                                        <AnimatePresence>
                                            {showTagSuggestions && (
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    variants={slideUp}
                                                    className="rounded-md border bg-card p-2 shadow-sm"
                                                >
                                                    <h4 className="mb-1 text-xs font-medium">{localT('generator.prompt_suggestions')}</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {commonTags.map((tag) => (
                                                            <Badge
                                                                key={tag.key}
                                                                variant="outline"
                                                                className="cursor-pointer hover:bg-primary/10 text-xs transform hover:scale-105 transition-transform duration-200"
                                                                onClick={() => addTagToPrompt(tag.value)}
                                                            >
                                                                {localT(tag.key)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
                                                <motion.div
                                                    key={model.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={cn(
                                                        "flex cursor-pointer flex-col items-center gap-1 rounded-md border p-1.5 transition-all hover:border-primary hover:bg-secondary/50",
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
                                                </motion.div>
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
                                            <Button variant="outline" size="icon" className="h-8 w-8 hover:rotate-180 transition-transform duration-500">
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
                                        {/* Область перетаскивания с анимациями */}
                                        <motion.div
                                            ref={dropZoneRef}
                                            className={cn(
                                                "relative flex h-24 flex-col items-center justify-center rounded-md border border-dashed transition-colors",
                                                isDragging ? "border-primary bg-primary/5" : "hover:border-primary hover:bg-secondary/50",
                                                (sourceImage || isUploading) && "border-solid"
                                            )}
                                            onClick={handleFileUpload}
                                            animate={{
                                                borderColor: isDragging ? "hsl(var(--primary))" : "hsl(var(--border))",
                                                backgroundColor: isDragging ? "rgba(var(--primary), 0.1)" : "transparent"
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isUploading ? (
                                                    <motion.div
                                                        key="uploading"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        variants={fadeInOut}
                                                        className="flex flex-col items-center justify-center"
                                                    >
                                                        <RotateCw className="mb-1 h-4 w-4 animate-spin text-primary" />
                                                        <p className="text-xs text-primary">{localT('generator.uploading')}</p>
                                                    </motion.div>
                                                ) : sourceImage ? (
                                                    <motion.div
                                                        key="image"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        variants={scale}
                                                        className="relative h-full w-full"
                                                    >
                                                        <img
                                                            src={sourceImage}
                                                            alt="Source"
                                                            className="h-full w-full object-cover rounded-md"
                                                        />
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute right-1 top-1 h-6 w-6 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSourceImage(null);
                                                            }}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </motion.div>
                                                ) : isDragging ? (
                                                    <motion.div
                                                        key="drop"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        variants={scale}
                                                        className="flex flex-col items-center"
                                                    >
                                                        <Image className="mb-1 h-6 w-6 text-primary" />
                                                        <p className="text-xs text-primary">{localT('generator.drop_here')}</p>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="default"
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        variants={fadeInOut}
                                                        className="flex flex-col items-center"
                                                    >
                                                        <Upload className="mb-1 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{localT('generator.drag_drop')}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileInputChange}
                                            />
                                        </motion.div>
                                        {/* Слайдер силы изображения */}
                                        <AnimatePresence>
                                            {sourceImage && (
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    variants={slideUp}
                                                    className="mt-2 space-y-1"
                                                >
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
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
                        <CardFooter className="p-3">
                            <Button
                                onClick={handleGenerate}
                                disabled={generating || !prompt.trim()}
                                className={cn(
                                    "w-full h-9 relative overflow-hidden transition-all duration-300",
                                    prompt.trim() && !generating ? "bg-primary hover:bg-primary/90" : ""
                                )}
                            >
                                {generating ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center"
                                    >
                                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        {t('generation.generating')} {Math.round(progress)}%
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="flex items-center"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        {t('generation.generate')}
                                    </motion.div>
                                )}
                                {!generating && prompt.trim() && (
                                    <motion.span
                                        className="absolute inset-0 bg-white/10"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1.5, opacity: 0.2 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Область предпросмотра */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-full lg:col-span-2"
                >
                    <Card className="flex flex-col shadow-sm border-muted/80 hover:border-primary/30 transition-colors duration-300">
                        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                            <CardTitle className="text-base">{t('generation.preview')}</CardTitle>
                            {generatedImage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1.5"
                                >
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                                        <ZoomOut className="h-3.5 w-3.5" />
                                    </Button>
                                    <span className="text-xs">{zoomLevel}%</span>
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}>
                                        <ZoomIn className="h-3.5 w-3.5" />
                                    </Button>
                                </motion.div>
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
                                    "border-b overflow-hidden"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {generating ? (
                                        <motion.div
                                            key="generating"
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={fadeInOut}
                                            className="flex h-full w-full flex-col items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ rotate: 0 }}
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="mb-6"
                                            >
                                                <div className="relative">
                                                    <Sparkles className="absolute -left-6 -top-6 h-4 w-4 text-primary/60" />
                                                    <Sparkles className="absolute -right-8 -bottom-4 h-5 w-5 text-primary/70" />
                                                    <Sparkles className="h-12 w-12 text-primary" />
                                                </div>
                                            </motion.div>

                                            <div className="w-2/3 max-w-md mb-4">
                                                <Progress value={progress} className="h-2" />
                                                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                                    <span>0%</span>
                                                    <span>{Math.round(progress)}%</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>

                                            <motion.p
                                                className="mt-1 text-sm text-primary font-medium"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {t('generation.creating_masterpiece')} {Math.round(progress)}%
                                            </motion.p>

                                            <motion.div
                                                key={processingStage}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-1 text-xs text-muted-foreground"
                                            >
                                                {processingStage}
                                            </motion.div>
                                        </motion.div>
                                    ) : generatedImage ? (
                                        <motion.div
                                            key="result"
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={scale}
                                            className="relative h-full w-full overflow-hidden flex items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: zoomLevel / 100, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="h-full w-full"
                                            >
                                                <img
                                                    src={generatedImage}
                                                    alt="Generated image"
                                                    className="h-full w-full object-contain"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={fadeInOut}
                                            className="flex h-full w-full flex-col items-center justify-center bg-muted/5 p-4 text-center"
                                        >
                                            <motion.div
                                                className="rounded-full bg-muted/80 p-3"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Sparkles className="h-6 w-6 text-muted-foreground" />
                                            </motion.div>
                                            <motion.p
                                                className="mt-3 text-sm text-muted-foreground"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                            >
                                                {localT('generator.image_appears_here')}
                                            </motion.p>
                                            <motion.p
                                                className="mt-1 text-xs text-muted-foreground"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                            >
                                                {localT('generator.start_prompt')}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </CardContent>

                        {/* Панель действий с сгенерированным изображением */}
                        <AnimatePresence>
                            {generatedImage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CardFooter className="flex flex-wrap justify-between gap-2 p-3 pt-3">
                                        <div className="flex gap-1.5">
                                            <Button variant="outline" size="sm" className="h-8 hover:bg-primary/5 transition-colors duration-200">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center"
                                                >
                                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                                    {t('generation.save')}
                                                </motion.div>
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 hover:bg-primary/5 transition-colors duration-200">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center"
                                                >
                                                    <Download className="mr-1.5 h-3.5 w-3.5" />
                                                    {t('generation.download')}
                                                </motion.div>
                                            </Button>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <Button variant="outline" size="sm" className="h-8 hover:bg-primary/5 transition-colors duration-200">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center"
                                                >
                                                    <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                                                    {t('generation.variations')}
                                                </motion.div>
                                            </Button>
                                            <Button variant="default" size="sm" className="h-8 relative overflow-hidden">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center relative z-10"
                                                >
                                                    <Send className="mr-1.5 h-3.5 w-3.5" />
                                                    {t('generation.share_community')}
                                                </motion.div>
                                                <motion.span
                                                    className="absolute inset-0 bg-white/10"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    whileHover={{ scale: 1.5, opacity: 0.2 }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}