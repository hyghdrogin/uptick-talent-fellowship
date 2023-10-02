export interface TaskInterface extends CreateTaskInterface {
    id: number,
}

export interface CreateTaskInterface {
    id: number,
    title: string,
    description: string
}