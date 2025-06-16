import { router } from './trpc';
import { issuesRouter } from './routers/issues';
import { repositoriesRouter } from './routers/repositories';

export const appRouter = router({
  issues: issuesRouter,
  repositories: repositoriesRouter,
});

export type AppRouter = typeof appRouter;
