import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const appRouter = trpc.router().query('hello', {
  resolve() {
    return 'hello trpc';
  },
});

const app = express();
const port = 8080;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.get('/', (req, res) => {
  res.send('Hello from api-server');
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
