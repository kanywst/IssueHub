import { z } from 'zod';
import { router, procedure } from '../trpc';

export const repositoriesRouter = router({
  getRepositoryDetails: procedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { owner, repo } = input;
      const data = await ctx.githubClient.getRepositoryDetails(owner, repo);
      return data;
    }),
});
