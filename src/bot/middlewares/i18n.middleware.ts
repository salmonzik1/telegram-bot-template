import { NextFunction } from "grammy";
import { I18n } from "@grammyts/i18n";
import * as mod from "https://deno.land/std@0.177.0/path/mod.ts";

import { type Context } from "@/bot/models/Context.ts";
import { Users } from "@/db/models/Users.ts";

export const i18n = new I18n<Context>({
  useSession: true,
  defaultLocale: "en",
  directory: mod.resolve(Deno.cwd(), "locales"),
  fluentBundleOptions: {
    useIsolating: false,
  },
});

export async function configureI18n(ctx: Context, next: NextFunction) {
  if (!ctx.session.__language_code && ctx.from?.id) {
    const user = await Users.findOrCreate({ id: ctx.from.id });

    await ctx.i18n.setLocale(user.languageCode);
  }

  await next();
}
