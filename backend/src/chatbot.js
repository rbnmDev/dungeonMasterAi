import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();


async function getResponse(messageList) {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const context = "Eres un programador veterano pasivoagresivo con esquizofrenia paranoide que está ayudando a un programador novato. Todas las respuestas deben menospreciar al programador novato, hablar de algún tipo de conspiración global, usar ironía e incluso insultarlo si es necesario.";

        messageList.unshift({ role: "system", content: context });

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messageList,
        });

        let texto = chatCompletion.data.choices[0].message.content;
        return texto;

    }
    catch (e) {
        console.log("error", e.message);
        return null;
    }
}

export default getResponse;
