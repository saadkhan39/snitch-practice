import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

async function sendResponseToken(user, res, message) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token",token)

    res.status(200).json({
        message,
        success:true,
        user:{
            fullname:user.fullName,
            contact:user.contact,
            email:user.email,
            role:user.role,
        }
    })
}

export const register = async(req,res)=>{
    const {fullName,email,password,contact,isSeller} = req.body;

    try{
        const isUserAlreadyExist = await userModel.findOne({
             $or:[
                {email},
                {contact}
            ]
        }
        );

        if(isUserAlreadyExist){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email or contact number"
            })
        }

        const user = await userModel.create({
            fullName,
            email,
            password,
            contact,
            role:isSeller ? "seller" : "buyer"
        });


        await sendResponseToken(user, res, "User registered successfully");

       
    }catch(error){
          console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}