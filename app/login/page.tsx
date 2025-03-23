"use client";

import Link from "next/link"
import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail } from "lucide-react"
import { useLanguage, useLocalTranslation } from "@/components/language-context"

export default function LoginPage() {
  // Define page-specific translations
  const pageTranslations = {
    en: {
      'login.title': 'Sign in to VisioMera',
      'login.description': 'Enter your email and password to access your account',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.forgot_password': 'Forgot password?',
      'login.sign_in': 'Sign In',
      'login.register': 'Register',
      'login.name': 'Name',
      'login.confirm_password': 'Confirm Password',
      'login.create_account': 'Create Account',
      'login.or_continue_with': 'Or continue with',
      'login.terms_agreement': 'By signing in, you agree to our',
      'login.terms_of_service': 'Terms of Service',
      'login.and': 'and',
      'login.privacy_policy': 'Privacy Policy',
    },
    ru: {
      'login.title': 'Вход в VisioMera',
      'login.description': 'Введите ваш email и пароль для доступа к аккаунту',
      'login.email': 'Email',
      'login.password': 'Пароль',
      'login.forgot_password': 'Забыли пароль?',
      'login.sign_in': 'Войти',
      'login.register': 'Регистрация',
      'login.name': 'Имя',
      'login.confirm_password': 'Подтвердите пароль',
      'login.create_account': 'Создать аккаунт',
      'login.or_continue_with': 'Или продолжить с помощью',
      'login.terms_agreement': 'Входя в систему, вы соглашаетесь с нашими',
      'login.terms_of_service': 'Условиями использования',
      'login.and': 'и',
      'login.privacy_policy': 'Политикой конфиденциальности',
    }
  };

  // Use the local translation hook
  const { localT } = useLocalTranslation(pageTranslations);

  return (
      <div className="container relative flex h-screen items-center justify-center">
        <ParticlesBackground />

        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">{localT('login.title')}</CardTitle>
              <CardDescription>{localT('login.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">{localT('login.email')}</TabsTrigger>
                  <TabsTrigger value="register">{localT('login.register')}</TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="mt-4">
                  <form>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{localT('login.email')}</Label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">{localT('login.password')}</Label>
                          <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                            {localT('login.forgot_password')}
                          </Link>
                        </div>
                        <Input id="password" type="password" />
                      </div>
                      <Button type="submit" className="w-full">
                        {localT('login.sign_in')}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-4">
                  <form>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">{localT('login.name')}</Label>
                        <Input id="register-name" placeholder={localT('login.name')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">{localT('login.email')}</Label>
                        <Input id="register-email" type="email" placeholder="name@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">{localT('login.password')}</Label>
                        <Input id="register-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm">{localT('login.confirm_password')}</Label>
                        <Input id="register-confirm" type="password" />
                      </div>
                      <Button type="submit" className="w-full">
                        {localT('login.create_account')}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{localT('login.or_continue_with')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-xs text-muted-foreground">
                {localT('login.terms_agreement')}{" "}
                <Link href="#" className="underline">
                  {localT('login.terms_of_service')}
                </Link>{" "}
                {localT('login.and')}{" "}
                <Link href="#" className="underline">
                  {localT('login.privacy_policy')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}