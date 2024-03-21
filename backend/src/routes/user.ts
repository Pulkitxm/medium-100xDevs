import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "medium-common-pulkit";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();

//signup
userRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  
  const obj = signUpInput.safeParse(body);
  const { success } = obj;
  if (!success) {
    console.log(obj.error);
    c.status(403);
    return c.json({ error: "Inputs not correct" });
  }
  const { email, password, name } = obj.data;

  const userExists =   await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    c.status(403);
    return c.json({ error: "user already exists" });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  const jwt = await sign({ id: user.id }, c.env.JWT_TOKEN);
  return c.json({ token: jwt });
});
//signin
userRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const obj = signInInput.safeParse(body);
  const { success } = obj;
  if (!success) {
    console.log(obj.error);
    c.status(403);
    return c.json({ error: "Inputs not correct" });
  }
  const { email, password } = obj.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_TOKEN);
    return c.json({name:user.name, token: jwt });
  } catch (err: any) {
    return c.text(err);
  }
});

export default userRouter;
