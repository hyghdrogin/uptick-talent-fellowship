export default class TaskValidation {
	static async validTaskAttribute({ title, description }) {
		return (
			title && typeof title === "string" &&
            description && typeof description === "string"
		);
	}
}
  
