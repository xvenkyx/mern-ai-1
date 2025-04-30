const fs = require('fs');
const pdfParse = require('pdf-parse');
const { preprocessAndChunk } = require('../utils/textProcessor');

exports.handleUpload = async (req, res) => {   
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);
    const rawText = data.text;

    const chunks = preprocessAndChunk(rawText);

    res.json({ message: 'Text processed successfully', chunks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process file' });
  }
};
