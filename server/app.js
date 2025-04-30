// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const embedRoutes = require('./routes/embed');
// const uploadRoutes = require('./routes/upload');
// const { initPinecone } = require('./services/vectorStore');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/upload', uploadRoutes);
// app.use('/api/embed', embedRoutes);

// const PORT = process.env.PORT || 5000;

// initPinecone()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Failed to initialize Pinecone', err);
//   });

const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const embedRoutes = require('./routes/embed');
const uploadRoutes = require('./routes/upload');
const queryRoutes = require('./routes/query');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use('/api/embed', embedRoutes); //mapping
app.use('/api/upload', uploadRoutes);
app.use('/api/query', queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));  //callback function
