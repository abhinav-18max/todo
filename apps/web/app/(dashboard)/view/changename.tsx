"use client"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

const ChangeName=({project_id,set,refetch,named})=>{
    const API_URL= process.env.NEXT_PUBLIC_API_ROUTE;
    const name=useRef()



    const onSubmit = async () => {
        const data = {
            id: project_id,
            name: name.current?.value,

        };

        try{
            const res = await axios.post(`${API_URL}/projects/update`, data,{withCredentials: true});
            console.log(res)
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
            <h1 className="flex flex-row justify-center items-center font-bold text-xl">Update Name</h1>
            <Label>Name</Label>
            <Input className="bg-white border-0 rounded-xl shadow-xl mb-2.5" placeholder="Enter the todo name here..." ref={name} defaultValue={named}></Input>

            <div className="flex flex-row justify-evenly items-center mt-5 ">
                <Button variant={"outline"} className="rounded-xl" onClick={set}>Cancel</Button>
                <Button variant={"outline"} className="rounded-xl" onClick={onSubmit}>Update Name</Button>
            </div>

        </div>
        </>
    )
}

export default  ChangeName;