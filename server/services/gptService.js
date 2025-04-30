const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateCompletion = async (question, contextChunks) => {
  const context = contextChunks.join('\n\n');

  const prompt = `
You are an intelligent assistant. Answer the following question using ONLY the provided context.
If the answer is not in the context, say "I don’t know based on the provided data."

Context:
${context}

Question:
${question}

Answer:
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });

  return completion.choices[0].message.content.trim();
};
