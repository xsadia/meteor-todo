import React from "react";
import { useTracker, useFind, useSubscribe } from "meteor/react-meteor-data";
import { TodoRecord, TodoCollection } from "../api/todo.collection";
import { Meteor } from "meteor/meteor";
import { todoPublication } from "../api/todo.publications";
import { TodoList } from "./TodoList";
import { Layout } from "./Layout";
import { Navigate } from "react-router-dom";

export const TodoPage = () => {
  const userId = useTracker(() => Meteor.userId());

  if (!userId) {
    return <Navigate to="/login" />;
  }

  const isLoading = useSubscribe(todoPublication.config.name);
  const todos: TodoRecord[] = useFind(
    () => TodoCollection.find({ userId }),
    []
  );
  return (
    <Layout>
      <TodoList isLoading={isLoading} todos={todos} />
    </Layout>
  );
};
