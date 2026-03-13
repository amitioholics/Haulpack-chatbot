require('dotenv').config();
const { OpenRouter } = require('@openrouter/sdk');

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});

async function main() {
    try {
        const stream = await openrouter.chat.send({
            chatGenerationParams: {
                model: "google/gemma-3n-e2b-it:free",
                messages: [{ role: 'user', content: 'hi' }],
                stream: true
            }
        });

        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }
        console.log("\nDone");
    } catch (e) {
        console.error("ERROR:", e);
    }
}
main();
