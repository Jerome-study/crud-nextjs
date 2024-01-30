"use client"
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi"
import { useState } from "react";
import { NEXT_URL } from "@/urls/Urls";
import ConfirmDialog from "./ConfirmDialog";
export default function RemoveBtn( { id }: {id: string}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();
    const deleteTopic = async () => {
        const response = await fetch(`${NEXT_URL}/api/topics?id=${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            router.refresh();
        } else {
            throw new Error("Something went Wrong")
        }
    }
    return( 
        <>
            <button className="text-red-400" onClick={() => setShowConfirm(true)}>
                <HiOutlineTrash size={24}/>
            </button>
            {showConfirm && <ConfirmDialog  deleteTopic={deleteTopic} setShowConfirm={setShowConfirm} />}
        </>

    )
}