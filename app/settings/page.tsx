"use client"

import React, { useState } from "react"
import { ParticlesBackground } from "@/components/particles-background"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Bell,
    Brush,
    Copy,
    CreditCard,
    Download,
    Globe,
    Key,
    Lock,
    LogOut,
    Plus,
    Save,
    Settings as SettingsIcon,
    Shield,
    Sparkles,
    User,
    Webhook,
    Layout,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { useLanguage, useLocalTranslation } from "@/components/language-context"

export default function SettingsPage() {
    const [editMode, setEditMode] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "User Name",
        email: "user@example.com",
        bio: "AI art enthusiast and digital creator passionate about exploring the intersection of technology and creativity."
    })

    const { t, language } = useLanguage();

    // Локальные переводы для страницы настроек
    const pageTranslations = {
        en: {
            'settings.title': 'Settings',
            'settings.description': 'Manage your account preferences and application settings',
            'settings.tab.account': 'Account',
            'settings.tab.appearance': 'Appearance',
            'settings.tab.notifications': 'Notifications',
            'settings.tab.subscription': 'Subscription',
            'settings.tab.privacy': 'Privacy',
            'settings.tab.api': 'API',
            'settings.profile.title': 'Profile Information',
            'settings.profile.description': 'Manage your account details and public profile',
            'settings.profile.display_name': 'Display Name',
            'settings.profile.username': 'Username',
            'settings.profile.email': 'Email',
            'settings.profile.bio': 'Bio',
            'settings.profile.edit': 'Edit Profile',
            'settings.profile.cancel': 'Cancel',
            'settings.profile.save': 'Save Changes',
            'settings.profile.change_avatar': 'Change Avatar',
            'settings.security.title': 'Account Security',
            'settings.security.description': 'Manage your password and security settings',
            'settings.security.current_password': 'Current Password',
            'settings.security.new_password': 'New Password',
            'settings.security.confirm_password': 'Confirm New Password',
            'settings.security.2fa': 'Two-Factor Authentication',
            'settings.security.2fa_app': 'Authenticator App',
            'settings.security.recommended': 'Recommended',
            'settings.security.2fa_description': 'Use an authenticator app to get two-factor authentication codes',
            'settings.security.enable': 'Enable',
            'settings.security.update': 'Update Security Settings',
            'settings.danger.title': 'Danger Zone',
            'settings.danger.description': 'Irreversible account actions',
            'settings.danger.delete_account': 'Delete Account',
            'settings.danger.delete_warning': 'Once you delete your account, there is no going back. This action cannot be undone.',
        },
        ru: {
            'settings.title': 'Настройки',
            'settings.description': 'Управление предпочтениями аккаунта и настройками приложения',
            'settings.tab.account': 'Аккаунт',
            'settings.tab.appearance': 'Внешний вид',
            'settings.tab.notifications': 'Уведомления',
            'settings.tab.subscription': 'Подписка',
            'settings.tab.privacy': 'Приватность',
            'settings.tab.api': 'API',
            'settings.profile.title': 'Информация профиля',
            'settings.profile.description': 'Управление данными вашего аккаунта и публичного профиля',
            'settings.profile.display_name': 'Отображаемое имя',
            'settings.profile.username': 'Имя пользователя',
            'settings.profile.email': 'Email',
            'settings.profile.bio': 'О себе',
            'settings.profile.edit': 'Редактировать профиль',
            'settings.profile.cancel': 'Отмена',
            'settings.profile.save': 'Сохранить изменения',
            'settings.profile.change_avatar': 'Изменить аватар',
            'settings.security.title': 'Безопасность аккаунта',
            'settings.security.description': 'Управление паролем и настройками безопасности',
            'settings.security.current_password': 'Текущий пароль',
            'settings.security.new_password': 'Новый пароль',
            'settings.security.confirm_password': 'Подтвердите новый пароль',
            'settings.security.2fa': 'Двухфакторная аутентификация',
            'settings.security.2fa_app': 'Приложение-аутентификатор',
            'settings.security.recommended': 'Рекомендуется',
            'settings.security.2fa_description': 'Используйте приложение-аутентификатор для получения кодов двухфакторной аутентификации',
            'settings.security.enable': 'Включить',
            'settings.security.update': 'Обновить настройки безопасности',
            'settings.danger.title': 'Опасная зона',
            'settings.danger.description': 'Необратимые действия с аккаунтом',
            'settings.danger.delete_account': 'Удалить аккаунт',
            'settings.danger.delete_warning': 'После удаления аккаунта пути назад нет. Это действие нельзя отменить.',
        }
    };

    // Функция локального перевода
    const { localT } = useLocalTranslation(pageTranslations);


    return (
        <div className="container relative mx-auto py-8">
            <ParticlesBackground />

            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold">{localT('settings.title')}</h1>
                <p className="text-muted-foreground">{localT('settings.description')}</p>
            </div>

            <Tabs defaultValue="account" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2">
                    <TabsTrigger value="account" className="flex gap-2 items-center">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.account')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex gap-2 items-center">
                        <Brush className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.appearance')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex gap-2 items-center">
                        <Bell className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.notifications')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="subscription" className="flex gap-2 items-center">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.subscription')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="flex gap-2 items-center">
                        <Shield className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.privacy')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="api" className="flex gap-2 items-center">
                        <Webhook className="h-4 w-4" />
                        <span className="hidden md:inline">{localT('settings.tab.api')}</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{localT('settings.profile.title')}</CardTitle>
                            <CardDescription>
                                {localT('settings.profile.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/placeholder.svg?height=96&width=96&text=UN" alt="User" />
                                        <AvatarFallback>UN</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm">{localT('settings.profile.change_avatar')}</Button>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{localT('settings.profile.display_name')}</Label>
                                            <Input
                                                id="name"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                                disabled={!editMode}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username">{localT('settings.profile.username')}</Label>
                                            <Input id="username" value="@username" disabled />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">{localT('settings.profile.email')}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            disabled={!editMode}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">{localT('settings.profile.bio')}</Label>
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                            disabled={!editMode}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
                                {editMode ? localT('settings.profile.cancel') : localT('settings.profile.edit')}
                            </Button>
                            {editMode && (
                                <Button>
                                    <Save className="mr-2 h-4 w-4" />
                                    {localT('settings.profile.save')}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{localT('settings.security.title')}</CardTitle>
                            <CardDescription>
                                {localT('settings.security.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">{localT('settings.security.current_password')}</Label>
                                <Input id="current-password" type="password" placeholder="••••••••" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">{localT('settings.security.new_password')}</Label>
                                    <Input id="new-password" type="password" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">{localT('settings.security.confirm_password')}</Label>
                                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-sm font-medium mb-3">{localT('settings.security.2fa')}</h3>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center">
                                            <h4 className="font-medium">{localT('settings.security.2fa_app')}</h4>
                                            <Badge variant="outline" className="ml-2">{localT('settings.security.recommended')}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {localT('settings.security.2fa_description')}
                                        </p>
                                    </div>
                                    <Button variant="outline">{localT('settings.security.enable')}</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <Lock className="mr-2 h-4 w-4" />
                                {localT('settings.security.update')}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-destructive">{localT('settings.danger.title')}</CardTitle>
                            <CardDescription>
                                {localT('settings.danger.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-destructive/30 p-4">
                                <h3 className="font-medium text-destructive mb-1">{localT('settings.danger.delete_account')}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {localT('settings.danger.delete_warning')}
                                </p>
                                <Button variant="destructive">{localT('settings.danger.delete_account')}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Preferences</CardTitle>
                            <CardDescription>
                                Customize how VisioMera looks and feels
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Color Theme</h3>
                                <RadioGroup defaultValue="system" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                        <Label
                                            htmlFor="light"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Sparkles className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Light</div>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                        <Label
                                            htmlFor="dark"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Sparkles className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Dark</div>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                        <Label
                                            htmlFor="system"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Sparkles className="mb-3 h-6 w-6" />
                                            <div className="font-medium">System</div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">UI Density</h3>
                                <RadioGroup defaultValue="comfortable" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <RadioGroupItem value="compact" id="compact" className="peer sr-only" />
                                        <Label
                                            htmlFor="compact"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Layout className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Compact</div>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="comfortable" id="comfortable" className="peer sr-only" />
                                        <Label
                                            htmlFor="comfortable"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Layout className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Comfortable</div>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="spacious" id="spacious" className="peer sr-only" />
                                        <Label
                                            htmlFor="spacious"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Layout className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Spacious</div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Effects & Animations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="particles" defaultChecked />
                                        <Label htmlFor="particles">Background particles</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="transitions" defaultChecked />
                                        <Label htmlFor="transitions">UI transitions</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="reduced-motion" />
                                        <Label htmlFor="reduced-motion">Reduced motion</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="haptic" />
                                        <Label htmlFor="haptic">Haptic feedback</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <Save className="mr-2 h-4 w-4" />
                                Save Preferences
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Interface Customization</CardTitle>
                            <CardDescription>
                                Configure your workspace layout
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Default View</h3>
                                <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="standard" id="standard-view" className="peer sr-only" />
                                        <Label
                                            htmlFor="standard-view"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Sparkles className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Standard Mode</div>
                                            <p className="text-sm text-muted-foreground text-center mt-2">
                                                Simplified interface with essential controls
                                            </p>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="advanced" id="advanced-view" className="peer sr-only" />
                                        <Label
                                            htmlFor="advanced-view"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <SettingsIcon className="mb-3 h-6 w-6" />
                                            <div className="font-medium">Advanced Mode</div>
                                            <p className="text-sm text-muted-foreground text-center mt-2">
                                                Full control with all parameters and options
                                            </p>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Gallery View Preferences</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="auto-grid" defaultChecked />
                                        <Label htmlFor="auto-grid">Default to grid view</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="image-info" defaultChecked />
                                        <Label htmlFor="image-info">Show image info on hover</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="auto-save" />
                                        <Label htmlFor="auto-save">Auto-save generations</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="show-prompt" defaultChecked />
                                        <Label htmlFor="show-prompt">Show prompts with images</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Configure how and when you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Email Notifications</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: "email-account", label: "Account updates and security alerts" },
                                        { id: "email-comments", label: "Comments on your creations" },
                                        { id: "email-likes", label: "Likes and reactions" },
                                        { id: "email-features", label: "New features and announcements" },
                                        { id: "email-tips", label: "Tips and tutorials" },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <Checkbox id={item.id} defaultChecked={item.id === "email-account"} />
                                            <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">In-App Notifications</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: "in-app-comments", label: "Comments on your creations", defaultChecked: true },
                                        { id: "in-app-likes", label: "Likes and reactions", defaultChecked: true },
                                        { id: "in-app-follows", label: "New followers", defaultChecked: true },
                                        { id: "in-app-mentions", label: "Mentions and tags", defaultChecked: true },
                                        { id: "in-app-competitions", label: "Competition updates", defaultChecked: true },
                                        { id: "in-app-generation", label: "Generation completions", defaultChecked: true },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <Switch id={item.id} defaultChecked={item.defaultChecked} />
                                            <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Notification Schedule</h3>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="quiet-from">Quiet hours start</Label>
                                            <Select defaultValue="22:00">
                                                <SelectTrigger id="quiet-from">
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: 24 }, (_, i) => (
                                                        <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                                            {`${i.toString().padStart(2, '0')}:00`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="quiet-to">Quiet hours end</Label>
                                            <Select defaultValue="07:00">
                                                <SelectTrigger id="quiet-to">
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from({ length: 24 }, (_, i) => (
                                                        <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                                            {`${i.toString().padStart(2, '0')}:00`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-2">
                                        <Switch id="weekend-pause" />
                                        <Label htmlFor="weekend-pause">Pause all notifications on weekends</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <Save className="mr-2 h-4 w-4" />
                                Save Notification Settings
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Subscription Settings */}
                <TabsContent value="subscription" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>
                                Manage your subscription and billing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-6 text-center space-y-4">
                                <Badge variant="secondary" className="px-3 py-1 text-base">Pro Plan</Badge>
                                <h2 className="text-3xl font-bold">$12.99 <span className="text-muted-foreground text-base font-normal">/month</span></h2>
                                <p className="text-muted-foreground">Your next billing date is April 15, 2025</p>
                                <Button variant="outline" className="mt-2">
                                    Manage Subscription
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Generation Credits</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>Monthly Limit</span>
                                        <span className="font-medium">1000 credits</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Credits Used</span>
                                        <span className="font-medium">750 credits</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Credits Remaining</span>
                                        <span className="font-medium">250 credits</span>
                                    </div>
                                    <Progress value={75} className="h-2 mt-1" />
                                    <div className="flex justify-end mt-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        Buy Additional Credits
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Purchase more credits when you reach your limit</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Plan Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                                    {[
                                        "1000 generation credits per month",
                                        "Access to all models",
                                        "Maximum resolution: 2048×2048",
                                        "Priority generation queue",
                                        "Advanced parameters",
                                        "Commercial license",
                                        "API access",
                                        "ControlNet support",
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-3 w-3 text-primary-foreground"
                                                >
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">View Billing History</Button>
                            <Button variant="default">Upgrade Plan</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Available Plans</CardTitle>
                            <CardDescription>
                                Compare plans and find the right fit for your needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                                <div className="flex w-max space-x-4 p-4">
                                    {[
                                        {
                                            name: "Free",
                                            price: "$0",
                                            popular: false,
                                            features: [
                                                "100 generation credits per month",
                                                "Access to basic models",
                                                "Maximum resolution: 512×512",
                                                "Standard generation queue",
                                                "Basic parameters",
                                                "Personal use only",
                                            ],
                                        },
                                        {
                                            name: "Pro",
                                            price: "$12.99",
                                            popular: true,
                                            features: [
                                                "1000 generation credits per month",
                                                "Access to all models",
                                                "Maximum resolution: 2048×2048",
                                                "Priority generation queue",
                                                "Advanced parameters",
                                                "Commercial license",
                                                "API access",
                                                "ControlNet support",
                                            ],
                                        },
                                        {
                                            name: "Business",
                                            price: "$49.99",
                                            popular: false,
                                            features: [
                                                "5000 generation credits per month",
                                                "Access to all models",
                                                "Maximum resolution: 4096×4096",
                                                "Highest priority queue",
                                                "All parameters",
                                                "Extended commercial license",
                                                "Full API access",
                                                "ControlNet support",
                                                "Dedicated support",
                                                "Team collaboration features",
                                                "Custom model fine-tuning",
                                            ],
                                        },
                                    ].map((plan) => (
                                        <div
                                            key={plan.name}
                                            className="min-w-[280px] flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm relative"
                                        >
                                            {plan.popular && (
                                                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                                    Most Popular
                                                </div>
                                            )}
                                            <div className="p-6 space-y-4">
                                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                                <p className="text-3xl font-bold">
                                                    {plan.price} <span className="text-muted-foreground text-base font-normal">/month</span>
                                                </p>
                                                <div className="space-y-2">
                                                    {plan.features.map((feature, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="h-3 w-3 text-primary"
                                                                >
                                                                    <path d="M20 6L9 17l-5-5" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-6 pt-0 mt-auto">
                                                <Button
                                                    variant={plan.popular ? "default" : "outline"}
                                                    className="w-full"
                                                >
                                                    {plan.name === "Pro" ? "Current Plan" : `Upgrade to ${plan.name}`}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy Settings */}
                <TabsContent value="privacy" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>
                                Control how your data is used and shared
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Profile Privacy</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: "public-profile", label: "Make profile public", description: "Allow anyone to view your profile and creations" },
                                        { id: "searchable", label: "Searchable profile", description: "Allow your profile to appear in search results" },
                                        { id: "share-activity", label: "Share activity", description: "Show your activity (likes, comments) to followers" },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-start space-x-2">
                                            <div className="pt-0.5">
                                                <Switch id={item.id} defaultChecked />
                                            </div>
                                            <div>
                                                <Label htmlFor={item.id}>{item.label}</Label>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Content Sharing</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: "auto-public", label: "Automatically make my creations public", description: "New generations will be visible to the community" },
                                        { id: "show-prompts", label: "Share my prompts with the community", description: "Allow others to view the prompts used for your public creations" },
                                        { id: "allow-remix", label: "Allow others to remix my work", description: "Let community members use your images as reference for their creations" },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-start space-x-2">
                                            <div className="pt-0.5">
                                                <Switch id={item.id} defaultChecked={item.id === "show-prompts"} />
                                            </div>
                                            <div>
                                                <Label htmlFor={item.id}>{item.label}</Label>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Data Privacy</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: "anon-analytics", label: "Allow anonymous analytics", description: "Help us improve by sharing anonymous usage data" },
                                        { id: "model-training", label: "Allow model training contribution", description: "Your creations may be used to improve AI models" },
                                        { id: "personalization", label: "Personalized experience", description: "Use your activity to customize your experience" },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-start space-x-2">
                                            <div className="pt-0.5">
                                                <Switch id={item.id} defaultChecked={item.id === "anon-analytics"} />
                                            </div>
                                            <div>
                                                <Label htmlFor={item.id}>{item.label}</Label>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <Save className="mr-2 h-4 w-4" />
                                Save Privacy Settings
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>
                                Export or delete your data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium mb-2">Data Export</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Download a copy of your data, including your profile information,
                                    creations, and account activity.
                                </p>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Request Data Export
                                </Button>
                            </div>

                            <div className="rounded-lg border border-destructive/30 p-4">
                                <h3 className="font-medium text-destructive mb-2">Data Removal</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    If you'd like us to delete specific content or data types instead of your
                                    entire account, you can request targeted data removal.
                                </p>
                                <Button variant="destructive">Request Data Removal</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* API Settings */}
                <TabsContent value="api" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Access</CardTitle>
                            <CardDescription>
                                Manage your API keys and usage for programmatic access
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Your API Keys</h3>
                                <div className="rounded-lg border p-4 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium">Production Key</h4>
                                                <p className="text-xs text-muted-foreground">Created: Mar 15, 2025</p>
                                            </div>
                                            <Badge variant="outline">Active</Badge>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="password"
                                                value="••••••••••••••••••••••••••••••"
                                                readOnly
                                                className="font-mono"
                                            />
                                            <Button variant="outline" size="icon">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium">Development Key</h4>
                                                <p className="text-xs text-muted-foreground">Created: Mar 10, 2025</p>
                                            </div>
                                            <Badge variant="outline">Active</Badge>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="password"
                                                value="••••••••••••••••••••••••••••••"
                                                readOnly
                                                className="font-mono"
                                            />
                                            <Button variant="outline" size="icon">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Button className="w-full">
                                        <Key className="mr-2 h-4 w-4" />
                                        Generate New API Key
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-medium">API Usage</h3>
                                    <Button variant="outline" size="sm">View Documentation</Button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Monthly Limit</span>
                                        <span className="font-medium">10,000 requests</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Used This Month</span>
                                        <span className="font-medium">3,254 requests</span>
                                    </div>
                                    <Progress value={32.54} className="h-2" />
                                    <p className="text-xs text-muted-foreground">
                                        Your API usage resets on the 1st of each month. Current billing cycle: Mar 1 - Mar 31, 2025
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Allowed Domains</h3>
                                <p className="text-sm text-muted-foreground">
                                    Restrict your API keys to specific domains for enhanced security
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Input placeholder="Enter domain (e.g., example.com)" />
                                        <Button variant="outline">Add</Button>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-sm">yourwebsite.com</span>
                                            <Button variant="ghost" size="icon">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-sm">app.yourwebsite.com</span>
                                            <Button variant="ghost" size="icon">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-sm">localhost</span>
                                            <Button variant="ghost" size="icon">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-2">
                                <Switch id="api-enabled" defaultChecked />
                                <Label htmlFor="api-enabled">API Access Enabled</Label>
                            </div>
                            <Button>Save API Settings</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Webhooks</CardTitle>
                            <CardDescription>
                                Configure webhook endpoints to receive real-time events
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Webhook Endpoints</h3>
                                <Button variant="outline" size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Endpoint
                                </Button>
                            </div>
                            <div className="rounded-lg border">
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">Generation Completed</h4>
                                        <Badge variant="outline">Active</Badge>
                                    </div>
                                    <p className="font-mono text-sm text-muted-foreground">https://example.com/webhooks/generations</p>
                                    <div className="flex items-center space-x-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Receives events when image generations complete</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="p-4">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="outline" size="sm">Test</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="fixed bottom-4 right-4 z-10">
                <Button variant="secondary" size="sm" className="text-xs flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}