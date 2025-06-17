// Type definition for environment variables
export interface Env {
  GITHUB_API_TOKEN: string;
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Function to check and retrieve environment variables
export function getEnv(key: keyof Env): string {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || '';
}

// Get all environment variables
export function getAllEnv(): Partial<Env> {
  return {
    GITHUB_API_TOKEN: getEnv('GITHUB_API_TOKEN'),
    DATABASE_URL: getEnv('DATABASE_URL'),
    NEXTAUTH_SECRET: getEnv('NEXTAUTH_SECRET'),
    NEXTAUTH_URL: getEnv('NEXTAUTH_URL'),
    NODE_ENV: process.env.NODE_ENV as Env['NODE_ENV'],
  };
}
