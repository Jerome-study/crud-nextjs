

import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";
import { IdProps } from "@/models/definitions";



export async function PUT(request: NextRequest, { params }: {params : IdProps } ) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await connectMongoDB();
    const { id } = params;
    const { topicTitle, topicDescription} = await request.json();
    const updated = await Topic.findByIdAndUpdate(id, {topicTitle, topicDescription});
    if (!updated) return NextResponse.json({ message: "Nothing found "});
    return NextResponse.json({ message: "Updated"}, {status: 200});
}


export async function GET(request:NextRequest,  { params }: { params: { id: IdProps } } ) {
    await connectMongoDB();
    const { id } = params;
    const topic = await Topic.findById({ _id: id});
    if (!topic) return NextResponse.json({ message: "User not exist"})
    
    return NextResponse.json({ topic }, { status: 200});
   

}