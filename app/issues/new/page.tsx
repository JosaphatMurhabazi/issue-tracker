'use client'
import React from 'react'
import axios from "axios";
import {Button, TextField} from "@radix-ui/themes"
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import {useForm,Controller} from "react-hook-form";
import {useRouter} from "next/navigation";

const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
);

interface IssueForm{
    title:string;
    description:string;
}

const NewIssuePage = () => {
    const router =useRouter()
    const {register,control,handleSubmit} = useForm<IssueForm>()

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async(data)=>{
            await axios.post("/api/issues",data);
            router.push("/issues")
        })}>
            <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
            <Controller control={control}  name='description' render={({field})=><SimpleMDE placeholder='Description' {...field} />} />

            <Button>Submit New Issue</Button>
        </form>
    )
}
export default NewIssuePage
