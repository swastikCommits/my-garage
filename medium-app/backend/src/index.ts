import { Hono } from 'hono'

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>()

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// app.use("*", async (c) => {
//   const prisma = new PrismaClient({
//     accelerateUrl : c.env?.DATABASE_URL,
// }).$extends(withAccelerate({}))
//   c.set('prisma', prisma);
// })

// app.use('/api/v1/blog/*', async (c, next) => {
// 	const authHeader = c.req.header('Authorization');
// 	if (!authHeader || !authHeader.startsWith('Bearer ')) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
	
// 	const token = authHeader.split(' ')[1];
// 	if (!token) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
	
// 	try {
// 		const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
// 		if (!payload) {
// 			c.status(401);
// 			return c.json({ error: "unauthorized" });
// 		}
  
// 		const typedPayload = payload as { id: string };
// 		c.set('userId', typedPayload.id);
// 		await next()
// 	} catch (error) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// })


export default app;