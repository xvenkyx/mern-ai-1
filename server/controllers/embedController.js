const { generateEmbeddings } = require('../services/embeddingService');
const { storeEmbeddingsInFAISS } = require('../services/vectorStore');

exports.handleEmbedding = async (req, res) => {
  try {
    const { chunks } = req.body;

    if (!Array.isArray(chunks) || chunks.length === 0) {
      return res.status(400).json({ error: 'Chunks must be a non-empty array.' });
    }

    const embeddings = await generateEmbeddings(chunks);
    const response = await storeEmbeddingsInFAISS(embeddings, chunks);

    res.json({ message: 'Stored in FAISS', faissResponse: response.data });
  } catch (err) {
    console.error("❌ Embedding Error:", err.message);
    res.status(500).json({ error: 'Failed to process embeddings' });
  }
};


