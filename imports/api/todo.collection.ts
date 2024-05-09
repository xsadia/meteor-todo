import { Mongo } from "meteor/mongo";

export type TodoRecord = {
  _id?: string;
  title: string;
  userId: string;
  isCompleted: boolean;
  createdAt: Date;
};

export const TodoCollection = new Mongo.Collection<TodoRecord>("todos");
