import TaskData from "../database/taskDataLogic.js";
import { TaskError } from "../utils/responses.js";

const { readDataFile, writeDataFile } = TaskData;

export default class Task {
	constructor(id, title, description) {
		this.id = id;
		this.title = title;
		this.description = description;
	}

	static createTask(id, title, description) {
		return new Task(id, title, description);
	}

	static async getAllTasks() {
		try {
			const rawData = await readDataFile();
			return JSON.parse(rawData) || [];
		} catch (error) {
			console.error("Error getting tasks:", error);
			throw new TaskError("Unable to retrieve tasks.");
		}
	}

	static async getTaskById(taskId) {
		try {
			const tasks = await Task.getAllTasks();
			return tasks.find((task) => task.id === taskId);
		} catch (error) {
			console.error("Error getting task by ID:", error);
			throw new Error("Unable to retrieve task by ID.");
		}
	}

	static async addTask(task) {
		try {
			const tasks = await Task.getAllTasks();
			tasks.push(task);
			await writeDataFile(tasks);
		} catch (error) {
			console.error("Error adding task:", error);
			throw new Error("Unable to add task.");
		}
	}

	static async updateTaskById(taskId, updatedTask) {
		try {
			const tasks = await Task.getAllTasks();
			const taskIndex = tasks.findIndex((task) => task.id === taskId);

			if (taskIndex < 0) {
				throw new TaskError("Task not found.");
			}

			tasks[taskIndex] = { ...updatedTask };

			await writeDataFile(tasks);
			return true;
		} catch (error) {
			console.error("Error updating task by ID:", error);
			throw new TaskError("Unable to update task by ID.");
		}
	}

	static async deleteTaskById(taskId) {
		try {
			const tasks = await Task.getAllTasks();
			const updatedTasks = tasks.filter((task) => task.id !== taskId);

			if (updatedTasks.length !== tasks.length) {
				await writeDataFile(updatedTasks);
				return true;
			}

			throw new TaskError("Task not found.");
		} catch (error) {
			console.error("Error deleting task by ID:", error);
			throw new TaskError("Unable to delete task by ID.");
		}
	}
}
