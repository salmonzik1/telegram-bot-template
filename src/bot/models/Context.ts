import { Api, Context as BaseContext, SessionFlavor } from "grammy";
import { Update, UserFromGetMe } from "@grammyts/types";
import { type ConversationFlavor } from "@grammyts/conversations";
import { I18nFlavor } from "@grammyts/i18n";

import { Logger, logger } from "@/logger.ts";

interface SessionData {
  __language_code?: string;
}

export type Context =
  & BaseContext
  & SessionFlavor<SessionData>
  & I18nFlavor
  & ConversationFlavor;

type ExtendedContextFlavor = {
  logger: Logger;
};

export function createContextConstructor() {
  return class extends BaseContext implements ExtendedContextFlavor {
    logger: Logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.logger = logger;
    }
  };
}
