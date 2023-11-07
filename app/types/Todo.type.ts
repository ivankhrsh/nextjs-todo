import { Timestamp } from "firebase/firestore";

export interface Todo {
  title: string,
  completed: boolean,
  description: string,
  createdAt: Timestamp,
  id: string
}
