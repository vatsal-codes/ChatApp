import React from 'react'
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import Logout from "./Logout.jsx";

function Left() {
    return (
        <div className=" w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

            <Search/>
            <div className="flex-1 overflow-y-auto" style={{minHeight: "calc(84vh - 2vh)" }}>
                <Users/>
            </div>
            <Logout/>
        </div>
    )
}

export default Left
