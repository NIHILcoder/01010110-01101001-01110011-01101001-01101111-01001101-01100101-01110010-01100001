"use client";
import { EnhancedParticlesBackground } from "@/components/enhanced-particles-background"
import { Card } from "@/components/ui/card"
import { Zap, Lightbulb, Info } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { ImprovedGenerationForm } from "@/components/improved-generation-form"

export default function EnhancedHomePage() {
    const { t, language } = useLanguage();

    // Define translations for this page
    const pageTranslations = {
        'home.subtitle': {
            en: 'Transform your imagination into stunning visuals with our AI-powered creative platform',
            ru: 'Превратите ваше воображение в потрясающие визуальные образы с нашей креативной платформой на базе ИИ'
        },
        'home.feature.rapid.title': {
            en: 'Rapid Generation',
            ru: 'Быстрая генерация'
        },
        'home.feature.rapid.desc': {
            en: 'Create images in seconds with our optimized models',
            ru: 'Создавайте изображения за секунды с нашими оптимизированными моделями'
        },
        'home.feature.prompts.title': {
            en: 'AI-Enhanced Prompts',
            ru: 'ИИ-улучшенные промпты'
        },
        'home.feature.prompts.desc': {
            en: 'Get better results with our intelligent prompt enhancement',
            ru: 'Получайте лучшие результаты с нашим интеллектуальным улучшением промптов'
        },
        'home.feature.options.title': {
            en: 'Advanced Options',
            ru: 'Расширенные настройки'
        },
        'home.feature.options.desc': {
            en: 'Fine-tune your generation with powerful controls',
            ru: 'Тонко настраивайте генерацию с помощью мощных элементов управления'
        }
    };

    // Helper function to get translation for this page
    const getPageTranslation = (key: string) => {
        const currentLang = language;
        // @ts-ignore
        if (pageTranslations[key] && pageTranslations[key][currentLang]) {
            // @ts-ignore
            return pageTranslations[key][currentLang];
        }
        return key;
    };

    return (
        <div className="w-full h-full relative px-3 py-4">
            <EnhancedParticlesBackground variant="sparkles" density={40} />
            <div className="w-full mx-auto h-full flex flex-col max-w-6xl">
                <div className="mb-4">
                    <p className="text-center text-sm sm:text-base text-muted-foreground mx-auto">
                        {getPageTranslation('home.subtitle')}
                    </p>
                </div>

                <div className="features-section mb-4 grid grid-cols-3 gap-2">
                    <Card className="bg-secondary/30 p-2 border border-border/50 flex flex-col items-center text-center hover:shadow-sm hover:border-primary/20 transition-all">
                        <div className="p-1.5 rounded-full bg-primary/10 mb-1">
                            <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-medium text-xs">{getPageTranslation('home.feature.rapid.title')}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{getPageTranslation('home.feature.rapid.desc')}</p>
                    </Card>
                    <Card className="bg-secondary/30 p-2 border border-border/50 flex flex-col items-center text-center hover:shadow-sm hover:border-primary/20 transition-all">
                        <div className="p-1.5 rounded-full bg-primary/10 mb-1">
                            <Lightbulb className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-medium text-xs">{getPageTranslation('home.feature.prompts.title')}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{getPageTranslation('home.feature.prompts.desc')}</p>
                    </Card>
                    <Card className="bg-secondary/30 p-2 border border-border/50 flex flex-col items-center text-center hover:shadow-sm hover:border-primary/20 transition-all">
                        <div className="p-1.5 rounded-full bg-primary/10 mb-1">
                            <Info className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-medium text-xs">{getPageTranslation('home.feature.options.title')}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{getPageTranslation('home.feature.options.desc')}</p>
                    </Card>
                </div>

                <div className="flex-1 w-full">
                    <ImprovedGenerationForm />
                </div>
            </div>
        </div>
    )
}