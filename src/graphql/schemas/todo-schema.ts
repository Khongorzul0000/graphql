import { gql } from "graphql-tag";

export const todoTypeDefs = gql`
  type Todo {
    id: ID!
    category: TodoCategory
    title: String!
    completed: Boolean!
  }

  input TodoCreateInput {
    title: String!
    completed: Boolean!
    categoryId: ID
  }
  input TodoUpdateInput {
    id: ID!
    title: String
    completed: Boolean
    categoryId: ID
  }

  type Query {
    getTodoList: [Todo]
    getTodo(id: ID): Todo
  }
  type Mutation {
    createTodo(input: TodoCreateInput!): Todo
    deleteTodo(id: ID): Todo
    updateTodo(input: TodoUpdateInput!): Todo
  }
`;
