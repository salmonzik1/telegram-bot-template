import { type Conversation as BaseConversation } from "@grammyts/conversations";

import { type Context } from "@/bot/models/Context.ts";

export type Conversation = BaseConversation<Context>;
