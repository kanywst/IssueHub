"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Box, Typography, Paper, Button, Stack, Divider } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DebugPage() {
  const { data: session, status, update } = useSession();
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Environment variable check - redirect to homepage if debug mode is not enabled
    if (process.env.NEXT_PUBLIC_DEBUG_MODE !== "true") {
      router.push("/");
      return;
    }

    // Collect browser information
    setBrowserInfo({
      userAgent: window.navigator.userAgent,
      cookiesEnabled: navigator.cookieEnabled,
      localStorage: typeof window.localStorage !== "undefined",
      sessionStorage: typeof window.sessionStorage !== "undefined",
    });
  }, [router]);

  return (
    <MainLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Authentication Debug Page
      </Typography>

      <Stack spacing={3}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Authentication Status: <strong>{status}</strong>
          </Typography>

          {session ? (
            <Box>
              <Typography variant="body1" gutterBottom>
                User Information:
              </Typography>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "1rem",
                  overflow: "auto",
                  borderRadius: "8px",
                }}
              >
                {JSON.stringify(session, null, 2)}
              </pre>
            </Box>
          ) : (
            <Typography variant="body1" color="error">
              No session information. You are not logged in or session retrieval
              failed.
            </Typography>
          )}
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Browser Environment Information
          </Typography>
          {browserInfo && (
            <pre
              style={{
                background: "#f5f5f5",
                padding: "1rem",
                overflow: "auto",
              }}
            >
              {JSON.stringify(browserInfo, null, 2)}
            </pre>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Actions
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => signIn("github", { callbackUrl: "/debug" })}
            >
              Login with GitHub
            </Button>
            <Button
              variant="outlined"
              onClick={() => signOut({ callbackUrl: "/debug" })}
            >
              Logout
            </Button>
            <Button variant="outlined" onClick={() => update()}>
              Update Session
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </MainLayout>
  );
}
