import { randomBytes } from "node:crypto";
import { http } from "msw";
import { backendBaseUrl } from "shared/config";
import realWorldApp from "realworld-hono-drizzle";

const bindings = {
  DATABASE_URL: "file:local.db",
  JWT_SECRET: randomBytes(64).toString("base64url"),
};

export const handlers = [
  http.all(`${backendBaseUrl.replace(/\/$/, '')}/*`, ({ request }) => {
    return realWorldApp.fetch(request, bindings);
  }),
];
