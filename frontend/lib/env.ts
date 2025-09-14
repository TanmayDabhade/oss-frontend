import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // NextAuth
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().optional(),
  
  // GitHub OAuth
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
