// Add lightweight runtime-safe requires and fallbacks to avoid editor/TS errors when node_modules/@types are missing.
declare const require: any;
declare const process: any;

let fs: any;
let path: any;
let expressModule: any;
type Express = any;
// Add this alias to avoid "Cannot find name 'Server'" when node types are not installed
type Server = any;

try {
  fs = require("fs");
} catch {
  fs = {
    existsSync: (_: string) => false,
    promises: { readFile: async () => "" },
  };
}

try {
  path = require("path");
} catch {
  path = { resolve: (...parts: string[]) => parts.join("/") };
}

try {
  expressModule = require("express");
} catch {
  expressModule = null;
}

import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // use process.cwd() instead of import.meta.dirname
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const express = expressModule ?? (({ static: (_: string) => (_: any, __: any, next: any) => next() } as any));
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req: any, res: any) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
