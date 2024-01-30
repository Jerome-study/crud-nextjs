import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await connectMongoDB()
    const {topicTitle, topicDescription } = await request.json();   
    await Topic.create({
        topicTitle,
        topicDescription
    });
    return NextResponse.json({ message: "The Topic is Created"}, { status: 201})
}

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics}, {status: 200})
}

export async function DELETE(request: NextRequest) {
    await connectMongoDB()
    const id = request.nextUrl.searchParams.get('id')
    const deleted = await Topic.findByIdAndDelete(id)
    if (!deleted) {
        return NextResponse.json({message: "Topic Not Exist"})
    } 
    return NextResponse.json({message: "Topic is Deleted"}, { status: 200});
}