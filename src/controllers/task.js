import Task from "../models/taskModel.js";
import TaskValidation from "../validation/task.js";

const {
	createTask,
	getAllTasks,
	addTask,
	getTaskById,
	updateTaskById,
	deleteTaskById,
} = Task;

const { validTaskAttribute } = TaskValidation;

/**
 * @class TaskController
 * @description create, read, update and delete task
 * @exports TaskController
 */
export default class TaskController {
	/**
     * @param {object} req - The reset request object
     * @param {object} res - The reset response object
     * @returns {object} Success message
     */
	static async createTask(req, res) {
		try {
			const { title, description } = req.body;

			if (!validTaskAttribute({ title, description })) {
				return res.status(400).json({
					status: false,
					message: "Incorrect Data Input, Inputted data should be title (string) and description (string)",
				});
			}

			const tasks = await getAllTasks();
			const highestId = Math.max(...tasks.map((task) => task.id), 0) + 1;
			const newTask = createTask(highestId, title, description);
			await addTask(newTask);

			res.status(201).json({
				status: true,
				message: "Task Created Successfully",
				data: newTask
			});
		} catch (error) {
			console.error("Error creating task:", error);
			res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	/**
     * @param {object} req - The reset request object
     * @param {object} res - The reset response object
     * @returns {object} Success message
     */
	static async readTask(req, res) {
		try {
			const taskId = parseInt(req.params.taskId, 10);

			if (isNaN(taskId) || taskId <= 0) {
				return res.status(400).json({
					status: false,
					message: "Invalid Task ID format",
				});
			}

			const task = await getTaskById(taskId);

			if (!task) {
				return res.status(404).json({
					status: false,
					message: "Task not found",
				});
			}

			res.status(200).json({
				status: true,
				message: "Task read successfully",
				data: task,
			});
		} catch (error) {
			console.error("Error reading task:", error);
			res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	/**
     * @param {object} req - The reset request object
     * @param {object} res - The reset response object
     * @returns {object} Success message
     */
	static async readAllTasks(req, res) {
		try {
			const tasks = await getAllTasks();

			if (tasks.length === 0) {
				return res.status(404).json({
					status: false,
					message: "No task available",
				});
			}

			res.status(200).json({
				status: true,
				message: "All tasks read successfully",
				data: tasks,
			});
		} catch (error) {
			console.error("Error reading all tasks:", error);
			res.status(500).json({
				status: false,
				message: "Internal Server Error",
			});
		}
	}

	/**
     * @param {object} req - The reset request object
     * @param {object} res - The reset response object
     * @returns {object} Success message
     */
	static async updateTask(req, res) {
		try {
			const taskId = parseInt(req.params.taskId, 10);

			if (isNaN(taskId) || taskId <= 0) {
				return res.status(400).json({
					status: false,
					message: "Invalid Task ID format",
				});
			}

			const existingTask = await getTaskById(taskId);

			if (!existingTask) {
				return res.status(404).json({
					status: false,
					message: "Task not found",
				});
			}

			const taskUpdate = req.body;
			const updatedTask = { ...existingTask, ...taskUpdate };

			await updateTaskById(taskId, updatedTask);

			res.status(200).json({
				status: true,
				message: "Task updated successfully",
				data: updatedTask
			});
		} catch (error) {
			console.error("Error updating task:", error);
			res.status(500).json({
				status: false,
				message: "Server error",
			});
		}
	}

	/**
     * @param {object} req - The reset request object
     * @param {object} res - The reset response object
     * @returns {object} Success message
     */
	static async deleteTask(req, res) {
		try {
			const taskId = parseInt(req.params.taskId, 10);

			if (isNaN(taskId) || taskId <= 0) {
				return res.status(400).json({
					status: false,
					message: "Invalid Task ID format",
				});
			}

			const existingTask = await getTaskById(taskId);

			if (!existingTask) {
				return res.status(404).json({
					status: false,
					message: "Task not found",
				});
			}

			await deleteTaskById(taskId);

			res.status(200).json({
				status: true,
				message: "Task deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting task:", error);
			res.status(500).json({
				status: false,
				message: "Server error",
			});
		}
	}
}
