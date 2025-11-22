// Add lightweight globals to avoid editor/TS errors when @types/node isn't installed.
// Recommended: install @types/node and remove these declarations.
declare const process: any;
declare const Buffer: any;
type Buffer = any;

type Server = any;

// Try to load express at runtime to avoid editor/TS errors when node_modules is missing.
// Recommended: run `npm install express` and `npm i -D @types/express` and revert to static imports.
declare const require: any;
let express: any;
try {
  express = require("express");
} catch {
  express = (..._args: any[]) => {
    throw new Error("express is not installed. Run: npm install express");
  };
}

// Minimal local type aliases to silence missing @types/express in the editor.
// Install `@types/express` to restore proper types.
type Express = any;
type Request = any;
type Response = any;
type NextFunction = any;

import { registerRoutes } from "./routes";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export const app = express();

// Replace "declare module 'http' { ... }" with Express augmentation to avoid depending on @types/node
declare global {
  namespace Express {
    interface Request {
      rawBody: unknown;
    }
  }
}

app.use(express.json({
  // annotate params to avoid "implicitly has any" diagnostics
  verify: (req: Request, _res: Response, buf: Buffer | Uint8Array) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// annotate middleware params
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
}
