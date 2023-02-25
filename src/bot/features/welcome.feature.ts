import { Composer } from "grammy";

import { Context } from "@/bot/models/Context.ts";
import { Users } from "@/db/models/Users.ts";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", async (ctx) => {
  await ctx.reply("Hi, there!");
});

feature.command("increase", async (ctx) => {
  const user = await Users.findOrCreate({ id: ctx.from.id });
  user.value++;
  await user.save();

  await ctx.reply(`Sussecfully increased value, now is ${user.value}`);
});
