import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { io, getRecieverSocketId } from "../socket/socket.js";

//sending message
export const sendMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const recieverId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({participants : {$all : [senderId,recieverId]}});
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants : [senderId,recieverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }
        //after modify i need to save
        await gotConversation.save();
        //Socket io
        const receiverSocketId = getRecieverSocketId(recieverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        res.status(500).json({message : "internal server", success : false})
    }
}

//get-Messsage-through-participant
export const getMessage = async(req,res)=>{
    try {
        const recieverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({participants : {$all : [senderId,recieverId]}}).populate("messages")
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        res.status(500).json({message : "internal server error",
            success : false
        })
    }
}