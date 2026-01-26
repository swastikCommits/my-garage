import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify, decode } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
      userId: string
    }
  }>()

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    
    try {
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
  
        const typedPayload = payload as { id: string };
        c.set('userId', typedPayload.id);
        await next()
    } catch (error) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
})

blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		accelerateUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})


blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({});

    return c.json({posts});
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id: id
    }
  });
  
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  
  return c.json(post);
})

blogRouter.put('/', async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		accelerateUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({ message: 'Post updated', post });
})
