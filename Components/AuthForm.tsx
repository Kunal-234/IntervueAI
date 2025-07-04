"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import Formfield from "./Formfield"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Form } from "./ui/form"


const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })

}

const AuthForm = ({ type }: { type: FormType }) => {

  const router = useRouter();
  const formSchema = AuthFormSchema(type)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        toast.success('Account created succesfully. Please sign in.')
        router.push('/sign-in')
      }
      else {
         toast.success('Sign in succesfully.')
         router.push('/')
      }

    } catch (error) {
      console.log(error);
      toast.error(`There was an error ${error}`)

    }

  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px] ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src='/logo.svg'
            alt="logo"
            height={32}
            width={38}
          />
          <h2 className="text-primary-100 ">IntervueAI</h2>
        </div>

        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form ">

            {!isSignIn && (

              <Formfield
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name" />
                )}

              <Formfield
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your Email"
                type="email"
                />

                <Formfield
                control={form.control}
                name="password"
                label="Password"
                placeholder="Your Password"
                type="password"/>
           

            <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an account'}</Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'No Account Yet? ' : 'Have an account already? '}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1" >
            {!isSignIn ? 'Sign in' : 'Sign up'}
          </Link>

        </p>
      </div>
    </div>
  )
}

export default AuthForm



