import { Application } from "oak";
import { webhookCallback } from "grammy";

import { bot } from "@/bot/bot.ts";

export const server = new Application();

server.use(webhookCallback(bot, "oak"));
