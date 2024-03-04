import { TodoCreateInput, TodoUpdateInput, createTodo, deleteTodo, updateTodo } from "@/service/todo-service";

export const todoMutations = {
  createTodo: (_: unknown, { input }: { input: TodoCreateInput }) => createTodo(input),
  deleteTodo: (_: unknown, { id }: { id: string }) => deleteTodo(id),
  updateTodo: (_: unknown, { input }: { input: TodoUpdateInput }) => updateTodo(input),
};
