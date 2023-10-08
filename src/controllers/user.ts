import { Request, Response } from "express";
import { db } from "../models";
import { validateRegisterUser } from "../schemas";
import { response } from "../utils";

export const registerUser = async(req: Request, res: Response) => {
	try {
		const { error, value } = validateRegisterUser(req.body);
		if (error) {
			return response.errorMessage(res, 400, error.message);
		}
		const existingUser = await db.user.findUnique({
			where: { name: value.username}
		});
		if (existingUser) {
			return response.successMessage(res, 200, `Welcome back ${value.username}`);
		}
		const user = await db.user.create({
			data: { name: value.username}
		});
		res.cookie("username", user.name, { httpOnly: true });
		return response.successMessage(res, 201, "User Created");
	} catch (error: unknown) {
		response.handleError(error, req);
		return response.errorMessage(res, 500, (error as Error).message);
	}
};

export const getUser = async(req: Request, res: Response) => {
	try {
		const { userName } = req.params;
		const user = await db.user.findUnique({
			where: { name: userName}
		});
		if (!user) {
			return response.errorMessage(res, 404, "User does not exist");
		}
		return response.successMessage(res, 200, "User Fetched");
	} catch (error: unknown) {
		response.handleError(error, req);
		return response.errorMessage(res, 500, (error as Error).message);
	}
};