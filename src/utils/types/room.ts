import { enumRooms } from "@prisma/client";
import { User, Message } from ".";
  
export interface ChatRoom extends RoomInterface {
    id: string;
    users: User[];
    messages: Message[];
  }

export interface RoomInterface {
  name: enumRooms
}