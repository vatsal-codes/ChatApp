import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";
import {getReceiverSocketId, io} from "../SocketIO/server.js";


export const sendMessage = async (req, res) => {

    // console.log("Message Sent", req.params.id,req.body.message);
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage =new Message ({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage);
    } catch(error) {
        console.error("Error with sendMessage: ",error);
        res.status(500).json({error: "Internal Server Error"});

    }
};

export const getMessage = async (req, res) => {
    try{

        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");
        if (!conversation) {
            return res.status(201).json([]);
        }
        const messages= conversation.messages;
        res.status(201).json(messages);
    } catch (error) {
        console.error("Error with getMessage: ",error);
        res.status(500).json({error: "Internal Server Error"});
    }
}