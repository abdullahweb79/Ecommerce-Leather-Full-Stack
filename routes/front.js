const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');

const CATEGORIES = [
  { slug: 'leather-duffle-bags', label: 'Leather Duffle Bags' },
  { slug: 'duffle-bags',         label: 'Duffle Bags' },
  { slug: 'laptop-bags',         label: 'Laptop Bags' },
  { slug: 'accessories',         label: 'Accessories' },
  { slug: 'sports-bags',         label: 'Sports Bags' },
];

// ─── HOME ─────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const featured = await Product.find({ featured: true }).limit(6);
    res.render('index', { featured, categories: CATEGORIES });
  } catch (err) {
    console.error(err);
    res.render('index', { featured: [], categories: CATEGORIES });
  }
});

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
router.get('/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });

    // Group by category
    const grouped = {};
    CATEGORIES.forEach(c => { grouped[c.slug] = []; });
    products.forEach(p => {
      if (grouped[p.category]) grouped[p.category].push(p);
    });

    res.render('products', { products, grouped, categories: CATEGORIES, currentCategory: category || 'all', search: search || '' });
  } catch (err) {
    console.error(err);
    res.render('products', { products: [], grouped: {}, categories: CATEGORIES, currentCategory: 'all', search: '' });
  }
});

// ─── CONTACT ─────────────────────────────────────────────────────────────────
router.get('/contact', (req, res) => {
  const { product } = req.query;
  res.render('contact', { productName: product || '' });
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, productName, message } = req.body;
    if (!name || !email || !message) {
      req.flash('error', 'Please fill all required fields.');
      return res.redirect('/contact');
    }
    await Inquiry.create({ name, email, phone, productName, message });
    req.flash('success', 'Your inquiry has been sent! We will get back to you shortly.');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
});

module.exports = router;
module.exports.CATEGORIES = CATEGORIES;
