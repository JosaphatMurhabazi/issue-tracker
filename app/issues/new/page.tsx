'use client'
import React, {useState} from 'react'
import axios from "axios";
import {Button, Callout, TextField,Text} from "@radix-ui/themes"
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import {useForm,Controller} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchema";
import {z} from 'zod'


const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
);

type IssueForm= z.infer<typeof issueSchema>

const NewIssuePage = () => {
    const router =useRouter()
    const {register,control,handleSubmit,formState:{errors}} = useForm<IssueForm>({
        resolver:zodResolver(issueSchema)
    })
    const [error, setError] = useState<string>('');

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>)}
        <form className='space-y-3' onSubmit={handleSubmit(async(data)=>{
            try{
                await axios.post("/api/issues",data);
                router.push("/issues")
            }catch (error){
                setError('An unexpected error occurred.');
            }

        })}>
            <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
            {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
            <Controller control={control}  name='description' render={({field})=><SimpleMDE placeholder='Description' {...field} />} />
            {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}


            <Button>Submit New Issue</Button>
        </form></div>
    )
}
export default NewIssuePage
