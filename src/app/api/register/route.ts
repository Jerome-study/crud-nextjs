import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/register";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'

export async function POST(req:NextRequest) {
    try {
        await connectMongoDB();
        const { first_name, last_name, username, password } = await req.json();
        const found = await User.findOne({ username });
        
        if (found) {
            return NextResponse.json({ message: "hell"}, { status: 303})
        };
        const hashedPassword = await bcrypt.hash(password, 10) 
        await User.create({
            first_name,
            last_name,
            username,
            password: hashedPassword
        })

        return NextResponse.json({ message: "Registered"})
    } catch(error) {
        return NextResponse.json({ message: "Something went Wrong"})
    }
}