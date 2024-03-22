import { Hono } from "hono";
import { verify } from "hono/jwt";
import { HonoRequest } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "medium-common-pulkit";

interface BlogRequest extends HonoRequest<"/*", {} | undefined> {
  userId?: string;
}
interface NewBlogRequest extends BlogRequest {
  content: string;
  title: string;
  authorId: string;
}
interface NewBloUpdateRequest extends NewBlogRequest {
  published: boolean;
}

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
    userId: string;
  };
}>();
blogRouter.use(async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1] || "";
    const resp = await verify(token, c.env?.JWT_TOKEN);
    if (!resp.id) {
      c.status(403);
      return c.json({ message: "Not logged in" });
    } else {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
      const user = await prisma.user.findUnique({
        where: {
          id: resp.id,
        },
      });

      if (!user) {
        c.status(403);
        return c.json({
          message: "Authentication key expired",
          code: 404,
        });
      }

      c.req.userId = resp.id;

      return await next();
    }
  } catch (err: any) {
    return c.json({
      message: err?.message.trim(),
    });
  }
});
blogRouter.post("/", async (c) => {
  const body: NewBlogRequest = await c.req.json();

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1] || "";
    const resp = await verify(token, c.env?.JWT_TOKEN);
    const user = await prisma.user.findUnique({
      where: {
        id: resp.id,
      },
    });

    if(!user){
      return c.json({ message: "Not logged in" });
    }
    
    const userId: string | undefined = user.id;
    const { title, content } = body;

    const newBlog = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId ? userId : "",
        date: new Date().toLocaleString(),
      },
    });
    return c.json(newBlog);
  } catch (err: any) {
    return c.json({
      message: err?.message.trim(),
    });
  }
});
blogRouter.put("/:id", async (c) => {
  const { id } = c.req.param();
  const body: NewBloUpdateRequest = await c.req.json();

  const obj = updateBlogInput.safeParse({ id, ...body });
  if (!obj.success) {
    return c.json(obj.error);
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1] || "";
    const resp = await verify(token, c.env?.JWT_TOKEN);
    const user = await prisma.user.findUnique({
      where: {
        id: resp.id,
      },
    });
    if(!user){
      return c.json({ message: "Not logged in" });
    }
    const { title, content } = obj.data;

    const newBlog = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        authorId: user.id ? user.id : "",
      },
    });
    return c.json(newBlog);
  } catch (err: any) {
    return c.json({
      message: err?.message.trim(),
    });
  }
});
blogRouter.get("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return c.json(blogs);
  } catch (err: any) {
    return c.json({
      message: err?.message.trim(),
    });
  }
});
blogRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  if (!id) {
    return c.json({
      message: "Invalid details",
    });
  }
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findUnique({
      where: { id },
    });
    return c.json(blog);
  } catch (err: any) {
    return c.json({
      message: err?.message.trim(),
    });
  }
});

export default blogRouter;
