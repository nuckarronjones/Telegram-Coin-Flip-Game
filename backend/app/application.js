import { launchApi, MESSAGE_PATH }from "../services/api/appApi.js";
import { launchBot } from "../services/telegram/bot.js";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables

export function launchApp() {
    const bot = launchBot(process.env.BOT_TOKEN);

    const api = launchApi();

    // Listen to post requests on messages endpoint
    // api.post(MESSAGE_PATH, async (request, response) => {
    //     // await handleMessageRequest(bot, request, response);
    //     console.log(request);
    // });

}

// const handleMessageRequest = async (bot, request, response) => {
//     try {
//         // Read data from the request body received by the mini app
//         const {queryId, message} = request.body;

//         // We are creating InlineQueryResultArticle
//         // See https://core.telegram.org/bots/api#inlinequeryresultarticle
//         const article = {
//             type: "article",
//             id: queryId,
//             title: "Message from the mini app",
//             input_message_content: {
//                 message_text: `MiniApp: ${message}`
//             }
//         };

//         // Use queryId and data to send a message to the bot chat
//         await bot.answerWebAppQuery(queryId, article);

//         // End the request with a success code
//         await response.status(200).json({
//             message: "success!"
//         });

//     } catch (e) {
//         const errorJson = JSON.stringify(e);
//         console.log(`handleMessageRequest error ${errorJson}`);

//         await response.status(500).json({
//             error: errorJson
//         });
//     }
// };