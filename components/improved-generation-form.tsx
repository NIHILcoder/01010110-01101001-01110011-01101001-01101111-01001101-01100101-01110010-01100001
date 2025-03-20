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
import { EnhancedParticlesBackground } from "@/components/enhanced-particles-background";

// Определение типов для тегов
interface TagItem {
    text: string;
    category: string;
}

// Определение типов для моделей
interface ModelOption {
    name: string;
    id: string;
    image: string;
}

// Интерфейс для сгруппированных тегов
interface GroupedTags {
    [category: string]: TagItem[];
}

// Основной компонент
export function EnhancedGenerationForm() {
    // State variables
    const [generating, setGenerating] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [negativePrompt, setNegativePrompt] = useState<string>("");
    const [showTagSuggestions, setShowTagSuggestions] = useState<boolean>(false);
    const [showControlPanel, setShowControlPanel] = useState<boolean>(true);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [zoomLevel, setZoomLevel] = useState<number>(100);
    const [activeTab, setActiveTab] = useState<string>("basic");
    const [aspectRatio, setAspectRatio] = useState<string>("1:1");
    const [enhancePrompt, setEnhancePrompt] = useState<boolean>(false);
    const [selectedModel, setSelectedModel] = useState<string>("flux");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const promptInputRef = useRef<HTMLTextAreaElement>(null);
    const generationContainerRef = useRef<HTMLDivElement>(null);

    // Mock tag suggestions
    const tagSuggestions: TagItem[] = [
        { text: "detailed", category: "quality" },
        { text: "high quality", category: "quality" },
        { text: "photorealistic", category: "style" },
        { text: "8k", category: "resolution" },
        { text: "cinematic lighting", category: "lighting" },
        { text: "sharp focus", category: "focus" },
        { text: "studio quality", category: "quality" },
    ];

    // Model options
    const modelOptions: ModelOption[] = [
        { name: "Flux Realistic", id: "flux", image: "/placeholder.svg?height=80&width=80&text=Flux" },
        { name: "Anime Diffusion", id: "anime", image: "/placeholder.svg?height=80&width=80&text=Anime" },
        { name: "Dreamshaper", id: "dreamshaper", image: "/placeholder.svg?height=80&width=80&text=Dream" },
        { name: "Realistic Vision", id: "realistic", image: "/placeholder.svg?height=80&width=80&text=Real" },
    ];

    // Group tags by category
    const groupedTags: GroupedTags = tagSuggestions.reduce((acc: GroupedTags, tag) => {
        if (!acc[tag.category]) {
            acc[tag.category] = [];
        }
        acc[tag.category].push(tag);
        return acc;
    }, {});

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
    const addTagToPrompt = (tagText: string) => {
        const newPrompt = prompt ? `${prompt}, ${tagText}` : tagText;
        setPrompt(newPrompt);

        // Focus back on the prompt input after adding a tag
        if (promptInputRef.current) {
            promptInputRef.current.focus();
        }
    };

    // Handle file upload
    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Generate image
    const handleGenerate = () => {
        if (!prompt.trim()) {
            return;
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
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
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

    return (
        <div className="container relative mx-auto py-8">
            <EnhancedParticlesBackground variant="sparkles" density={60} />

            {/* Header */}
            <div className="mb-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="flex items-center justify-center mb-2">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary flex items-center">
                        <Sparkles className="h-8 w-8 mr-2 text-primary animate-pulse" />
                        VisioMera Studio
                    </div>
                </div>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Transform your imagination into stunning visuals with our AI-powered creative platform
                </p>

                <Tabs defaultValue="standard" className="w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="standard" className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Standard
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Advanced
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Main Content - Centered structure */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left side: Generation Settings */}
                <div className="w-full lg:w-1/3 space-y-4">
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
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                                        <Label>Image to Image</Label>
                                        <div
                                            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors hover:border-primary hover:bg-secondary/50"
                                            onClick={handleFileUpload}
                                        >
                                            <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">Click to upload an image</p>
                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
                                        </div>
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

                {/* Right side: Preview - Larger size */}
                <div className="w-full lg:w-2/3 space-y-4">
                    <Card className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle>Preview</CardTitle>
                            <div className="flex items-center gap-2">
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
                                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div
                                ref={generationContainerRef}
                                className={cn(
                                    "generation-preview relative",
                                    aspectRatio === "1:1" ? "aspect-square" :
                                        aspectRatio === "4:3" ? "aspect-4/3" :
                                            aspectRatio === "16:9" ? "aspect-16/9" :
                                                aspectRatio === "9:16" ? "aspect-9/16" :
                                                    aspectRatio === "2:3" ? "aspect-2/3" :
                                                        "aspect-3/2",
                                    // Make the preview larger
                                    "h-auto lg:h-[600px] mx-auto"
                                )}
                            >
                                {generating ? (
                                    <div className="flex h-full w-full flex-col items-center justify-center">
                                        <RotateCw className="mb-4 h-12 w-12 animate-spin text-primary" />
                                        <Progress value={progress} className="w-2/3 max-w-md" />
                                        <p className="mt-4 text-sm text-muted-foreground">Creating your masterpiece... {progress}%</p>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            {progress < 30 && "Analyzing prompt..."}
                                            {progress >= 30 && progress < 60 && "Generating base composition..."}
                                            {progress >= 60 && progress < 90 && "Adding details and refining..."}
                                            {progress >= 90 && "Finalizing image..."}
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
                                                src={generatedImage || "/placeholder.svg"}
                                                alt="Generated image"
                                                className="h-full w-full object-contain"
                                            />
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
                        </CardContent>

                        {generatedImage && (
                            <CardFooter className="flex flex-wrap justify-center gap-4 sm:justify-between">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
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