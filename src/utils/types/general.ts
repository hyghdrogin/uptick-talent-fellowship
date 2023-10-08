import { User } from ".";

export interface GeneralRequest {
    originalUrl: string;
    user: User,
    file: object
    params: object
    query: object
    path: object
}