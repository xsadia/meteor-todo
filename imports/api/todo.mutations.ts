import { createMethod } from "grubba-rpc";
import { z } from "zod";

const TodoInsertSchema = z.object({
  title: z.string().trim(),
});

const TodoIdSchema = z.object({
  _id: z.string(),
});

export const insertTodo = createMethod(
  "todos.insert",
  TodoInsertSchema
).expect<void>();

export const deleteTodo = createMethod(
  "todos.delete",
  TodoIdSchema
).expect<void>();

export const toggleTodo = createMethod(
  "todos.toggle",
  TodoIdSchema
).expect<void>();
