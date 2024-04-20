// server/controllers/newsController.js
const axios = require('axios');
const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: '5ec425868788438b96a21f65fd659aaf',
        country: 'in', // Change country as needed
        pageSize: 100, // Number of articles per request
        category: req.params.category,
      }
    });
    const articles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      category: req.params.category,
    }));
    await News.insertMany(articles);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
