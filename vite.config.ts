// Add this line to avoid "Cannot find name 'process'" when @types/node isn't installed:
declare const process: any;

declare const require: any;
const safeRequire = (name: string) => {
  try {
    return require(name);
  } catch {
    return null;
  }
};

let defineConfig: any = (cfg: any) => cfg;
let path: any = { resolve: (...parts: string[]) => parts.join("/") };

try {
  const vite = safeRequire("vite");
  if (vite?.defineConfig) defineConfig = vite.defineConfig;
  const p = safeRequire("path");
  if (p) path = p;
} catch {
  // keep fallbacks
}

// keep React plugin only; remove Replit-specific plugins and overlays
const reactPlugin = safeRequire("@vitejs/plugin-react")?.default ?? safeRequire("@vitejs/plugin-react");

export default defineConfig(async () => {
  const plugins: any[] = [];

  if (reactPlugin) {
    try {
      plugins.push(reactPlugin());
    } catch {
      // ignore plugin errors
    }
  }

  // Removed Replit runtime overlay and dynamic Replit plugin imports to eliminate Replit dependency.
  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "client", "src"),
        "@shared": path.resolve(process.cwd(), "shared"),
        "@assets": path.resolve(process.cwd(), "attached_assets"),
      },
    },
    root: path.resolve(process.cwd(), "client"),
    build: {
      outDir: path.resolve(process.cwd(), "dist", "public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
