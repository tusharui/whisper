import express from "express";
import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from "./middleware/errorHandler";
import path from "path";
const app = express();

app.use(express.json())
app.use(clerkMiddleware())


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth",authRoutes)
app.use("/api/chats",chatRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)

app.use(errorHandler)

if(process.env.NODE_ENV === "production" ){
  app.use(express.static(path.join(__dirname,"../../web/dist")))

  app.get("/{*any}",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../../web/dist/index.html"))
  })
}

export default app;  
