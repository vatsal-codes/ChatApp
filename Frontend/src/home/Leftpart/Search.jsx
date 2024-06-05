import React, {useState} from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import UseConversation from "../../zustand/useConversation.js";
import toast from "react-hot-toast";

function Search() {
    const [search,setSearch]=useState("");
    const [allUsers]=useGetAllUsers();
    const {setSelectedConversation}=UseConversation()
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!search) return;
        const conversation=allUsers.find((user)=>user.fullname?.toLowerCase().includes(search.toLowerCase()));

        if (conversation){
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    }
    return (
        <div className="h-[10vh]">
            <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-3 bg-transparent">
                        <label
                            className=" border-[1px] border-slate-500 rounded-lg flex items-center gap-2 w-[80%] p-3 bg-transparent">
                            <input type="text"
                                   className="grow outline-none bg-transparent text-black"
                                   value={search}
                                   onChange={e=>setSearch(e.target.value)}
                                   placeholder="Search"/>

                        </label>
                        <button className><FaSearch
                            className="text-5xl p-2 hover:bg-gray-300 duration-400 rounded-b-full"/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search
