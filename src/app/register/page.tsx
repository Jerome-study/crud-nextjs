import Register from "@/components/RegisterForm"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOption"
export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) return redirect("/topic")
    return(
        <Register />
    )
}