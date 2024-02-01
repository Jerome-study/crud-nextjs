"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DataProps } from "@/models/definitions";
import { useState } from "react";
import { NEXT_URL } from "@/urls/Urls";
import { useSession } from "next-auth/react";

export default function AddTopicForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<DataProps>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onSubmit: SubmitHandler<DataProps> = async (data) =>{
        setIsLoading(true);
        const res = await fetch(`${NEXT_URL}/api/topics`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            setIsLoading(false)
            router.push("/topic");
            router.refresh();
        } else {
            throw new Error("Failed to create a topic")
        }
    };
    return(
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} >
            <input className="border border-slate-500 px-8 py-2"  type="text" placeholder="Topic Title" {...register("topicTitle", { required: true})}/>
            {errors.topicTitle && <span>The Topic Title is Required!</span>}
            <input className="border border-slate-500 px-8 py-2"  type="text" placeholder="Topic Description" {...register("topicDescription", {required: true})}/>
            {errors.topicDescription && <span>The Topic Description is Required!</span>}
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit" disabled={isLoading}>Add Topic</button>
            {isLoading && <p>Topic is being added......</p>}
        </form>
    )
}