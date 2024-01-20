"use client"
import { FunctionComponent, useState } from "react"

import LoginFailed from "@/components/modules/login/login-failed"
import LoginForm from "@/components/modules/login/login-form"
import LoginSent from "@/components/modules/login/login-sent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const LoginPage: FunctionComponent = () => {
  const [error, setError] = useState<string>("")
  const [isSent, setIsSent] = useState<boolean>(false)

  return (
    <main className="h-full flex items-center justify-center">
      <Card className="w-[22rem] shadow-md">
        {!error && !isSent && (
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-6xl">
              🧙
            </CardTitle>
            <CardDescription className="text-xl">
              Login with magic link
            </CardDescription>
          </CardHeader>
        )}

        <CardContent className={cn(
          !error && !isSent ? "pt-0" : "pt-6",
        )}>
          {error && (
            <LoginFailed error={error}/>
          )}

          {isSent && (
            <LoginSent/>
          )}

          {!error && !isSent && (
            <LoginForm setError={setError} setSent={setIsSent}/>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginPage
