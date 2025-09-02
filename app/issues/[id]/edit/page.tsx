import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import EditIssueForm from "@/app/issues/[id]/edit/EditIssueForm";

interface Props{
    params:{id:string}
}

const EditIssuePage = async({params}:Props) => {
    const issue =await prisma.issue.findUnique({where:{id: parseInt(params.id)}})

    if(!issue)
        notFound()

    return (
        <EditIssueForm issue={issue}/>
    )
}
export default EditIssuePage
