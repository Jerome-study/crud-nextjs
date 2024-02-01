"use client"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterProps } from "@/models/definitions";
import { NEXT_URL } from "@/urls/Urls";
import { useState } from "react";
import Toaster from "./Toaster";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterProps>();
    const [userExist, setUserExist] = useState(false);
    const onSubmit: SubmitHandler<RegisterProps> = async (data, e) => {
        e?.preventDefault();
        try {
            const response = await fetch(`${NEXT_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                setUserExist(true);
                return
            }
            setUserExist(false);
            router.push("/");
            console.log("Registered")

        } catch(error) {
            console.log(error)
        }
    }
    return(
    <div className="bg-slate-800 relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
    {userExist && <Toaster setUserExist={setUserExist}/>}
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
                <label
                htmlFor="first_name"
                className="block text-sm font-semibold text-gray-800"
                >
                First Name
                </label>
                <input
                    {...register("first_name", { required: "This field is Required"})}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-4">
                <label
                htmlFor="last_name"
                className="block text-sm font-semibold text-gray-800"
                >
                Last Name
                </label>
                <input
                    {...register("last_name", { required: true})}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>



            <div className="mb-4">
                <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
                >
                Username
                </label>
                <input
                {...register("username", { required: true})}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
                >
                Password
                </label>
                <input
                {...register("password", { required: true})}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mt-2">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Register
                </button>
            </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    )
}