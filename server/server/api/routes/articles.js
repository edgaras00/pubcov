const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articles');

// Article data routes

// Get all articles
router.get('/', ArticleController.articles_get_all);

// Article count by category
router.get('/categories/counts', ArticleController.articles_get_category_counts);

// Article count by pubtlication type
router.get('/pubtypes/counts', ArticleController.articles_get_ptype_counts);

// Distinct categories
// router.get('/categories', ArticleController.articles_get_categories);

// Distinct publication types
// router.get('/pubtypes', ArticleController.articles_get_pubtypes);

// Article filters (categories, pub types, abstract)
router.get('/filter', ArticleController.articles_filter);

module.exports = router;