import mongoose, { Schema, type Document, Types } from "mongoose";

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;   // reference to Chat
  sender: mongoose.Types.ObjectId; // reference to User
  text?: string;                   // message text
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message",MessageSchema) 
