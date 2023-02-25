import { Composer } from "grammy";

import { Context } from "@/bot/models/Context.ts";
import { Users } from "@/db/models/Users.ts";
import { createLanguageKeyboard } from "@/bot/keyboards/change-language.keyboard.ts";
import { changeLanguageData } from "@/bot/callback-data/change-language.data.ts";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("language", async (ctx) => {
  await ctx.reply(ctx.t("changelanguage"), {
    reply_markup: createLanguageKeyboard(ctx),
  });
});

feature.callbackQuery(changeLanguageData.filter(), async (ctx: Context) => {
  const { code: languageCode } = changeLanguageData.unpack(
    ctx.callbackQuery?.data ?? "",
  );

  const user = await Users.findOrCreate({ id: ctx.from?.id ?? "" });
  user.languageCode = languageCode;
  await user.save();

  await ctx.i18n.setLocale(user.languageCode);

  await ctx.editMessageText(ctx.t("changelanguage"), {
    reply_markup: createLanguageKeyboard(ctx),
  });
});
