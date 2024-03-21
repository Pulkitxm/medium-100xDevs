import { Hono } from "hono";
import blogRouter from "./routes/blog";
import userRouter from "./routes/user";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreateBlogInput } from "medium-common-pulkit";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();

app.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.json({
    posts: await prisma.post.findMany(),
    users: await prisma.user.findMany(),
  });
});

app.use(cors());
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/user", userRouter);

export default app;
