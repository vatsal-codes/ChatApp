import React from 'react'

function Message({message}) {
    const authUser=JSON.parse(localStorage.getItem("WhoseApp"))
    const itsMe=message.senderId === authUser.user._id;
    const chatName=itsMe? "chat-end":"chat-start";
    const chatColor= itsMe? "bg-blue-600":"bg-slate-600"

    const createdAt=new Date(message.createdAt)
    const formattedTime=createdAt.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit',
    })
    return (
        <div>
            <div className="px-2 py-2">
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColor}`}>{message.message}
                    </div>
                    <div className="chat-footer">{formattedTime}</div>
                </div>
            </div>
        </div>
    )
}

export default Message
