"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import colors from "tailwindcss/colors";
import {login} from "@/app/api/_regUser";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {withRouter} from "next/router";
import {signIn} from "next-auth/react";
const API_URL = process.env.NEXT_PUBLIC_API_ROUTE

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Minimum password must be at least 2 characters.",
  })
})
export default function Auth(){
  const API_URL = process.env.NEXT_PUBLIC_API_ROUTE;
  const router = useRouter();
  const {toast} = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",

    },
  });

  const onSubmit = async (values:any) => {
    // alert(JSON.stringify(values))
    try{
      const res= await signIn('credentials', {
        email: values.username,
        password: values.password,
        redirect: false,
      })
      const res1=  await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
          email: values.username,
          password: values.password,
        })
      })
      // @ts-ignore
      if (res.ok && res1.status===201) {
        // console.log(res)
        router.push('/chat')
      }
      else{
        toast({
          title: "Invalid Credentials",
          description:"Please check your credentials",

        })
      }

    }
    catch(e){
      toast({
        title: "Invalid Credentials",
        description: "Please check your credentials",

      })
    }
  }

  return(
      <>
        <div className="h-screen flex flex-col justify-center items-center text-black">

          <Form {...form}  >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 bg-white h-1/2 flex flex-col justify-center items-center rounded-2xl">
              <h2 className="text-black text-5xl font-extrabold underline-offset-2">
                LOGIN
              </h2>
              <FormField
                  control={form.control}
                  name="username"

                  render={({ field }) => (
                      <FormItem className="text-black text-4xl w-1/2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username@gmail.com"  {...field} className="rounded-xl border-neutral-200"/>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"

                  render={({ field }) => (
                      <FormItem className="text-black text-4xl w-1/2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="1321243"  {...field} className="rounded-xl border-neutral-200"/>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                  )}
              />

              <Button type="submit" className="bg-black mt-6 hover:bg-black rounded-2xl w-1/4 text-white">Login</Button>
            </form>
          </Form>
        </div>



      </>
  )
}

