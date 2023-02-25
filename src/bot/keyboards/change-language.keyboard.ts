import { InlineKeyboard } from "grammy";

import { Context } from "@/bot/models/Context.ts";
import { i18n } from "@/bot/middlewares/i18n.middleware.ts";
import { changeLanguageData } from "@/bot/callback-data/change-language.data.ts";

export const createLanguageKeyboard = (_ctx: Context) => {
  const keyboard = new InlineKeyboard();

  for (const localeCode of i18n.locales) {
    keyboard.text(localeCode, changeLanguageData.pack({ code: localeCode }));
  }

  return keyboard;
};
