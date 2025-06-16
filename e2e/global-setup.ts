import { FullConfig, chromium } from "@playwright/test";
import { login } from "./helpers/auth";
import * as fs from "fs";
import * as path from "path";

/**
 * Global setup function that runs before all tests
 * This helps prepare authenticated states for tests that need them
 */
async function globalSetup(config: FullConfig): Promise<void> {
  console.log("Setting up test environment...");

  // Ensure auth directory exists
  const authDir = path.join(__dirname, ".auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Create a browser instance for setup tasks
  const browser = await chromium.launch();
  const page = await browser.newPage({
    baseURL: "http://localhost:3000",
  });

  // Set up authentication state for tests that need it
  await login(page);

  // Store authentication state
  await page.context().storageState({ path: path.join(authDir, "user.json") });

  await browser.close();
  console.log("Test environment setup complete.");
}

export default globalSetup;
