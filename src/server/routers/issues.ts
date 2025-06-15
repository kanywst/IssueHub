import { z } from "zod";
import { router, procedure } from "../trpc";

export const issuesRouter = router({
  getGoodFirstIssues: procedure
    .input(
      z.object({
        language: z.string().optional(),
        keyword: z.string().optional(),
        page: z.number().default(1),
        perPage: z.number().default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const { language, keyword, page, perPage } = input;
      const data = await ctx.githubClient.getGoodFirstIssues({
        language,
        keyword,
        page,
        perPage,
      });
      
      // Map to cache repository owner information
      const ownerInfoCache = new Map();
      
      // Add repository owner information to each issue
      const enhancedItems = await Promise.all(
        data.items.map(async (issue: any) => {
          const repoUrl = issue.repository_url;
          const [owner, repo] = repoUrl.replace("https://api.github.com/repos/", "").split("/");
          
          // Get owner info from cache or fetch from API and cache it
          if (!ownerInfoCache.has(owner)) {
            try {
              const ownerInfo = await ctx.githubClient.getOrganizationDetails(owner);
              ownerInfoCache.set(owner, {
                avatar_url: ownerInfo.avatar_url,
                html_url: ownerInfo.html_url,
              });
            } catch (error) {
              ownerInfoCache.set(owner, {
                avatar_url: null,
                html_url: `https://github.com/${owner}`,
              });
            }
          }
          
          return {
            ...issue,
            owner_info: ownerInfoCache.get(owner),
          };
        })
      );
      
      return {
        ...data,
        items: enhancedItems,
      };
    }),

  getSavedIssues: procedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      throw new Error("Authentication required");
    }

    const savedIssues = await ctx.prisma.savedIssue.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add owner info for each saved issue
    const ownerInfoCache = new Map();
    
    const enhancedIssues = await Promise.all(
      savedIssues.map(async (issue) => {
        const [owner] = issue.repoName.split('/');
        
        // Get owner info from cache or fetch and cache it
        if (!ownerInfoCache.has(owner)) {
          try {
            const ownerInfo = await ctx.githubClient.getOrganizationDetails(owner);
            ownerInfoCache.set(owner, {
              avatar_url: ownerInfo.avatar_url,
              html_url: ownerInfo.html_url,
            });
          } catch (error) {
            ownerInfoCache.set(owner, {
              avatar_url: null,
              html_url: `https://github.com/${owner}`,
            });
          }
        }
        
        return {
          ...issue,
          owner_info: ownerInfoCache.get(owner),
        };
      })
    );

    return enhancedIssues;
  }),

  saveIssue: procedure
    .input(
      z.object({
        issueId: z.string(),
        issueUrl: z.string(),
        title: z.string(),
        repoName: z.string(),
        repoUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Authentication required");
      }

      const existingIssue = await ctx.prisma.savedIssue.findFirst({
        where: {
          userId,
          issueId: input.issueId,
        },
      });

      if (existingIssue) {
        return { success: false, message: "This issue is already saved", savedIssue: null };
      }

      try {
        const savedIssue = await ctx.prisma.savedIssue.create({
          data: {
            ...input,
            userId,
          },
        });
        return { success: true, savedIssue, message: "Issue saved successfully" };
      } catch (error) {
        if (error.code === 'P2002') {
          return { success: false, message: "This issue is already saved", savedIssue: null };
        }
        throw error;
      }
    }),

  removeSavedIssue: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Authentication required");
      }

      await ctx.prisma.savedIssue.delete({
        where: {
          id: input.id,
          userId,
        },
      });

      return { success: true };
    }),
});
