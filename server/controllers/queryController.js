const { getRelevantChunks } = require('../services/semanticSearch');
const { generateCompletion } = require('../services/gptService');
const { generateEmbeddings } = require('../services/embeddingService');

exports.handleQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length < 3) {
      return res.status(400).json({ error: 'Please enter a valid question' });
    }

    // Step 1: Embed the user query
    const [queryEmbedding] = await generateEmbeddings([question]);

    // Step 2: Search FAISS for top chunks
    const chunks = await getRelevantChunks(queryEmbedding);

    // Step 3: Generate GPT response
    const answer = await generateCompletion(question, chunks);

    res.json({ answer, context: chunks });
  } catch (err) {
    console.error("❌ Query error:", err.message);
    res.status(500).json({ error: 'Failed to process query' });
  }
};
