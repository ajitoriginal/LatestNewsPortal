// server/routes/news.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/:category', newsController.getNews);

module.exports = router;
