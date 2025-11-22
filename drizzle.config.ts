// Replace static import with a safe runtime require to avoid editor/TS errors when deps are missing
declare const require: any;

let defineConfig: any;
try {
  defineConfig = require("drizzle-kit").defineConfig;
} catch {
  // Fallback: identity function so the file remains valid for editors.
  // Recommended: run `npm install -D drizzle-kit` and restore the static import for types.
  defineConfig = (cfg: any) => cfg;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
