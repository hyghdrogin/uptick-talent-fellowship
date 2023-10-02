/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { validateCreateTask, validateUpdateTask } from "../schema";
import { response } from "../utils";
import { db } from "../model";

export const createTask = async(req: Request, res: Response) => {
	try {
		const { error, value } = validateCreateTask(req.body);
		if (error) {
			return response.errorResponse(res, 400, error.message);
		}
		const createdTask = await db.task.create({
			data: { title: value.title, description: value.description }
		});

		const { deleted, ...taskCreated } = createdTask;
		return response.successResponse(res, 201, "Task Created Successfully", { taskCreated });
	} catch (error) {
		console.error("Error creating task:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};

export const readTask = async(req: Request, res: Response) => {
	try {
		const taskId = parseInt(req.params.taskId, 10);
		if (isNaN(taskId) || taskId <= 0) {
			return response.errorResponse(res, 400, "Invalid Task ID format");
		}

		const task = await db.task.findFirst({
			where: { id: taskId, NOT: { deleted: true } }
		});
		if (!task) {
			return response.errorResponse(res, 404, "Tasks not found");
		}
		const { deleted, ...fetchedTask } = task;
		return response.successResponse(res, 200, "Task read successfully", { fetchedTask });
	} catch (error) {
		console.error("Error reading task:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};

export const readAllTasks = async(req: Request, res: Response) => {
	try {
		const tasks = await db.task.findMany({
			where: {
				NOT: { deleted: true }
			}
		});
		if (tasks.length === 0) {
			return response.errorResponse(res, 404, "No task available");
		}

		const tasksWithoutDeleted = tasks.map((task) => {
			const { deleted, ...taskWithoutDeleted } = task;
			return taskWithoutDeleted;
		});
		return response.successResponse(res, 200, "All tasks read successfully", { tasks: tasksWithoutDeleted });
	} catch (error) {
		console.error("Error reading all tasks:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};

export const updateTask = async(req: Request, res: Response) => {
	try {
		const taskId = parseInt(req.params.taskId, 10);
		if (isNaN(taskId) || taskId <= 0) {
			return response.errorResponse(res, 400, "Invalid Task ID format");
		}

		const { error } = validateUpdateTask(req.body);
		if (error) {
			return response.errorResponse(res, 400, error.message);
		}

		const existingTask = await db.task.findFirst({
			where: { id: taskId }
		});
		if (!existingTask) {
			return response.errorResponse(res, 404, "Task not found");
		}

		const updatedTask = await db.task.update({
			where: { id: taskId },
			data: { ...req.body }
		});
		const { deleted, ...taskUpdated } = updatedTask;
		return response.successResponse(res, 200, "Task updated successfully", { taskUpdated });
	} catch (error) {
		console.error("Error updating task:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};

export const deleteTask = async(req: Request, res: Response) => {
	try {
		const taskId = parseInt(req.params.taskId, 10);
		if (isNaN(taskId) || taskId <= 0) {
			return response.errorResponse(res, 400, "Invalid Task ID format");
		}

		const existingTask = await db.task.findFirst({
			where: { id: taskId, NOT: { deleted: true }}
		});
		if (!existingTask) {
			return res.status(404).json({
				status: false,
				message: "Task not found",
			});
		}

		await db.task.update({
			where: { id: taskId },
			data: { deleted: true }
		});
		return response.successResponse(res, 200, "Task deleted successfully");
	} catch (error) {
		console.error("Error deleting task:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};

export const deletedTask = async (req: Request, res: Response) => {
	try {
		const deletedTasks = await db.task.findMany({
			where: { NOT: { deleted: false }}
		});
		if (deletedTasks.length <= 0 || !deletedTasks) {
			return response.errorResponse(res, 404, "No task is deleted yet");
		}

		const tasksWithoutDeleted = deletedTasks.map((task) => {
			const { deleted, ...taskWithoutDeleted } = task;
			return taskWithoutDeleted;
		});
		return response.successResponse(res, 200, "Deleted tasks retrieved successfully", { deletedTasks: tasksWithoutDeleted });
	} catch (error) {
		console.error("Error reading deleted task:", error);
		return response.errorResponse(res, 500, "Internal Server Error");
	}
};