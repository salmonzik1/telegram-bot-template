import { bot } from "@/bot/bot.ts";
import { server } from "@/server/server.ts";
import { runMongo } from "@/db/mongo.ts";

import { config } from "@/config.ts";
import { logger } from "@/logger.ts";

await runMongo();
logger.info("Connected to Mongo!");

if (config.DENO_ENV === "production") {
  await server.listen({ port: config.BOT_SERVER_PORT });
  logger.info("Server is running!");

  await bot.api.setWebhook(config.BOT_WEBHOOK, {
    allowed_updates: config.BOT_ALLOWED_UPDATES,
  });
} else {
  bot.start({
    allowed_updates: config.BOT_ALLOWED_UPDATES,
    onStart: (botInfo) => {
      logger.info(`${botInfo.username} is running!`);
    },
  });
}
