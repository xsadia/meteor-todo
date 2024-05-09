import { createPublication } from "grubba-rpc";
import { z } from "zod";
import { TodoCollection } from "./todo.collection";
import { Meteor } from "meteor/meteor";

export const todoPublication = createPublication("todos", z.undefined(), () => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("User must be logged in");
  }

  return TodoCollection.find({ userId });
});
