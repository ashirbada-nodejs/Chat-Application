import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async(req,res)=>{
        try {
            const {fullName , username , password , confirmPassword , gender} =  req.body;
            if(!fullName || !username || !password || !confirmPassword || !gender){
                return res.status(400).json({
                    message : "all fields required"
                })
            }
            if(password !== confirmPassword){
                return res.staus(400).json({
                    message : "passwording didnot match"
                })
            }
            const user = await User.findOne({username});
            if(user){
                return res.status(400).json({message : "user is already exist try diffirent"})
            }
            const hashedPassword =await bcrypt.hash(password , 10);
            // avtar for profile pic
            const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            await User.create({
                fullName,
                username,
                password : hashedPassword,
                profilePhoto : gender=== "male" ? maleProfilePhoto : femaleProfilePhoto,
                gender
            })
            res.status(201).json({
                message : "user created successfuly",
                success : true
            })
        } catch (error) {
            res.status(500).json({
                message : "server error",
                error : error.message,
                success : false
            })
        }
}

//user login
export const login = async (req,res)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({ message : "message field are required"});
        }
        const user =await User.findOne({username});
        if(!user){
            return res.status(400).json({message : "user does not exist" , success : false})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message : "incorrect password" , success : false})
        }
        const tokendata = {
            userId : user._id
        }
        const token = jwt.sign(tokendata,process.env.JWT_SECRET_KEY ,{expiresIn:"1d"});
        res.status(200).cookie("token",token , {maxAge : 1*24*60*60*1000, httpOnly:true, sameSite:'strict'});
        res.status(200).json({
            message:"login successfully",
            _id : user._id,
            username : user.username,
            fullName : user.fullName,
            profilePhoto : user.profilePhoto
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            success : false
        })
    }
}

//logout user
export const logout = async(req,res) =>{
    try {
        res.status(200).cookie("token","",{maxAge : 0}).json({
            message : "user logged out successfully",
            success : true
        })
    } catch (error) {
        res.status(500).json({
            message : " internal server error"
        })
    }
}

//getOtheruser
export const getOtherUser = async(req,res)=>{
    try {
        const loggedInUserId = req.id;
        const otherUser = await User.find({_id : {$ne : loggedInUserId}}).select("-password");
        return res.status(200).json(otherUser);
    } catch (error) {
        res.status(500).json({message : "internal server error",success : false});
    }
}