import express from "express";
import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"
import { clerkMiddleware } from '@clerk/express'
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

export default app;  
