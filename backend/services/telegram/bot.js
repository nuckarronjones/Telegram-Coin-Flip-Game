import { Telegraf } from "telegraf";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

export function launchBot(token){
    const bot = new Telegraf(token);

    //Bot event listeners
    bot.start(async (ctx) => {
        await ctx.reply("Welcome to coin flip, try your luck ☘️", {
            reply_markup: {
                keyboard: [
                    [ { text: "Play Coin Flip 🪙", web_app: { url: process.env.APP_URL } } ],
                ]
            }
        });

        await ctx.reply("Click on the button below to launch coin flip:", {
            reply_markup: {
                inline_keyboard: [
                    [ { text: "Play Coin Flip 🪙", web_app: { url: process.env.APP_URL } } ],
                ]
            }
        });
    });

    //Bot Launch
    bot.launch();

    return bot;
}

