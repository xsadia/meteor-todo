import { Flex, Checkbox, Button, Text } from "@mantine/core";
import { TrashIcon } from "lucide-react";
import React, { FC } from "react";
import { deleteTodo, toggleTodo } from "../api/todo.mutations";
import { notifications } from "@mantine/notifications";

type TodoProps = {
  _id: string;
  title: string;
  isCompleted: boolean;
};

export const Todo: FC<TodoProps> = ({ _id, title, isCompleted }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo({ _id });
    } catch (_) {
      notifications.show({
        withCloseButton: true,
        color: "red",
        title: "Something went wrong",
        message: "Something went wrong while deleting TODO",
      });
    }
  };

  const handleTodoToggle = async () => {
    try {
      await toggleTodo({ _id });
    } catch (_) {
      notifications.show({
        withCloseButton: true,
        color: "red",
        title: "Something went wrong",
        message: "Something went wrong while toggling TODO",
      });
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex gap="sm" align="center">
        <Checkbox checked={isCompleted} onChange={() => handleTodoToggle()} />

        <Text
          className="max-w-[250px] break-words"
          td={isCompleted ? "line-through" : ""}
        >
          {title}
        </Text>
      </Flex>
      <Flex justify="flex-end">
        <Button variant="transparent" onClick={() => handleDelete()}>
          <TrashIcon size={16} className="hover:text-red-500 text-gray-500" />
        </Button>
      </Flex>
    </Flex>
  );
};
