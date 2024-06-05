import React from 'react'
import User from "./User.jsx";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";

function Users() {
    const [allUsers,loading]=useGetAllUsers()
    console.log(allUsers);
    return (
        <div>
            <h1 className="px-8 py-2 font-semibold bg-slate-300 duration-300 rounded-md ">Messages
            </h1>
            <div className=" py-2 flex-1 overflow-y-auto" style={{maxHeight:"calc(84vh - 10vh)"}}>
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
                ))}


            </div>
        </div>
    )
}

export default Users
