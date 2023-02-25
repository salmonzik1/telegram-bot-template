import { Api, Context as BaseContext, RawApi, SessionFlavor } from "grammy";
import { Update, UserFromGetMe } from "@grammyts/types";
import { type ConversationFlavor } from "@grammyts/conversations";
import { I18nFlavor } from "@grammyts/i18n";
import { HydrateFlavor } from "@grammyts/hydrate";
import { ParseModeFlavor } from "@grammyts/parse-mode";

import { Logger, logger } from "@/logger.ts";

interface SessionData {
  __language_code?: string;
}

type ExtendedContextFlavor = {
  logger: Logger;
};

export type Context = ParseModeFlavor<
  HydrateFlavor<
    & BaseContext
    & SessionFlavor<SessionData>
    & I18nFlavor
    & ConversationFlavor
    & ExtendedContextFlavor
  >
>;

export function createContextConstructor() {
  return class extends BaseContext implements ExtendedContextFlavor {
    logger: Logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.logger = logger;
    }
  } as unknown as new (
    update: Update,
    api: Api<RawApi>,
    me: UserFromGetMe,
  ) => Context;
}
