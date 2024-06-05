import React, {useState} from 'react'
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async()=>{
        setLoading(true)
        try {
            await axios.post("/api/user/logout")
            localStorage.removeItem("WhoseApp");
            Cookies.remove("jwt");
            setLoading(false)
            toast.success("Logout successful");
            window.location.reload();
        }catch(error){
            console.log("Error in logout " , error)
            toast.error("Error while logging out")
        }
    }
    return (
        <div className="h-[10vh] bg-transparent px-4">
                   <div>
                       <BiLogOut className="text-4xl hover:cursor-pointer rounded-l-2xl hover:bg-slate-300 duration-300 ml-2 mt-2"
                            onClick={handleLogout}
                       />
                   </div>
        </div>
    )
}

export default Logout
