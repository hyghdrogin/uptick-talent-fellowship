import Joi from "joi";
import { CreateTaskInterface } from "../utils";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}
};

export const validateCreateTask = (createTask: CreateTaskInterface) => {
	const data = Joi.object<CreateTaskInterface>({
		title: Joi.string().min(4).max(50).required(),
		description: Joi.string().min(4).max(1000).required()
	});
	return data.validate(createTask, options);
};

export const validateUpdateTask = (updateTask: CreateTaskInterface) => {
	const data = Joi.object<CreateTaskInterface>({
		title: Joi.string().min(4).max(50),
		description: Joi.string().min(4).max(1000)
	});
	return data.validate(updateTask, options);
};