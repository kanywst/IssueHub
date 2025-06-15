import { prisma } from "@/lib/prisma";
import { githubClient } from "@/lib/api/github-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

export async function createContext({
  req,
}: {
  req: Request;
}) {
  // Get app-specific context here
  const session = await getServerSession(authOptions);

  return {
    prisma,
    githubClient,
    session,
    req,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
