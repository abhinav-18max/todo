"use client"
import Todo from "@/app/(dashboard)/view/todo";
import {redirect, useSearchParams} from "next/navigation";
import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {QueryClient, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Button} from "@/components/ui/button";
import UpdateTodo from "@/app/(dashboard)/view/updatetodo";
import {toast} from "@/components/ui/use-toast";
import Changename from "@/app/(dashboard)/view/changename";
import ChangeName from "@/app/(dashboard)/view/changename";
import Download from "@/app/(dashboard)/view/download";


export default function View(){
    const searchParams = useSearchParams()
    const project_id= searchParams.get('id');
    const API_URL = process.env.NEXT_PUBLIC_API_ROUTE
    const [loading,setLoading] =useState(false)
    const{data:session,status} =useSession()
    const queryClient= new QueryClient()
    const [add,setAdd]=useState(false)
    const [update,setUpdate]=useState(false)
    const [nameChange,setNameChange]=useState(false)
    const [task_,setTask]=useState({})

    const onUpdate= async()=>{
        setUpdate(!update)
    }
    const onAdd= async()=>{
        setAdd(!add)
    }
    const onNameChange= async()=>{
        setNameChange(!nameChange)
    }
    const onDownload= async()=>{
            const data = {
                id: project_id,
                path: '.',

            };

            try{
                const res = await axios.post(`${API_URL}/projects/download`, data,{withCredentials: true});
                console.log(res)
                if (res.status === 201) {
                    toast({
                        title: "File Downloaded",
                        description: "File Downloaded successfully",
                    })
                }
                else {
                    toast({
                        title: "Something went wrong",
                        description: "Please try again",
                    })
                }

            }
            catch (err) {
                toast({
                    title: "Error",
                    description: "some error occurred",
                })
            }
    }

    const logout=async () => {
        const res= await axios.get(`${API_URL}/auth/logout`,{withCredentials:true})
        await signOut();
        if(res.status===200){
            redirect('/auth/signin')
        }

    }
    const {isLoading,data,error,refetch}=useQuery({
        queryKey:["todos"],
        queryFn: async ()=>{
            const res= await axios.get(`${API_URL}/projects/projects?id=${project_id}`,{withCredentials:true})
            return res.data;
        },
        staleTime:0
    })
    const re = async ()=>{
        refetch()
    }
    const onDelete=async(t_id:number)=>{
        try{
            const res=  await axios.get(`${API_URL}/task/delete?task_id=${t_id}&project_id=${project_id}`,{withCredentials: true});
            if (res.status === 200) {
                toast({
                    title: "Task deleted",
                    description: "Task deleted successfully",
                })
                refetch();
            }
            else {
                toast({
                    title: "Something went wrong",
                    description: "Please try again",
                })
            }
            await queryClient.invalidateQueries("todos")

        }
        catch (error){
            console.log(error)
            toast({
                title: "Error",
                description: "some error occurred",
            })
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
    return(<>
        <div>
            <div
                className="w-full h-9 text-black font-bold bg-white drop-shadow-2xl flex flex-row justify-end space-x-6 pr-4">
                <div>{session?.user}</div>
                <div onClick={() => logout()}>Logout</div>
            </div>
        </div>
        <div className="h-screen flex flex-col  items-center">
            <div className="flex flex-row justify-center items-baseline">
                <h1 className="text-black font-extrabold text-5xl">{data.name}</h1>
                <div onClick={()=>onNameChange()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                    </svg>
                </div>

            </div>
            <div className="flex flex-row justify-evenly">
                <Button variant={'outline'} className="mt-5 rounded-xl" onClick={()=>onAdd()}>
                    New Todo
                </Button>
                <Button variant={'outline'} className="mt-5 rounded-xl" onClick={()=>onDownload()}>
                    Download
                </Button>
            </div>

            {add ? <Todo project_id={project_id} set={onAdd} refetch={re}/> : null}
            {update ? <UpdateTodo project_id={project_id} set={onUpdate} refetch={re} task={task_}/> : null}
            {nameChange ? <ChangeName project_id={project_id} set={onNameChange} refetch={re} named={data.name}/>:null}


            <div className="h-full flex flex-col items-center justify-center">
                <div className="flex flex-row justify-center items-center space-x-2.5">
                    <div className="flex flex-col justify-start items-center shadow-2xl border-2 p-4 w-1/2 rounded-2xl">
                        <h2 className="text-black font-bold text-2xl mb-2.5">PENDING</h2>
                        {data.task.map(task =>{
                            if (task.status === false)
                            return (
                                <div key={task.id}
                                    className="flex flex-col justify-center items-center p-3.5 bg-white rounded-xl shadow-xl mt-5">
                                    <h3 className="font-bold text-xl">{task.name}</h3>
                                    <p>{task.description} </p>
                                    <div className="flex flex-row justify-center items-center space-x-1">
                                        <p className="font-bold">Created:</p><p>{task.created_at}</p>
                                        <p className="font-bold">Updated:</p><p>{task.updated_at}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-evenly items-center">

                                        <div onClick={()=> {
                                            setTask(task),onUpdate()
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                            </svg>
                                        </div>
                                        <div onClick={()=>onDelete(task.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div
                        className="flex flex-col justify-start items-center shadow-2xl border-2 p-4 w-1/2 rounded-2xl">
                        <h2 className="text-black font-bold text-2xl">COMPLETED</h2>
                        {data.task.map(task =>{
                            if (task.status === true)
                            return (
                                <div key={task.id}
                                     className="flex flex-col justify-center items-center p-3.5 bg-white rounded-xl shadow-xl mt-5">
                                    <h3 className="font-bold text-xl">{task.name}</h3>
                                    <p>{task.description} </p>
                                    <div className="flex flex-row justify-center items-center space-x-1">
                                        <p className="font-bold">Created:</p><p>{task.created_at}</p>
                                        <p className="font-bold">Updated:</p><p>{task.updated_at}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-evenly items-center">

                                        <div onClick={()=> {
                                            setTask(task),onUpdate()
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                            </svg>
                                        </div>
                                        <div onClick={()=>onDelete(task.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>


        </div>
    </>)
}