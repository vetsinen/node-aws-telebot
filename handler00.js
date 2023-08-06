'use strict';

const { Telegraf } = require('telegraf')
const token = "915439217:AAH0oHdQQeIvL6BWzC27F7hkUgtGiXbDn5s"
// створення бота
const bot = new Telegraf(token);
// початок діалогу з ботом
bot.start((ctx) =>
    ctx.reply("4224")
);
// запуск бота
module.exports = {
    bot,
};

// вебхук це і є той самий вебхук, який буде відповідати за роботу нашого бота
module.exports.start = async (event) => {
    try {
        let body = event.body[0] === "{"
            ? JSON.parse(event.body)
            : JSON.parse(Buffer.from(event.body, "base64"));
        await bot.handleUpdate(body);
        return { statusCode: 200, body: "" };
    } catch (err) {
        // error handler
    }
};


// прив'язка вебхуку до робота
module.exports.setWebhook = async (event) => {
    try {
//отримання url методу, коли він буде опублікований
        const url = `https://${event.headers.Host}/${event.requestContext.stage}/webhook`;
// виклика методf API телеграм-бота
        await bot.telegram.setWebhook(url);
        return {
            statusCode: 200,
            headers: {"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({ url }),
        };
    } catch (err) {
    }
};

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v3.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };
