"use client";

import { EnhancedGenerationForm as ImprovedGenerationForm } from "@/components/improved-generation-form"
import { EnhancedParticlesBackground } from "@/components/enhanced-particles-background"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Lightbulb, Info } from "lucide-react"
import type { MouseEvent as ReactMouseEvent } from 'react';

export default function EnhancedHomePage() {
    return (
        <div className="container relative mx-auto px-4 py-6 md:py-8">
            <EnhancedParticlesBackground variant="sparkles" density={60} />

            {/* Header section with improved responsiveness - KEEPING ONLY ONE TOGGLE */}
            <div className="mb-6 md:mb-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="flex items-center justify-center mb-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary flex items-center">
                        <Sparkles className="h-6 w-6 md:h-8 md:w-8 mr-2 text-primary animate-pulse" />
                        VisioMera Studio
                    </div>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                    Transform your imagination into stunning visuals with our AI-powered creative platform
                </p>

                {/* Keeping only this toggle, removed the duplicate one */}
                <Tabs defaultValue="standard" className="w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="standard" className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Standard
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Advanced
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Features section with improved responsive grid */}
            <div className="features-section mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
                <Card className="bg-secondary/30 p-3 md:p-4 rounded-lg border border-border/50 flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <div className="p-2 md:p-3 rounded-full bg-primary/10 mb-2 md:mb-3">
                        <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm md:text-base">Rapid Generation</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Create images in seconds with our optimized models</p>
                </Card>

                <Card className="bg-secondary/30 p-3 md:p-4 rounded-lg border border-border/50 flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <div className="p-2 md:p-3 rounded-full bg-primary/10 mb-2 md:mb-3">
                        <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm md:text-base">AI-Enhanced Prompts</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Get better results with our intelligent prompt enhancement</p>
                </Card>

                <Card className="bg-secondary/30 p-3 md:p-4 rounded-lg border border-border/50 flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 transition-all duration-300 sm:col-span-2 md:col-span-1">
                    <div className="p-2 md:p-3 rounded-full bg-primary/10 mb-2 md:mb-3">
                        <Info className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm md:text-base">Advanced Options</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Fine-tune your generation with powerful controls</p>
                </Card>
            </div>

            {/* Main form with improved responsiveness */}
            <ImprovedGenerationForm />

            {/* Status indicator with fixed positioning */}
            <div className="fixed bottom-4 left-4 z-10">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI Models: Online
                </Button>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    )
}