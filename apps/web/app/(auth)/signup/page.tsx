"use client";

import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import axios from "axios";
import {reguser} from "@/app/api/_regUser";
import { redirect } from "next/navigation";
import {useRouter} from "next/navigation";
import { useToast} from "@/components/ui/use-toast";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_ROUTE

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }), email: z.string().email({
        message: "Please enter a valid email.",
    }), password: z.string().min(6, {
        message: "Minimum password must be at least 2 characters.",
    }), cpassword: z.string().min(6, {
        message: "Minimum password must be at least 2 characters.",
    })

}).refine((data) => data.password === data.cpassword, {
    message: "Password must match", path: ["cpassword"],

})
export default function Auth() {
    // console.log(API_URL);
    const router = useRouter();
    const {toast} = useToast();
    // @ts-ignore
    // @ts-ignore
    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: {
            username: "", password: "", cpassword: "", email: ""

        },
    });

    const onSubmit = async (values: any) => {
        try{
            const data = {
                name: values.username, email: values.email, password: values.password,
            }

            const res = await axios.post(`${API_URL}/user/register`, data);
            if(res.status===200){

                router.push("/signin")

            }
            else if(res.status===230){
             toast({
                    title: "User already exists",
                    description: "Please login",
             })
            }
            else{
                toast({
                    title: "Something went wrong",
                    description: "Please try again",
                })
            }
            // console.log(res);
        }
        catch (e) {
            console.log(e);
        }


    }
    return (<>
      <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="w-1/3 bg-white flex flex-col justify-center items-center rounded-2xl">
                    <h2 className="mt-6 text-black text-5xl font-extrabold underline-offset-2">
                        REGISTER
                    </h2>
                    <FormField
                        control={form.control}
                        name="username"

                        render={({field}) => (<FormItem className="text-black text-4xl w-1/2">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username"  {...field}
                                       className="rounded-xl border-neutral-200"/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>)}
                    />

                    <FormField
                        control={form.control}
                        name="email"

                        render={({field}) => (<FormItem className="text-black text-4xl w-1/2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="username@gmail.com"  {...field}
                                       className="rounded-xl border-neutral-200"/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>)}
                    />
                    <FormField
                        control={form.control}
                        name="password"

                        render={({field}) => (<FormItem className="text-black text-4xl w-1/2">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="1321243"  {...field} className="rounded-xl border-neutral-200"/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>)}
                    />
                    <FormField
                        control={form.control}
                        name="cpassword"

                        render={({field}) => (<FormItem className="text-black text-4xl w-1/2">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="1321243"  {...field} className="rounded-xl border-neutral-200"/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>)}
                    />

                    <Button type="submit" className="mb-6 bg-black mt-6 hover:bg-black rounded-2xl w-1/4 text-white">SignUp</Button>
                    <Link href="/signin">SignIn</Link>
                </form>
            </Form>

    </>)
}

