import type { AuthRequest } from "../middleware/auth";
import type { NextFunction, Request, Response } from "express";
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";

export async function getMessages
    (req: AuthRequest,
        res: Response,
        next: NextFunction) {
    try {
        const userId = req.userId;
        const { chatId } = req.params;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
        });

        if (!chat) {
            res.status(404).json({ message: "chat not found" });
            return;
        }
        const messages = await Message.find({ chat: chatId }).populate("sender",
            "name email avatar").sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500);
        next(error);
    }
}