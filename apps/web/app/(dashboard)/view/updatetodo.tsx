"use client"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

const UpdateTodo=({project_id,set,refetch,task})=>{
    const API_URL= process.env.NEXT_PUBLIC_API_ROUTE;
    const name=useRef()
    const desc=useRef()

    const [todo, setTodo] = useState(task.status);


    const onSubmit = async () => {
        const data = {
            id: task.id,
            name: name.current?.value,
            description: desc.current?.value,
            status: todo,
            project_id: project_id,
        };
        console.log(project_id);
        try{
            const res = await axios.post(`${API_URL}/task/update`, data,{withCredentials: true});
            if (res.status === 201) {
                toast({
                    title: "Task created",
                    description: "Task created successfully",
                })
            }
            else {
                toast({
                    title: "Something went wrong",
                    description: "Please try again",
                })
            }
          await refetch();
            set()
        }
        catch (err) {
            toast({
                title: "Error",
                description: "some error occurred",
            })
        }


    }

    return(
        <>
        <div className="h-fit w-fit p-4 bg-white shadow-2xl rounded-2xl flex flex-col justify-center ">
            <h1 className="flex flex-row justify-center items-center font-bold text-xl">Update Todo</h1>
            <Label>Name</Label>
            <Input className="bg-white border-0 rounded-xl shadow-xl mb-2.5" placeholder="Enter the todo name here..." ref={name} defaultValue={task.name}></Input>
            <Label>Description</Label>
            <Textarea className="bg-white border-0 rounded-xl shadow-xl" placeholder="Enter the todo description here..." ref={desc} defaultValue={task.description}></Textarea>
            <div className="flex flex-row justify-evenly items-center mt-5">
                <Label>Status::</Label>
                {todo ? <Button variant={"ghost"} className="bg-black text-white rounded-xl" onClick={()=>setTodo(!todo)}>Completed</Button> : <Button variant={"ghost"} className="rounded-xl bg-black text-white" onClick={()=>setTodo(!todo)}>Pending</Button>}
            </div>
            <div className="flex flex-row justify-evenly items-center mt-5 ">
                <Button variant={"outline"} className="rounded-xl" onClick={set}>Cancel</Button>
                <Button variant={"outline"} className="rounded-xl" onClick={onSubmit}>Update</Button>
            </div>

        </div>
        </>
    )
}

export default  UpdateTodo;