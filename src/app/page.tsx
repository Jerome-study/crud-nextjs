import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/utils/authOption"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/topic")
  return (
    <LoginForm />
  );
}