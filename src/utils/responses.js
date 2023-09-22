export class TaskError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}