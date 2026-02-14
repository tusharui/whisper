import type { AuthRequest } from "../middleware/auth";
import type { NextFunction, Request,Response } from "express";
import {User} from"../models/User";
import { clerkClient,getAuth } from "@clerk/express";
export async function getMe(req:AuthRequest,res:Response,next :NextFunction){
    try{
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message:"user not found"});
            return;
        }
        res.status(200).json(user)
    } catch(error){
        res.status(500);
        next(error);
    }
}

export async function authCallback(req:Request, res:Response, next:NextFunction ){
    try {
        const {userId:clerkId}=getAuth(req);
        if(!clerkId){
            res.status(401).json({message:"unauthorized"});
            return;
        }



        let user = await User.findOne({clerkId})
        if(!user){
            const clerkUser = await clerkClient.users.getUser(clerkId)
        user = await User.create({
            clerkId,
            name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
            : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
        email: clerkUser.emailAddresses[0]?.emailAddress, 
        avatar: clerkUser.imageUrl
        })
        }
        res.json(user)
    } catch(error){
        res.status(500);
        next(error)
    }
}
