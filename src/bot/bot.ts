import { Bot, session } from "grammy";
import { apiThrottler } from "@grammyts/transformer-throttler";
import {
  hydrateReply,
  parseMode,
  type ParseModeFlavor,
} from "@grammyts/parse-mode";
import { conversations } from "@grammyts/conversations";

import { config } from "@/config.ts";

// Models
import { type Context, createContextConstructor } from "@/bot/models/Context.ts";
// Middlewares
import { i18n, configureI18n } from '@/bot/middlewares/i18n.middleware.ts';
// Handlers
import { errorHandler } from '@/bot/handlers/error.handler.ts';
// Features
import { feature as welcomeFeature } from '@/bot/features/welcome.feature.ts';

export const bot = new Bot<ParseModeFlavor<Context>>(config.BOT_TOKEN, {
  ContextConstructor: createContextConstructor(),
});

/********************************
 *           Middlewares         *
 ********************************/
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

bot.use(hydrateReply);

bot.use(
  session({
    initial: () => ({}),
  }),
);

bot.use(i18n);
bot.use(configureI18n);

bot.use(conversations());

const commandsList = [
    { command: 'start', description: 'Yes.' },
];
bot.api.setMyCommands(commandsList);

/********************************
 *            Handlers           *
 ********************************/
bot.use(welcomeFeature);

if (config.DENO_ENV === 'development') {
  bot.use(errorHandler);
}
