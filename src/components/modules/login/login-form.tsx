"use client"
import { classValidatorResolver } from "@hookform/resolvers/class-validator"
import { useSearchParams } from "next/navigation"
import { FunctionComponent, useCallback, useMemo, useTransition } from "react"
import { useForm } from "react-hook-form"

import { login } from "@/actions/login"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoginFormSchema from "@/form-schemas/login-form-schema"

interface Props {
  setError: (msg: string) => void
  setSent: (sent: boolean) => void
}

const LoginForm: FunctionComponent<Props> = ({ setError, setSent }) => {
  const searchParams = useSearchParams()
  const callBackUrl = useMemo(() => searchParams.get("callBackUrl") ?? undefined, [searchParams])

  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormSchema>({
    resolver: classValidatorResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const proceedLogin = useCallback((data: LoginFormSchema) => {
    startTransition(async () => {
      const res = await login(data.email, callBackUrl)

      if (res.error) {
        setError(res.error)
        return
      }

      setSent(true)
    })
  }, [callBackUrl, setError, setSent])

  return (
    <Form<LoginFormSchema> form={form} submitHandler={proceedLogin} className="space-y-4">
      <FormField control={form.control}
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormControl>
                       <Input {...field}
                              type="email"
                              disabled={isPending}
                              autoComplete="email"
                              placeholder="Enter your email..."
                              className="bg-slate-950 font-mono tracking-widest"/>
                     </FormControl>
                     <FormMessage/>
                   </FormItem>
                 )}/>

      <Button type="submit"
              variant="secondary"
              className="w-full"
              disabled={isPending}>
        {isPending ? "One moment please..." : "Send magic link"}
      </Button>
    </Form>
  )
}

export default LoginForm
