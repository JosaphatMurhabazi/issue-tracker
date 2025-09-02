'use client';

import dynamic from 'next/dynamic';
import { Issue } from '@/app/generated/prisma';
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
);

interface Props {
    issue: Issue;
}

const EditIssueForm = ({ issue }: Props) => {
    return <IssueForm issue={issue} />;
};

export default EditIssueForm;