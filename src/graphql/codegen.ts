// import { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   //   schema: "http://localhost:3000/api/graphql",
//   schema: ["./src/graphql/schemas/todo-category-schema.ts", "./src/graphql/schemas/todo-schema.ts"],
//   generates: {
//     "./src/graphql/generated/index.ts": {
//       plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
//     },
//   },
// };

// export default config;
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  //   schema: "http://localhost:3000/api/graphql",
  schema: "./src/graphql/schemas/*.ts",
  documents: ["./src/graphql/documents/**/*.graphql"],
  generates: {
    "./src/graphql/generated/index.ts": {
      overwrite: true,
      plugins: ["typescript", "typescript-resolvers", "typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
