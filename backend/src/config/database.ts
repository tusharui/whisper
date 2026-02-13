import mongoose from "mongoose";
export const connectDB =async ()=>{
    try{

        const mongoUri =process.env.MONGODB_URI;
        if(!mongoUri){
            throw new Error("MONGODB_URI environment varibale is not defined ")
        }
        await mongoose.connect(mongoUri);
        console.log("mongodb connected sucessfully ");
    } catch(error){
        console.log("❌ mongodb connection  error:",error);
        process.exit(1)
    }
};