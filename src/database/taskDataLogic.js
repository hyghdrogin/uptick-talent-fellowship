import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.resolve(__dirname, "../database/data/task.json");

export default class TaskData {
	/**
   * @class TaskData
   * @description Logic to read and write task.json
   * @exports TaskData
   */
	static async readDataFile() {
		try {
			const rawData = await fs.readFile(dataFilePath, "utf-8");
			return rawData || "[]";
		} catch (error) {
			console.error("Error reading data file:", error);
			throw new Error("Unable to read data file.");
		}
	}

	/**
   * @param {object} data - data to be written to task.json file
   */
	static async writeDataFile(data) {
		try {
			await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
		} catch (error) {
			console.error("Error writing to data file:", error);
			throw new Error("Unable to write to data file.");
		}
	}
}
