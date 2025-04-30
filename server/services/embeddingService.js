const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateEmbeddings = async (chunks) => {
  const embeddings = [];

  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: chunk,
    });

    if (!response.data || !response.data[0]?.embedding) {
      throw new Error('Invalid embedding response from OpenAI');
    }

    embeddings.push(response.data[0].embedding);
  }

  return embeddings;
};
