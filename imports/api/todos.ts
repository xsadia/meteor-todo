import { Mongo } from "meteor/mongo";

type Todo = {
  _id?: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date;
};

export const TodosCollection = new Mongo.Collection<Todo>("todos");
