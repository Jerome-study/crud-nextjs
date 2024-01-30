import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { TopicProps } from "@/models/definitions";
import { NEXT_URL } from "@/urls/Urls";
interface Topic {
    topics?: TopicProps[]
}

export default async function  TopicsList() {
    const response = await fetch(`${NEXT_URL}/api/topics`)
    const data: Topic = await response.json()
    const { topics } = data

    if(!topics) return <h1>Topic is Empty</h1>

    return(
        <>
           { topics?.map(topic => {
                return (
                    <div key={topic._id} className="border border-slate-700 p-4 flex justify-between mb-4 items-start">
                        <div>
                            <h1 className="font-bold text-2xl">{topic.topicTitle}</h1>
                            <p>{topic.topicDescription}</p>
                        </div>
                        <div className="flex gap-2">
                            <RemoveBtn id={topic._id}  />
                            <Link href={`/editTopic/${topic._id}`}>
                                <HiPencilAlt size={24}/>
                            </Link>
                        </div>
                    </div>
                )
           })}
        </>
    )
}