import "https://deno.land/std@0.177.0/dotenv/load.ts";
import {
  cleanEnv,
  json,
  num,
  str,
} from "https://deno.land/x/envalid@0.1.2/mod.ts";
import { PollingOptions } from "grammy";

export const config = cleanEnv(Deno.env.toObject(), {
  DENO_ENV: str({
    choices: ["development", "production"],
  }),
  LOG_LEVEL: str({
    choices: ["debug", "info", "silent"],
  }),
  DATABASE_URL: str(),
  BOT_SERVER_HOST: str({
    default: "0.0.0.0",
  }),
  BOT_SERVER_PORT: num({
    default: 80,
  }),
  BOT_ALLOWED_UPDATES: json<PollingOptions["allowed_updates"]>({
    default: [],
  }),
  BOT_TOKEN: str(),
  BOT_WEBHOOK: str(),
  BOT_ADMIN_USER_ID: num(),
});
