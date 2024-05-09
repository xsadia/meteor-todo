import React, { FC } from "react";
import { Flex, Button, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { insertTodo } from "../api/todo.mutations";
import { notifications } from "@mantine/notifications";

type TodoFormProps = {
  isLoading: () => boolean;
};

export const TodoForm: FC<TodoFormProps> = ({ isLoading }) => {
  const schema = z.object({
    title: z.string().min(1, "TODO's title is required"),
  });

  type Input = z.infer<typeof schema>;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async ({ title }: Input) => {
    try {
      await insertTodo({ title });
      form.reset();
    } catch (_) {
      notifications.show({
        withCloseButton: true,
        color: "red",
        title: "Something went wrong",
        message: "Something went wrong while adding TODO",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex gap="sm">
        <TextInput
          key={form.key("title")}
          {...form.getInputProps("title")}
          placeholder="Add a new task"
        />
        <Button disabled={isLoading()} type="submit">
          Add
        </Button>
      </Flex>
    </form>
  );
};
