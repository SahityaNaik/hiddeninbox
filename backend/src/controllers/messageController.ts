import { Request, Response } from "express";
import Message from "../models/Message";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

// sendMessage function
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { text } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const message = await Message.create({
      text,
      toUser: user._id,
    });

    return res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send message" });
  }
};

// getMyMessages function
export const getMyMessages = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await Message.find({ toUser: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// getStats function
export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const messages = await Message.find({ toUser: userId }).sort({
      createdAt: 1,
    });

    const total = messages.length;

    const last7Days = messages.filter(
      (m) =>
        new Date(m.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length;

    const firstMessageDate = total > 0 ? messages[0].createdAt : null;
    const latestMessageDate =
      total > 0 ? messages[messages.length - 1].createdAt : null;

    return res.status(200).json({
      total,
      last7Days,
      firstMessageDate,
      latestMessageDate,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// deleteMessage function
export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Message.deleteOne({ _id: id, toUser: req.userId });
    return res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete message" });
  }
};
