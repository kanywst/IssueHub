import { z } from "zod";
import { router, procedure } from "../trpc";

export const issuesRouter = router({
  getGoodFirstIssues: procedure
    .input(
      z.object({
        language: z.string().optional(),
        page: z.number().default(1),
        perPage: z.number().default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const { language, page, perPage } = input;
      const data = await ctx.githubClient.getGoodFirstIssues({
        language,
        page,
        perPage,
      });
      
      // リポジトリ所有者の情報をキャッシュするためのマップ
      const ownerInfoCache = new Map();
      
      // 各issueにリポジトリ所有者の情報を追加
      const enhancedItems = await Promise.all(
        data.items.map(async (issue: any) => {
          const repoUrl = issue.repository_url;
          const [owner, repo] = repoUrl.replace("https://api.github.com/repos/", "").split("/");
          
          // キャッシュからオーナー情報を取得するか、APIで取得してキャッシュする
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
      throw new Error("認証が必要です");
    }

    const savedIssues = await ctx.prisma.savedIssue.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return savedIssues;
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
        throw new Error("認証が必要です");
      }

      const savedIssue = await ctx.prisma.savedIssue.create({
        data: {
          ...input,
          userId,
        },
      });

      return savedIssue;
    }),

  removeSavedIssue: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("認証が必要です");
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
