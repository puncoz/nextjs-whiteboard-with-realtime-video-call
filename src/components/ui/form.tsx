"use client"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import type { ClassValue } from "clsx"
import React from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider, type SubmitErrorHandler, type SubmitHandler,
  useFormContext,
  type UseFormReturn,
} from "react-hook-form"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormProps<TFormValues extends FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
  submitHandler: SubmitHandler<TFormValues>
  errorHandler?: SubmitErrorHandler<TFormValues>
  form: UseFormReturn<TFormValues, object>
  children: React.ReactNode
}

const Form = <TFormValues extends FieldValues>({ form, children, submitHandler, errorHandler, ...props }: FormProps<TFormValues>) => {
  return (
    <FormProvider {...form}>
      <form {...props}
            onSubmit={e => {
              e.preventDefault()

              void form.handleSubmit(submitHandler, errorHandler)()
            }}>
        {children}
      </form>
    </FormProvider>
  )
}

// const Form = React.forwardRef<HTMLFormElement, FormProps>(
//   ({ form, children, ...props }) => {
//     return (
//       <FormProvider {...form}>
//         <form {...props}>
//           {children}
//         </form>
//       </FormProvider>
//     )
//   },
// )
// Form.displayName = "Form"

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
  }: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props}/>
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { className?: ClassValue }
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}/>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { className?: ClassValue }
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label ref={ref}
           className={cn(error && "text-destructive", className)}
           htmlFor={formItemId}
           {...props}/>
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot ref={ref}
          id={formItemId}
          aria-describedby={
            error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
          }
          aria-invalid={!!error}
          {...props}/>
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { className?: ClassValue }
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p ref={ref}
       id={formDescriptionId}
       className={cn("text-[0.8rem] text-muted-foreground", className)}
       {...props}/>
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { className?: ClassValue }
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref}
       id={formMessageId}
       className={cn("text-[0.8rem] font-medium text-destructive", className)}
       {...props}>
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
