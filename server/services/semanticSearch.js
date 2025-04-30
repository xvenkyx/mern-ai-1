const axios = require('axios');
require('dotenv').config();

const FAISS_URL = process.env.FAISS_URL || 'http://localhost:8001';

exports.getRelevantChunks = async (queryEmbedding, k = 3) => {
  const response = await axios.post(`${FAISS_URL}/query`, {
    query: queryEmbedding,
    k
  });

  return response.data.results; // returns array of top matched texts
};
