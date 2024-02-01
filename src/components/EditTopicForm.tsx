"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TopicProps, DataProps } from "@/models/definitions";
import { useState } from "react";
import { NEXT_URL } from "@/urls/Urls";


export default function EditTopicForm({ topic }: { topic: TopicProps}) {
    console.log(NEXT_URL)
    const { _id, topicTitle, topicDescription } = topic;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<DataProps>({
        defaultValues: {
            topicTitle: topicTitle,
            topicDescription: topicDescription
        }
    });

    const onSubmit: SubmitHandler<DataProps> = async (data) =>{
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        const res = await fetch(`${NEXT_URL}/api/topics/${_id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if(res.ok) {
            setIsLoading(false)
            router.push("/topic")
            router.refresh();
        }
    };

    return(
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <input className="border border-slate-500 px-8 py-2"  type="text" {...register("topicTitle", { required: true})} placeholder="Topic Title"/>
            {errors.topicTitle && <span>The Topic Title is Required!</span>}
            <input className="border border-slate-500 px-8 py-2"  type="text" {...register("topicDescription", { required: true})} placeholder="Topic Description"/>
            {errors.topicDescription && <span>The Topic Description is Required!</span>}
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 w-fit">Update Topic</button>
            {isLoading && <p>Updating....</p>}
        </form>
    )
}