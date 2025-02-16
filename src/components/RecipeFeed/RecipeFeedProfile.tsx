/* eslint-disable @next/next/no-img-element */
"use client"

import { useAuth } from "@/context/AuthContext";

const RecipeFeedProfile = () => {

    const {user} = useAuth()
    console.log(user)

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center ">
                <img className="w-20 h-20 rounded-full" src={user?.image} alt="" />
                <h6 className="mt-3 text-lg font-cherrySwash font-bold text-gray-800">{user?.name}</h6>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default RecipeFeedProfile;