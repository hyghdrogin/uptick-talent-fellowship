import { enumRooms } from "@prisma/client";
import Joi from "joi";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}
};

export const validateChatRoom = (room: string) => {
	const data = Joi.object({
		room: Joi.string().valid(...Object.values(enumRooms)).required(),
	});
	return data.validate(room, options);
};