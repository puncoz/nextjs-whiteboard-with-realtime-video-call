"use server"

import { validateOrReject } from "class-validator"

import LoginFormSchema from "@/form-schemas/login-form-schema"
import { supabase } from "@/lib/initSupabase"

export const login = async (email: string, callBackUrl?: string) => {
  const formSchema = new LoginFormSchema()
  formSchema.email = email

  try {
    await validateOrReject(formSchema)
  } catch (e) {
    return { error: "Invalid email" }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callBackUrl,
    },
  })

  if (error) {
    return { error: "Error while sending email. Please try again." }
  }

  return { success: "Email sent" }
}
