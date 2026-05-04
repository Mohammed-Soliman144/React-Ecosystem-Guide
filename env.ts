/* Validation for .env.local file */
import * as z from "zod"

// Scheme for .env.local for local environment variables
const viteSchema = z.object({
    VITE_APP_NAME: z.string().optional(),
    VITE_RAPID_API_KEY: z.string().optional(),
    VITE_REQUEST_URL: z.string().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development").optional()
})

// Validate Schema by safeParse(import.meta)
// _env as private variable can not access to it (only name convention)
const _env = viteSchema.safeParse(import.meta)

// if Error Crash your app
if(!_env.success) {
    console.error("Invalid environment variables", z.treeifyError(_env.error))
    throw new Error("Invalid environment variable")
}

// public variable can access to it data of viteSchema via it (as encapsulation)
export const env = _env.data



