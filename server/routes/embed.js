const express = require('express');
const router = express.Router();
const { handleEmbedding } = require('../controllers/embedController');

router.post('/', handleEmbedding);

module.exports = router;
