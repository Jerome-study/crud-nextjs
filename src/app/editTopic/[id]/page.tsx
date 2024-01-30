import EditTopicForm from "@/components/EditTopicForm";
import { NEXT_URL } from "@/urls/Urls";
export default async function EditTopic({ params } : { params : { id: string } }) {
    const { id } = params;
    const res = await fetch(`${NEXT_URL}/api/topics/${id}`, {
        method: "GET",
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch")
    }
    const data = await res.json();
    const { topic } = data
    return (
        <EditTopicForm topic={topic} />
    )
}