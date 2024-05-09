import { Meteor } from "meteor/meteor";
import { TodoCollection } from "./todo.collection";
import { insertTodo, deleteTodo, toggleTodo } from "./todo.mutations";

insertTodo.setResolver(({ title }) => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("User must be logged in");
  }

  return TodoCollection.insert({
    title,
    userId,
    isCompleted: false,
    createdAt: new Date(),
  });
});

deleteTodo.setResolver(({ _id }) => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("User must be logged in");
  }

  return TodoCollection.remove({ _id, userId });
});

toggleTodo.setResolver(({ _id }) => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("User must be logged in");
  }

  const todo = TodoCollection.findOne({ _id, userId });
  if (!todo) {
    throw new Meteor.Error("Could not find TODO");
  }

  return TodoCollection.update(
    { _id, userId },
    { $set: { isCompleted: !todo.isCompleted } }
  );
});
