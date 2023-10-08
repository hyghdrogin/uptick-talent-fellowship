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

export const validateRegisterUser = (userName: string) => {
	const data = Joi.object({
		username: Joi.string().min(4).max(50).required(),
	});
	return data.validate(userName, options);
};