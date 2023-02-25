import { Bot, session } from "grammy";
import { apiThrottler } from "@grammyts/transformer-throttler";
import { hydrateReply, parseMode } from "@grammyts/parse-mode";
import { hydrate } from "@grammyts/hydrate";
import { conversations } from "@grammyts/conversations";

import { config } from "@/config.ts";

// Models
import { Context, createContextConstructor } from "@/bot/models/Context.ts";
// Middlewares
import { configureI18n, i18n } from "@/bot/middlewares/i18n.middleware.ts";
// Handlers
import { errorHandler } from "@/bot/handlers/error.handler.ts";
// Features
import { composer as welcomeFeature } from "@/bot/features/welcome.feature.ts";
import { composer as languageFeature } from "@/bot/features/change-language.feature.ts";

export const bot = new Bot<Context>(config.BOT_TOKEN, {
  ContextConstructor: createContextConstructor(),
});

/********************************
 *           Middlewares         *
 ********************************/
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

bot.use(hydrateReply);
bot.use(hydrate());

bot.use(
  session({
    initial: () => ({}),
  }),
);

bot.use(i18n);
bot.use(configureI18n);

bot.use(conversations());

const commandsList = [
  { command: "start", description: "Yes." },
];
bot.api.setMyCommands(commandsList);

/********************************
 *            Handlers           *
 ********************************/
bot.use(welcomeFeature);
bot.use(languageFeature);

if (config.DENO_ENV === "development") {
  bot.catch(errorHandler);
}
