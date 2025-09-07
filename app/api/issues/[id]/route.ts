import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {patchIssueSchema} from "@/app/validationSchema";
import {auth} from "@/auth";

export async function PATCH(request:NextRequest,{params}:{params:{id:string}}){
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "You are not authenticated." }, { status: 401 });
    }

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.issues,{status:400});

    const {assignedToUserId,title,description} = body;
    if(assignedToUserId) {
        const user  = await prisma.user.findUnique({where:{id: assignedToUserId}})
        if(!user)
            return NextResponse.json({status: 401, error: 'User not found'});
    }

    const issue = await prisma.issue.findUnique({where:{id:parseInt(params.id)}});

    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status:404});

    const updatedIssue =await prisma.issue.update({
        where:{id:issue.id},
        data:{
            title,
            description,
            assignedToUserId
        }
    });
    return NextResponse.json(updatedIssue);
}

export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "You are not authenticated." }, { status: 401 });
    }

    const issue = await prisma.issue.findUnique({where:{id:parseInt(params.id)}});
    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status:404});

    const deletedIssue = await prisma.issue.delete({where:{id:issue.id}});

    return NextResponse.json(deletedIssue);

}