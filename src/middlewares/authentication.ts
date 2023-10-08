import { Request, Response, NextFunction } from "express";
import { response } from "../utils";
import { db } from "../models";


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cookie = req.headers.cookie;
		console.log("cookie", cookie);
		if (!cookie) {
			return response.errorMessage(res, 401, "User not Logged in");
		}
		const name = cookie.split("=")[1];
		const user = await db.user.findUnique({
			where: { name }
		});
		if (!user) {
			return response.errorMessage(res, 401, "User not found");
		}
		req.user = user;
		next();
	} catch (error: unknown) {
		response.handleError(error, req);
		return response.errorMessage(res, 500, (error as Error).message);
	}
};