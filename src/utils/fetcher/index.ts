import { Configuration, PostsApi, UsersApi } from "../../__generated__/api";

export * from "../../__generated__/api";

const configuration = new Configuration({
  basePath: "https://jsonplaceholder.typicode.com",
});

export const postsApi = new PostsApi(configuration);

export const usersApi = new UsersApi(configuration);
