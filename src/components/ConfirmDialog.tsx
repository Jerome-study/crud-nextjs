"use client"

import { useState } from "react"

interface dataFormProps{
    deleteTopic: ()=>void,
    setShowConfirm: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}


export default function ConfirmDialog({ deleteTopic , setShowConfirm  }: dataFormProps) {
    const [disable, setDisable] = useState(false);
    return(
        <>
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
    <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
            <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <i className="bx bx-error text-3xl">
                &#9888;
                </i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">Warning!</p>
                <p className="text-sm text-gray-700 mt-1">You will lose all of your data by deleting this. This action cannot be undone.
                </p>
                </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button disabled={disable} id="confirm-delete-btn" onClick={() => {deleteTopic(), setDisable(true)}} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                    Delete
                </button>
                <button disabled={disable} id="confirm-cancel-btn" onClick={() => setShowConfirm(false)} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                Cancel
                </button>
            </div>
        </div>
    </div>
</div>
        </>
    )
}