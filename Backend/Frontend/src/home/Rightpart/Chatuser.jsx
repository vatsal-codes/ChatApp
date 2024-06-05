import React from 'react'
import useConversation from "../../zustand/useConversation.js";
import {useSocketContext} from "../../context/SocketContext.jsx";
import {AiOutlineMenuUnfold} from "react-icons/ai";

function Chatuser() {
    const { selectedConversation } = useConversation();
    const {onlineUsers}=useSocketContext()
    const getOnlineUsersStatus=(userId)=>{
        return onlineUsers.includes(userId)?"Online":"Offline"
    }



    console.log(selectedConversation);
    return (
        <div className="relative">
            <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden absolute left-0.5"
            >
                <AiOutlineMenuUnfold className="text-black text-3xl" />
            </label>
        <div className=" flex items-center space-x-3 h-[8vh] justify-center g-white border-b-2 rounded-md bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
            <div className="avatar">
                <div className="w-14 rounded-full">
                    <img src="https://www.svgrepo.com/show/526700/user-circle.svg" />
                </div>
            </div>
            <div>
                <h1 className="text-lg font-semibold text-black">{selectedConversation.fullname}</h1>
                <span className="text-sm text-black">{getOnlineUsersStatus(selectedConversation._id)}</span>
            </div>
        </div>
            </div>
    )
}

export default Chatuser
