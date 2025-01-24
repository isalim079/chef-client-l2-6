"use client"

import { useAuth } from "@/context/AuthContext";



const UserProfileInfo = () => {

    const {user} = useAuth()
    console.log(user);

    return (
        <div>
            UserProfileInfo Component
        </div>
    );
};

export default UserProfileInfo;