import { Request, Response } from "express";
import { response } from "../utils";
import { validateChatRoom } from "../schemas";
import { db } from "../models";

export const joinRoom = async(req: Request, res: Response) => {
	try {
		const user = req.user;
		const { error, value } = validateChatRoom(req.body);
		if (error) {
			return response.errorMessage(res, 400, error.message);
		}
		await db.user.update({
			where: { name: user.name },
			data: { chatRoom: {
				update: { name: value.room }
			}}
		});
		return response.successMessage(res, 200, `Welcome to chatroom: ${value.room}`);
	} catch (error: unknown) {
		response.handleError(error, req);
		return response.errorMessage(res, 500, (error as Error).message);
	}
};

export const leaveRoom = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		await db.user.update({
			where: { name: user.name },
			data: { chatRoom: { disconnect: true } },
		});
		return response.successMessage(res, 200, "User left the chat room");
	} catch (error: unknown) {
		response.handleError(error, req);
		return response.errorMessage(res, 500, (error as Error).message);
	}
};