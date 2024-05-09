import React, { FC } from "react";
import { Stack, Skeleton, Container } from "@mantine/core";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { Todo as TTodo } from "../api/todo.collection";

type TodoListProps = {
  isLoading: () => boolean;
  todos: TTodo[];
};

const TodoSkeleton = () => {
  return (
    <>
      <Skeleton height={24} />
      <Skeleton height={24} />
      <Skeleton height={24} />
      <Skeleton height={24} />
    </>
  );
};

export const TodoList: FC<TodoListProps> = ({ isLoading, todos }) => {
  return (
    <Stack justify="center" align="center" gap="xl">
      <TodoForm isLoading={isLoading} />
      {isLoading() ? (
        <TodoSkeleton />
      ) : (
        todos.map((todo) => (
          <Container key={todo._id} className="mx-4 min-w-[250px]">
            <Todo
              _id={todo._id!}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />
          </Container>
        ))
      )}
    </Stack>
  );
};
