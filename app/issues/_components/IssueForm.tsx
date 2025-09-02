'use client'
import React, {useState} from 'react'
import axios from "axios";
import {Button, Callout, TextField} from "@radix-ui/themes"
import "easymde/dist/easymde.min.css"
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchema";
import {z} from 'zod'
import {ErrorMessage, Spinner} from "@/app/components";
import {Issue} from "@/app/generated/prisma";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({issue}:{issue?:Issue}) => {
    const router =useRouter()
    const {register,control,handleSubmit,formState:{errors}} = useForm<IssueFormData>({
        resolver:zodResolver(issueSchema)
    })
    const [error, setError] = useState<string>('');
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = handleSubmit(async(data)=>{
        try{
            setSubmitting(true);
            if(issue)
                await axios.patch("/api/issues/"+issue.id,data)
            else
                await axios.post("/api/issues",data);
            router.push("/issues/list")
            router.refresh()
        }catch (_){
            setSubmitting(false);
            setError('An unexpected error occurred.');
        }
    })

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}></TextField.Root>
                {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <Controller defaultValue={issue?.description} control={control}  name='description' render={({field})=><SimpleMDE placeholder='Description' {...field} />} />
                {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

                <Button disabled={isSubmitting}>{issue ?'Update Issue':'Submit New Issue'} {isSubmitting && <Spinner/>}</Button>
            </form></div>
    )
}
export default IssueForm
