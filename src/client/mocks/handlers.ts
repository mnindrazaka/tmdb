import { rest } from "msw";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "Leanne Graham",
          username: "chelsey",
          email: "chelsey@gmail.com",
        },
      ])
    );
  }),
];
