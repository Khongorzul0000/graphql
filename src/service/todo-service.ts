import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoCreateInput = {
  title: string;
  completed: boolean;
};
export type TodoUpdateInput = {
  id: string;
  title: string;
  completed: boolean;
};

const todoList: Todo[] = [{ id: nanoid(), title: "Learn Next.js", completed: false }];

export const getTodoList = (): Todo[] => {
  return todoList;
};

export const createTodo = (input: TodoCreateInput): Todo => {
  const todo: Todo = { id: nanoid(), ...input };
  todoList.push(todo);
  return todo;
};

export const getTodoById = (id: string): Todo | undefined => {
  return todoList.find((todo) => todo.id === id);
};

export const deleteTodo = (id: string): Todo | undefined => {
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index < 0) throw new GraphQLError("todo not found");
  const deleted = todoList.splice(index, 1);
  return deleted[0];
};

export const updateTodo = (input: TodoUpdateInput): Todo | undefined => {
  const todo = todoList.find((todo) => todo.id === input.id);
  if (!todo) throw new GraphQLError("Todo not found");
  todo.title = input.title;
  todo.completed = input.completed;
  return todo;
};
