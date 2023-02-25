import { createCallbackData } from "@grammyts/callback-data";

export const changeLanguageData = createCallbackData("language", {
  code: String,
});
