"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
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
    Clock,
    X,
    Image,
    ZoomIn,
    ZoomOut,
    Settings,
    History,
    BookOpen,
    PanelLeft,
    PanelRight,
    Star,
    AlignLeft,
    Sliders,
    Lightbulb
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface GenerationFormProps {
    className?: string;
}

export function EnhancedGenerationForm({ className }: GenerationFormProps) {
    // State variables
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [negativePrompt, setNegativePrompt] = useState("");
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const [showControlPanel, setShowControlPanel] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [activeTab, setActiveTab] = useState("basic");
    const [isExpanded, setIsExpanded] = useState(true);
    const [showPromptHistory, setShowPromptHistory] = useState(false);
    const [promptHistory, setPromptHistory] = useState<string[]>([
        "A beautiful landscape with mountains and a lake under sunset sky, cinematic lighting, detailed, 8k",
        "Portrait of a young woman with blue eyes and blonde hair, photorealistic, studio lighting",
        "Futuristic cityscape at night with neon lights and flying cars, detailed, sci-fi"
    ]);
    const [recentGenerations, setRecentGenerations] = useState<string[]>([
        "/placeholder.svg?height=512&width=512&text=Recent+1",
        "/placeholder.svg?height=512&width=512&text=Recent+2",
        "/placeholder.svg?height=512&width=512&text=Recent+3",
        "/placeholder.svg?height=512&width=512&text=Recent+4",
    ]);
    const [selectedModel, setSelectedModel] = useState("flux");
    const [aspectRatio, setAspectRatio] = useState("1:1");
    const [enhancePrompt, setEnhancePrompt] = useState(false);
    const [autoAdjust, setAutoAdjust] = useState(true);
    const [customInstructions, setCustomInstructions] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const promptInputRef = useRef<HTMLTextAreaElement>(null);
    const generationContainerRef = useRef<HTMLDivElement>(null);

    // Handle prompt change
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        setShowTagSuggestions(e.target.value.length > 0);
    };

    // Handle negative prompt change
    const handleNegativePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNegativePrompt(e.target.value);
    };

    // Add tag to prompt
    const addTagToPrompt = (tag: string) => {
        const newPrompt = prompt ? `${prompt}, ${tag}` : tag;
        setPrompt(newPrompt);

        // Focus back on the prompt input after adding a tag
        if (promptInputRef.current) {
            promptInputRef.current.focus();
        }
    };

    // Handle file upload
    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    // Generate image
    const handleGenerate = () => {
        if (!prompt.trim()) {
            // Show a notification or feedback that prompt is required
            return;
        }

        // Save prompt to history if it's not already there
        if (!promptHistory.includes(prompt)) {
            setPromptHistory((prev) => [prompt, ...prev.slice(0, 9)]);
        }

        setGenerating(true);
        setProgress(0);

        // Simulate generation process with progress updates
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setGenerating(false);
                    setGeneratedImage("/placeholder.svg?height=1024&width=1024&text=Generated+Image");
                    // Add to recent generations
                    setRecentGenerations((prev) => [
                        "/placeholder.svg?height=512&width=512&text=New+Generation",
                        ...prev.slice(0, 3),
                    ]);
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
    };

    // Toggle control panel
    const toggleControlPanel = () => {
        setShowControlPanel(!showControlPanel);
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    // Zoom in/out
    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 10, 50));
    };

    // Reset zoom
    const resetZoom = () => {
        setZoomLevel(100);
    };

    // Handle use prompt from history
    const usePromptFromHistory = (selectedPrompt: string) => {
        setPrompt(selectedPrompt);
        setShowPromptHistory(false);
    };

    // Mock tag suggestions based on what the user might be typing
    const tagSuggestions = [
        { text: "detailed", category: "quality" },
        { text: "high quality", category: "quality" },
        { text: "photorealistic", category: "style" },
        { text: "8k", category: "resolution" },
        { text: "cinematic lighting", category: "lighting" },
        { text: "sharp focus", category: "focus" },
        { text: "studio quality", category: "quality" },
        { text: "professional", category: "quality" },
        { text: "trending on artstation", category: "popular" },
        { text: "vibrant colors", category: "color" },
        { text: "hyper detailed", category: "detail" },
        { text: "beautiful composition", category: "composition" }
    ];

    // Style presets with visual examples
    const stylePresets = [
        { name: "Photorealistic", image: "/placeholder.svg?height=100&width=100&text=Photo" },
        { name: "Anime", image: "/placeholder.svg?height=100&width=100&text=Anime" },
        { name: "Oil Painting", image: "/placeholder.svg?height=100&width=100&text=Oil" },
        { name: "Watercolor", image: "/placeholder.svg?height=100&width=100&text=Water" },
        { name: "3D Render", image: "/placeholder.svg?height=100&width=100&text=3D" },
        { name: "Sketch", image: "/placeholder.svg?height=100&width=100&text=Sketch" },
        { name: "Pixel Art", image: "/placeholder.svg?height=100&width=100&text=Pixel" },
        { name: "Fantasy", image: "/placeholder.svg?height=100&width=100&text=Fantasy" },
    ];

    // Model options with visual examples
    const modelOptions = [
        { name: "Flux Realistic", id: "flux", image: "/placeholder.svg?height=80&width=80&text=Flux" },
        { name: "Anime Diffusion", id: "anime", image: "/placeholder.svg?height=80&width=80&text=Anime" },
        { name: "Dreamshaper", id: "dreamshaper", image: "/placeholder.svg?height=80&width=80&text=Dream" },
        { name: "Realistic Vision", id: "realistic", image: "/placeholder.svg?height=80&width=80&text=Real" },
        { name: "Deliberate", id: "deliberate", image: "/placeholder.svg?height=80&width=80&text=Delib" },
        { name: "Custom Model", id: "custom", image: "/placeholder.svg?height=80&width=80&text=Custom" },
    ];

    // LoRA options
    const loraOptions = ["Character LoRA", "Style LoRA", "Detail LoRA", "Custom LoRA"];

    // Group tags by category
    const groupedTags = tagSuggestions.reduce((acc, tag) => {
        if (!acc[tag.category]) {
            acc[tag.category] = [];
        }
        acc[tag.category].push(tag);
        return acc;
    }, {} as Record<string, typeof tagSuggestions>);

    // Used for animation
    useEffect(() => {
        if (generationContainerRef.current) {
            generationContainerRef.current.style.opacity = '0';
            setTimeout(() => {
                if (generationContainerRef.current) {
                    generationContainerRef.current.style.opacity = '1';
                }
            }, 100);
        }
    }, [fullscreen]);

    return (
        <div className={cn("relative flex flex-col", className)}>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        <Sparkles className="h-6 w-6 text-primary" />
                        Create New Image
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Describe what you want to see, and AI will create it for you
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hidden md:flex"
                    >
                        {isExpanded ? <PanelLeft className="mr-2 h-4 w-4" /> : <PanelRight className="mr-2 h-4 w-4" />}
                        {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{fullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={cn(
                    "grid gap-6 transition-all duration-300",
                    fullscreen ? "fixed inset-0 z-50 bg-background p-6" : "relative",
                    isExpanded ? "md:grid-cols-3 lg:grid-cols-5" : "grid-cols-1"
                )}
                ref={generationContainerRef}
            >
                {/* Left Panel - Settings */}
                {(showControlPanel || !fullscreen) && (
                    <div className={cn("space-y-6", isExpanded ? "md:col-span-1 lg:col-span-2" : "md:col-span-1")}>
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle>Image Settings</CardTitle>
                                    <Select value={aspectRatio} onValueChange={setAspectRatio}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Aspect Ratio" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1:1">1:1 Square</SelectItem>
                                            <SelectItem value="4:3">4:3 Standard</SelectItem>
                                            <SelectItem value="16:9">16:9 Widescreen</SelectItem>
                                            <SelectItem value="9:16">9:16 Portrait</SelectItem>
                                            <SelectItem value="2:3">2:3 Portrait</SelectItem>
                                            <SelectItem value="3:2">3:2 Landscape</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <CardDescription>Configure your generation parameters</CardDescription>
                            </CardHeader>

                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <div className="px-6">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="basic" className="flex-1">
                                            Basic
                                        </TabsTrigger>
                                        <TabsTrigger value="advanced" className="flex-1">
                                            Advanced
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="basic" className="pt-2">
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="prompt" className="text-base font-medium">Prompt</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="enhance-prompt"
                                                        checked={enhancePrompt}
                                                        onCheckedChange={setEnhancePrompt}
                                                    />
                                                    <Label htmlFor="enhance-prompt" className="text-xs">AI Enhance</Label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                                <Lightbulb className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>AI will enhance your prompt with additional details</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <Textarea
                                                    id="prompt"
                                                    placeholder="Describe your image in detail... (e.g., A serene landscape with mountains, a calm lake under twilight sky with stars beginning to appear)"
                                                    className="min-h-[120px] resize-none"
                                                    value={prompt}
                                                    onChange={handlePromptChange}
                                                    ref={promptInputRef}
                                                />

                                                {/* Prompt history button */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-2"
                                                    onClick={() => setShowPromptHistory(!showPromptHistory)}
                                                >
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                </Button>

                                                {/* Prompt history dropdown */}
                                                {showPromptHistory && (
                                                    <Card className="absolute right-0 top-10 z-50 w-full max-w-md shadow-lg">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-sm">Recent Prompts</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="p-2">
                                                            <ScrollArea className="h-64">
                                                                <div className="space-y-1">
                                                                    {promptHistory.map((historyPrompt, index) => (
                                                                        <Button
                                                                            key={index}
                                                                            variant="ghost"
                                                                            className="w-full justify-start truncate text-left text-xs"
                                                                            onClick={() => usePromptFromHistory(historyPrompt)}
                                                                        >
                                                                            {historyPrompt}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </ScrollArea>
                                                        </CardContent>
                                                    </Card>
                                                )}

                                                {/* Tag suggestions */}
                                                {showTagSuggestions && (
                                                    <Card className="absolute bottom-2 left-2 right-2 z-10 max-h-64 overflow-auto p-2 shadow-md">
                                                        <div className="mb-2 flex items-center justify-between px-2">
                                                            <div className="text-xs font-medium">Suggested tags:</div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => setShowTagSuggestions(false)}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                        <ScrollArea className="h-48 pr-4">
                                                            {Object.entries(groupedTags).map(([category, tags]) => (
                                                                <div key={category} className="mb-3">
                                                                    <div className="mb-1 px-2 text-xs font-semibold capitalize text-muted-foreground">
                                                                        {category}:
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1 px-2">
                                                                        {tags.map((tag) => (
                                                                            <Badge
                                                                                key={tag.text}
                                                                                variant="outline"
                                                                                className="cursor-pointer bg-secondary hover:bg-primary hover:text-primary-foreground"
                                                                                onClick={() => addTagToPrompt(tag.text)}
                                                                            >
                                                                                {tag.text}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </ScrollArea>
                                                    </Card>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setShowTagSuggestions(true)}
                                                    className="text-xs"
                                                >
                                                    <Plus className="mr-1 h-3 w-3" />
                                                    Suggestions
                                                </Button>

                                                <Button variant="outline" size="sm" className="text-xs">
                                                    <Save className="mr-1 h-3 w-3" />
                                                    Save Prompt
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="negative-prompt" className="flex items-center gap-2">
                                                Negative Prompt
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-5 w-5">
                                                            <Lightbulb className="h-3 w-3" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Elements to exclude from the generated image</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </Label>
                                            <Textarea
                                                id="negative-prompt"
                                                placeholder="Elements to avoid in the image... (e.g., blurry, bad anatomy, distorted, watermark, signature)"
                                                className="min-h-[80px] resize-none"
                                                value={negativePrompt}
                                                onChange={handleNegativePromptChange}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-base font-medium">Model Selection</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {modelOptions.map((model) => (
                                                    <div
                                                        key={model.id}
                                                        className={cn(
                                                            "flex cursor-pointer flex-col items-center gap-1 rounded-md border p-2 transition-all hover:border-primary hover:bg-secondary",
                                                            selectedModel === model.id && "border-primary bg-primary/5"
                                                        )}
                                                        onClick={() => setSelectedModel(model.id)}
                                                    >
                                                        <img
                                                            src={model.image || "/placeholder.svg"}
                                                            alt={model.name}
                                                            className="h-14 w-14 rounded-md object-cover"
                                                        />
                                                        <span className="mt-1 text-center text-xs">{model.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Style Presets</Label>
                                            <ScrollArea className="h-[140px] rounded-md border">
                                                <div className="flex flex-wrap gap-2 p-2">
                                                    {stylePresets.map((style) => (
                                                        <TooltipProvider key={style.name}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="flex cursor-pointer flex-col items-center rounded-md border p-1 transition-colors hover:border-primary hover:bg-secondary">
                                                                        <img
                                                                            src={style.image || "/placeholder.svg"}
                                                                            alt={style.name}
                                                                            className="h-16 w-16 rounded-md object-cover"
                                                                        />
                                                                        <span className="mt-1 text-xs">{style.name}</span>
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Apply {style.name} style</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </CardContent>
                                </TabsContent>

                                <TabsContent value="advanced" className="pt-2">
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="seed">Seed</Label>
                                            <div className="flex gap-2">
                                                <Input id="seed" type="number" placeholder="Random" className="flex-1" />
                                                <Button variant="outline" size="icon">
                                                    <RefreshCw className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="steps">Sampling Steps</Label>
                                                <span className="text-xs text-muted-foreground">30</span>
                                            </div>
                                            <Slider id="steps" defaultValue={[30]} min={20} max={150} step={1} className="py-2" />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="cfg">CFG Scale</Label>
                                                <span className="text-xs text-muted-foreground">7.0</span>
                                            </div>
                                            <Slider id="cfg" defaultValue={[7]} min={1} max={20} step={0.1} className="py-2" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="sampler">Sampler</Label>
                                            <Select defaultValue="euler_a">
                                                <SelectTrigger id="sampler">
                                                    <SelectValue placeholder="Select sampler" />
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

                                        <div className="space-y-2">
                                            <Label htmlFor="batch-size">Batch Size</Label>
                                            <Select defaultValue="1">
                                                <SelectTrigger id="batch-size">
                                                    <SelectValue placeholder="Select batch size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 Image</SelectItem>
                                                    <SelectItem value="2">2 Images</SelectItem>
                                                    <SelectItem value="4">4 Images</SelectItem>
                                                    <SelectItem value="9">9 Images</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                Image to Image
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-5 w-5">
                                                            <Lightbulb className="h-3 w-3" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Upload an image to use as a starting point</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </Label>
                                            <div className="flex flex-col gap-2">
                                                <div
                                                    className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors hover:border-primary hover:bg-secondary/50"
                                                    onClick={handleFileUpload}
                                                >
                                                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">Click to upload an image</p>
                                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="img2img-strength">Strength</Label>
                                                        <span className="text-xs text-muted-foreground">0.75</span>
                                                    </div>
                                                    <Slider
                                                        id="img2img-strength"
                                                        defaultValue={[0.75]}
                                                        min={0}
                                                        max={1}
                                                        step={0.01}
                                                        className="py-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label>LoRA Selection</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {loraOptions.map((lora) => (
                                                    <Badge key={lora} variant="outline" className="cursor-pointer hover:bg-secondary">
                                                        {lora}
                                                    </Badge>
                                                ))}
                                                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                                                    <Plus className="mr-1 h-3 w-3" />
                                                    Add LoRA
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="auto-adjust">Auto-adjust Settings</Label>
                                                <Switch
                                                    id="auto-adjust"
                                                    checked={autoAdjust}
                                                    onCheckedChange={setAutoAdjust}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Automatically optimize settings based on your prompt
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="custom-instructions">Custom Instructions</Label>
                                            <Textarea
                                                id="custom-instructions"
                                                placeholder="Additional instructions for the AI model..."
                                                className="min-h-[80px] resize-none"
                                                value={customInstructions}
                                                onChange={(e) => setCustomInstructions(e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </TabsContent>
                            </Tabs>

                            <CardFooter>
                                <Button onClick={handleGenerate} disabled={generating} className="w-full">
                                    {generating ? (
                                        <>
                                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                            Generating... {progress}%
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )}

                {/* Right panel - Preview */}
                <div className={cn(
                    "space-y-4",
                    isExpanded ? "md:col-span-2 lg:col-span-3" : "md:col-span-1",
                    fullscreen && !showControlPanel && "md:col-span-full lg:col-span-full"
                )}>
                    <Card className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle>Preview</CardTitle>
                            <div className="flex items-center gap-2">
                                {fullscreen && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={toggleControlPanel}
                                        className="flex md:hidden"
                                    >
                                        {showControlPanel ? <AlignLeft className="h-4 w-4" /> : <Sliders className="h-4 w-4" />}
                                    </Button>
                                )}
                                {generatedImage && (
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                                            <ZoomOut className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={resetZoom}>
                                            {zoomLevel}%
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                                            <ZoomIn className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={cn(
                                    "generation-preview relative",
                                    aspectRatio === "1:1" ? "aspect-square" :
                                        aspectRatio === "4:3" ? "aspect-4/3" :
                                            aspectRatio === "16:9" ? "aspect-16/9" :
                                                aspectRatio === "9:16" ? "aspect-9/16" :
                                                    aspectRatio === "2:3" ? "aspect-2/3" :
                                                        "aspect-3/2"
                                )}
                            >
                                {generating ? (
                                    <div className="flex h-full w-full flex-col items-center justify-center">
                                        <RotateCw className="mb-4 h-12 w-12 animate-spin text-primary" />
                                        <Progress value={progress} className="w-2/3" />
                                        <p className="mt-4 text-sm text-muted-foreground">Creating your masterpiece... {progress}%</p>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            {progress < 30 && "Analyzing prompt..."}
                                            {progress >= 30 && progress < 60 && "Generating base composition..."}
                                            {progress >= 60 && progress < 90 && "Adding details and refining..."}
                                            {progress >= 90 && "Finalizing image..."}
                                        </div>
                                    </div>
                                ) : generatedImage ? (
                                    <div className="relative h-full w-full overflow-hidden">
                                        <div
                                            className="h-full w-full transition-transform duration-300 ease-in-out"
                                            style={{
                                                transform: `scale(${zoomLevel / 100})`,
                                            }}
                                        >
                                            <img
                                                src={generatedImage || "/placeholder.svg"}
                                                alt="Generated image"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                                                        >
                                                            <Maximize2 className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View fullscreen</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-muted/20 p-6 text-center">
                                        <div className="rounded-full bg-muted p-4">
                                            <Sparkles className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <p className="mt-4 text-muted-foreground">Your generated image will appear here</p>
                                        <p className="mt-2 text-xs text-muted-foreground">Start by entering a detailed prompt</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent generations gallery */}
                            {recentGenerations.length > 0 && (
                                <div className="mt-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-sm font-medium">Recent Generations</h3>
                                        <Button variant="ghost" size="sm">
                                            View all
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {recentGenerations.map((image, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-md"
                                            >
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Recent generation ${index + 1}`}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <div className="flex gap-1">
                                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-white">
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-white">
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        {generatedImage && (
                            <CardFooter className="flex justify-between">
                                <div className="flex gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Save to collection</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Share image</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Download image</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Wand2 className="mr-2 h-4 w-4" />
                                        Variations
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Star className="mr-2 h-4 w-4" />
                                        Favorite
                                    </Button>
                                    <Button variant="default" size="sm">
                                        <Send className="mr-2 h-4 w-4" />
                                        Share to Community
                                    </Button>
                                </div>
                            </CardFooter>
                        )}
                    </Card>

                    {/* Visual workflow editor for advanced mode */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Layers className="mr-2 h-4 w-4" />
                                Open Visual Workflow Editor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Visual Workflow Editor</DialogTitle>
                                <DialogDescription>Create and customize advanced generation workflows</DialogDescription>
                            </DialogHeader>
                            <div className="h-[500px] rounded-md border bg-muted/20 p-4">
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">Visual workflow editor would be displayed here</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Quick Access Tools (Fixed position) */}
            <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                                <History className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Generation History</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                                <BookOpen className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Prompt Library</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Quick Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}