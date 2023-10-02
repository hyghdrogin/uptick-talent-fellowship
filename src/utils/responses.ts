import { Response } from "express";

export const errorResponse = (
	res: Response,
	statusCode: number,
	error: string,
) => {
	const responseObject = { statusCode, error };
	return res.status(statusCode).send(responseObject);
};

export const successResponse = (
	res: Response,
	statusCode: number,
	message: string,
	data: unknown = [],
) => {
	const responseObject = { statusCode, message, data };
	return res.status(statusCode).send(responseObject);
};