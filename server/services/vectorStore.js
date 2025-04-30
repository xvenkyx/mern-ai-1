// const { Pinecone } = require("@pinecone-database/pinecone");
// require("dotenv").config();

// let index = null;

// const initPinecone = async () => {
//   const pinecone = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY,
//   });

//   index = pinecone.Index(
//     process.env.PINECONE_INDEX_NAME,
//     process.env.PINECONE_INDEX_HOST
//   );

//   console.log("✅ Pinecone index initialized");
// };

// const storeEmbeddings = async (embeddings, chunks) => {
//   if (!index) throw new Error("Pinecone index not initialized");

//   if (!Array.isArray(embeddings) || !Array.isArray(chunks)) {
//     throw new Error("Embeddings or chunks are not arrays");
//   }

//   const vectors = embeddings.map((vec, i) => {
//     if (!Array.isArray(vec)) {
//       throw new Error(`Vector at index ${i} is not an array`);
//     }

//     return {
//       id: `chunk-${Date.now()}-${i}`,
//       values: vec,
//       metadata: {
//         text: chunks[i],
//       },
//     };
//   });

//   console.log("✅ Sample vector preview:");
//   console.log("ID:", vectors[0].id);
//   console.log(
//     "Text (truncated):",
//     vectors[0].metadata.text.slice(0, 100) + "..."
//   );
//   console.log("Vector length:", vectors[0].values.length);
//   console.log("Is array:", Array.isArray(vectors));

//   if (!Array.isArray(vectors)) {
//     throw new Error("❌ vectors is not an array");
//   }

//   const result = await index.upsert({
//     vectors: vectors,
//     namespace: "default"
//   });

//   console.log("✅ Pinecone upsert result:", result);
// };

// module.exports = {
//   initPinecone,
//   storeEmbeddings,
// };


// const { PineconeClient } = require('pinecone-client');
// require('dotenv').config();

// const client = new PineconeClient();

// const initPinecone = async () => {
//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY,
//     environment: process.env.PINECONE_ENVIRONMENT, // e.g., 'us-west1-gcp'
//   });

//   console.log("✅ Pinecone initialized (legacy client)");
// };

// const storeEmbeddings = async (embeddings, chunks) => {
//   const index = client.Index(process.env.PINECONE_INDEX_NAME);

//   const vectors = embeddings.map((vec, i) => ({
//     id: `chunk-${Date.now()}-${i}`,
//     values: vec,
//     metadata: {
//       text: chunks[i],
//     },
//   }));

//   console.log("✅ Prepared", vectors.length, "vectors");

//   await index.upsert({
//     vectors: vectors,
//     namespace: 'default',
//   });

//   console.log("✅ Successfully upserted to Pinecone");
// };

// module.exports = {
//   initPinecone,
//   storeEmbeddings,
// };

const axios = require('axios');
require('dotenv').config();

const FAISS_URL = process.env.FAISS_URL || 'http://localhost:8001';

exports.storeEmbeddingsInFAISS = async (embeddings, chunks) => {
  const response = await axios.post(`${FAISS_URL}/add`, {
    vectors: embeddings,
    texts: chunks,
  });

  return response;
};
