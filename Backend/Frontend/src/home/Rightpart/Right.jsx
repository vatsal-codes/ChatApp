import React, {useEffect} from 'react'
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Typesend from "./Typesend.jsx";
import useConversation from "../../zustand/useConversation.js";
import {useAuth} from "../../context/Authprovider.jsx";
import { AiOutlineMenuUnfold } from "react-icons/ai";


function Right() {
    const {selectedConversation,setSelectedConversation}=useConversation()
    useEffect(()=>{
        return setSelectedConversation(null,)
    },[setSelectedConversation])
    return (
        <div
            className=" w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] ">

            <div>
               {!selectedConversation?(<NoChatSelected/>):(<>

                       <Chatuser/>
                       <div className="overflow-y-auto flex-1" style={{maxHeight: "calc(92vh - 8vh )"}}>
                           <Messages/>
                       </div>

                       <Typesend/>

               </>)}
            </div>
        </div>

    )
}

export default Right;

const NoChatSelected=()=>{
    const [authUser]=useAuth()
    return(
        <>
            <div className="relative">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-ghost drawer-button lg:hidden absolute left-0.5"
                >
                    <AiOutlineMenuUnfold className="text-black text-3xl" />
                </label>
            <div className=" flex h-screen items-center justify-center">
            <h1 className="text-center">Hi <span className="font-semibold">{authUser.user.fullname},</span> <br/>
            Select a contact on your left to start a conversation
            </h1>
            </div>
            </div>
        </>
    )
}

