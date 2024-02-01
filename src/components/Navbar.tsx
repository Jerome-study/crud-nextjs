"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession();
    console.log(session?.user)
    return(
        <div className="container mx-auto pt-4">
            <div className="flex justify-between items-center">
                <h1>Username: {session?.user.username}, First Name: {session?.user.first_name}</h1>
                <button onClick={() => signOut()}>Logout</button>
            </div>
            
            <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
                <Link className="text-white font-bold" href="/topic">CRUD PRACTICE</Link>
                <Link className="bg-white p-2" href="/topic/addTopic">Add Topic</Link> 
            </nav>
        </div>
    )
}