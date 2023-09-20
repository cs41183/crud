const express = require('express');
const router = express.Router();
const Article = require('../models/Article');   //i importojm modelet qe kena mi perdor ne mongodb 

// Create a new article
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific article by ID
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

// Update an existing article
router.put('/edit/:id', getArticle, async (req, res) => {
  console.log('Received PUT request with ID:', req.params.id);
  console.log('Request Body:', req.body);
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }
  if (req.body.content != null) {
    res.article.content = req.body.content;
  }
  if (req.body.category != null) {
    res.article.category = req.body.category;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.deleteOne();
    res.json({ message: 'Deleted Article' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find article' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.article = article;
  next();
}

module.exports = router;
