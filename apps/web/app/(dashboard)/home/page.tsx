"use client"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {signOut, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import Link from "next/link";

export default  function  Home(){
    const API_URL = process.env.NEXT_PUBLIC_API_ROUTE
    const [loading,setLoading] =useState(false)
    const [ChangeLoading,setChangeLoading] =useState(false)
    const{data:session,status} =useSession()
    const queryClient= new QueryClient()
    const proj_name=useRef<HTMLInputElement|undefined>()
    const {isLoading,data,error,refetch}=useQuery({
        queryKey:["projects"],
        queryFn:async ()=>{
            const res = await fetch(`${API_URL}/projects/allprojects`,{credentials:'include'})
            return res.json();
        },
        staleTime:0
    })
    const click= useMutation({
        mutationFn: async ()=>{
            setLoading(true)
            const name = proj_name.current?.value;
            const res= await axios.post(`${API_URL}/projects/create`,{name},{withCredentials:true})

        },
        onSuccess: ()=>{
            setLoading(false);
            toast({
                title: "Project Created",
                description: "Project Created Successfully",
            })
            //queryClient.invalidateQueries({queryKey: ["projects"]})
            refetch()

        },
        onError: ()=>{
            setLoading(false);
            toast({
                title: "Some error occurred",
                description:"Please try again",

            })
        }
    })

    const logout=async () => {
        const res= await axios.get(`${API_URL}/auth/logout`,{withCredentials:true})
        await signOut();
        if(res.status===200){
            redirect('/auth/signin')
        }

    }
    if (status === "loading")
        return (
            <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">
                Loading ...{" "}
            </div>
        );
    if (status === "unauthenticated") redirect("/signin");
    if (loading)
        return (
            <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">
                Loading ...{" "}
            </div>
        );
    if (isLoading)
        return (
            <div className="flex flex-row justify-center items-center h-screen text-3xl font-extrabold">
                Loading ...{" "}
            </div>
        );
    // @ts-ignore
    return(<>
        <div>
            <div
                className="w-full h-9 text-black font-bold bg-white drop-shadow-2xl flex flex-row justify-end space-x-6 pr-4">
                <div>{session?.user}</div>
                <div onClick={()=>logout()}>Logout</div>
            </div>
        </div>
        <div className="h-screen flex flex-col justify-center items-center">
            {ChangeLoading
                && <div className="flex flex-row justify-center items-center text-xl font-extrabold">
                Loading ...{" "}
        </div>}
            <div className="flex flex-row justify-center items-center space-x-2.5">
                <Input className="rounded-xl bg-white shadow-xl border-0" ref={proj_name}></Input>
                <Button className="bg-black  hover:bg-black rounded-xl text-white" onClick={()=>click.mutateAsync()}>Create</Button>
            </div>
            <div className="flex flex-wrap">

                {data.map((item:any )=>{

                    return (
                        <div key={item.id} className="m-4 h-fit w-fit p-9 bg-white rounded-2xl shadow-2xl">
                            <div className=" h-full flex flex-col justify-center items-center">
                                <h1 className="text-black text-2xl font-extrabold underline-offset-2">
                                    {item.name}
                                </h1>
                                <h3 className="text-black text-xl font-bold underline-offset-1">
                                    {item.completed}/{item.total}
                                </h3>
                                <div>
                                    <Button
                                        className="bg-white mt-5 hover:bg-white border-2 border-gray-950 rounded-xl text-black" onClick={()=>setChangeLoading(true)}><Link href={{pathname:"/view",query:{id:item.id}}}>Edit</Link></Button>
                                </div>

                            </div>

                        </div>
                    )
                })}


            </div>
        </div>

    </>)
}