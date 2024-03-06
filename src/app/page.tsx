"use client";

import { GetTodoListDocument, GetTodoListQuery, Todo, useGetTodoListQuery } from "@/graphql/generated";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_TODO = gql`
  query Query($id: ID) {
    getTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation Mutation($input: TodoCreateInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

const EDIT_TODO = gql`
  mutation UpdateTodo($input: TodoUpdateInput!) {
    updateTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

export default function Home() {
  const [title, setTitle] = useState("");

  const { data, loading, error } = useGetTodoListQuery();
  const [createTodo, { data: createdData, loading: createLoading, error: createError }] = useMutation(CREATE_TODO);
  const [deleteTodo, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TODO);
  const [getTodo, { data: getTodoData, loading: getTodoLoading, error: getTodoError }] = useLazyQuery(GET_TODO);
  const [editTodo, { data: editData, loading: editLoading, error: editError }] = useMutation(EDIT_TODO);

  console.log({ getTodoData, getTodoLoading, getTodoError });

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}...</>;
  const { getTodoList } = data as GetTodoListQuery;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTodo({
      variables: {
        input: {
          title,
          completed: false,
        },
      },
      refetchQueries: [{ query: GetTodoListDocument }],
    });
  };

  const handleItemClick = (id: string) => {
    getTodo({
      variables: {
        id,
      },
    });
  };
  const Delete = (id: string) => {
    deleteTodo({
      variables: {
        id,
      },
      refetchQueries: [{ query: GetTodoListDocument }],
    });
  };
  const Edit = (e: any) => {
    e.preventDefault();
    editTodo({
      variables: {
        input: {
          title,
          completed: false,
        },
      },
      refetchQueries: [{ query: GetTodoListDocument }],
    });
  };

  return (
    <div>
      <h1>{getTodoData?.getTodo && <>{getTodoData.getTodo.title}</>}</h1>
      <ul className="list-disc pl-5 mb-5">
        {getTodoList?.map((todo: Todo | null) => {
          if (todo === null) return null;
          return (
            <li key={todo.id} className="cursor-pointer hover:underline" onClick={() => handleItemClick(todo.id)}>
              {todo.title}
              <button className="btn" onClick={() => Delete(todo.id)}>
                delete
              </button>
              <button className="btn ml-8" onSubmit={Edit}>
                edit
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn">Add todo</button>
      </form>
    </div>
  );
}

// "use client"
// import { Todo } from "@/service/todo-service";
// import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
// import { useState } from "react";

// const GET_TODO_LIST = gql`
//   query GetTodoList {
//     getTodoList {
//       id
//       title
//       completed
//     }
//   }
// `;

// const GET_TODO = gql`
//   query Query($id: ID) {
//     getTodo(id: $id) {
//       id
//       title
//       completed
//     }
//   }
// `;

// const CREATE_TODO = gql`
//   mutation Mutation($input: TodoCreateInput!) {
//     createTodo(input: $input) {
//       id
//       title
//       completed
//     }
//   }
// `;

// const DELETE_TODO = gql`
//   mutation DeleteTodo($id: ID) {
//     deleteTodo(id: $id) {
//       id
//       title
//       completed
//     }
//   }
// `;

// const EDIT_TODO = gql`
//   mutation UpdateTodo($id: ID!, $title: String!) {
//     updateTodo(id: $id, title: $title) {
//       id
//       title
//       completed
//     }
//   }
// `;

// export default function Home() {
//   const [title, setTitle] = useState("");
//   const [editingTodoId, setEditingTodoId] = useState<string | null>(null); // Track which todo is being edited

//   const { data, loading, error } = useQuery(GET_TODO_LIST);
//   const [createTodo] = useMutation(CREATE_TODO);
//   const [deleteTodo] = useMutation(DELETE_TODO);
//   const [editTodo] = useMutation(EDIT_TODO);
//   const [getTodo, { data: getTodoData }] = useLazyQuery(GET_TODO);

//   if (loading) return <>Loading...</>;
//   if (error) return <>{error.message}...</>;
//   const { getTodoList } = data;

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     createTodo({
//       variables: {
//         input: {
//           title,
//           completed: false,
//         },
//       },
//       refetchQueries: [{ query: GET_TODO_LIST }],
//     });
//     setTitle(""); // Reset input field after submission
//   };

//   const handleItemClick = (id: string) => {
//     getTodo({
//       variables: {
//         id,
//       },
//     });
//   };

//   const handleEdit = (todoId: string, newTitle: string) => {
//     editTodo({
//       variables: {
//         id: todoId,
//         title: newTitle,
//       },
//       refetchQueries: [{ query: GET_TODO_LIST }],
//     });
//     setEditingTodoId(null); // Reset editing state after submission
//   };

//   const handleDelete = (id: string) => {
//     deleteTodo({
//       variables: {
//         id,
//       },
//       refetchQueries: [{ query: GET_TODO_LIST }],
//     });
//   };

//   return (
//     <div>
//       <h1>{getTodoData?.getTodo && <>{getTodoData.getTodo.title}</>}</h1>
//       <ul className="list-disc pl-5 mb-5">
//         {getTodoList.map((todo: Todo) => (
//           <li key={todo.id}>
//             {editingTodoId === todo.id ? (
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleEdit(todo.id, title);
//                 }}
//               >
//                 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                 <button type="submit">Save</button>
//                 <button onClick={() => setEditingTodoId(null)}>Cancel</button>
//               </form>
//             ) : (
//               <>
//                 <span onClick={() => handleItemClick(todo.id)}>{todo.title}</span>
//                 <button onClick={() => handleDelete(todo.id)}>Delete</button>
//                 <button onClick={() => setEditingTodoId(todo.id)}>Edit</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit} className="flex">
//         <input
//           type="text"
//           placeholder="Type here"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input input-bordered w-full max-w-xs"
//         />
//         <button type="submit" className="btn">
//           Add Todo
//         </button>
//       </form>
//     </div>
//   );
// }
