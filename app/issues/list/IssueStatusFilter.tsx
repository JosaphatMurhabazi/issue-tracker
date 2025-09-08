'use client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import {Status} from "@/app/generated/prisma";

const statuses:{label:string,value?:Status}[] = [
    {label:'Open', value:'OPEN'},
    {label:'In Progress', value:'IN_PROGRESS'},
    {label:'Closed', value:'CLOSED'},
]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status'/>
            <Select.Content>
                <Select.Item value='all'>All</Select.Item>
                {statuses.map(status => (
                    <Select.Item key={status.value} value={status.value || 'all'}>{status.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
export default IssueStatusFilter
