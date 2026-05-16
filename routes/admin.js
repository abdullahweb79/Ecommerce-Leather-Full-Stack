const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  { slug: 'leather-duffle-bags', label: 'Leather Duffle Bags' },
  { slug: 'duffle-bags',         label: 'Duffle Bags' },
  { slug: 'laptop-bags',         label: 'Laptop Bags' },
  { slug: 'accessories',         label: 'Accessories' },
  { slug: 'sports-bags',         label: 'Sports Bags' },
];

// ─── LOGIN ───────────────────────────────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin/dashboard');
  res.render('admin/login');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/admin/login');
    }
    req.session.admin = { id: admin._id, username: admin.username };
    req.flash('success', 'Welcome back, ' + admin.username + '!');
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Login failed. Try again.');
    res.redirect('/admin/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [productCount, inquiryCount, newInquiries, recentInquiries] = await Promise.all([
      Product.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);
    res.render('admin/dashboard', { productCount, inquiryCount, newInquiries, recentInquiries });
  } catch (err) {
    console.error(err);
    res.render('admin/dashboard', { productCount: 0, inquiryCount: 0, newInquiries: 0, recentInquiries: [] });
  }
});

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
router.get('/products', auth, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render('admin/products', { products, categories: CATEGORIES });
});

router.get('/products/add', auth, (req, res) => {
  res.render('admin/product-form', { product: null, categories: CATEGORIES });
});

router.post('/products/add', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, featured } = req.body;
    const image = req.file ? req.file.filename : 'default-product.jpg';
    await Product.create({ name, description, category, price, image, featured: featured === 'on' });
    req.flash('success', 'Product added successfully!');
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add product.');
    res.redirect('/admin/products/add');
  }
});

router.get('/products/edit/:id', auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { req.flash('error', 'Product not found.'); return res.redirect('/admin/products'); }
  res.render('admin/product-form', { product, categories: CATEGORIES });
});

router.post('/products/edit/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, featured } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) { req.flash('error', 'Product not found.'); return res.redirect('/admin/products'); }

    if (req.file) {
      // Delete old image if not default
      if (product.image !== 'default-product.jpg') {
        const oldPath = path.join(__dirname, '../public/uploads/', product.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.image = req.file.filename;
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.featured = featured === 'on';
    await product.save();

    req.flash('success', 'Product updated successfully!');
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update product.');
    res.redirect('/admin/products');
  }
});

router.post('/products/delete/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.image !== 'default-product.jpg') {
        const imgPath = path.join(__dirname, '../public/uploads/', product.image);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
      await Product.findByIdAndDelete(req.params.id);
      req.flash('success', 'Product deleted.');
    }
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Delete failed.');
    res.redirect('/admin/products');
  }
});

// ─── INQUIRIES ───────────────────────────────────────────────────────────────
router.get('/inquiries', auth, async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.render('admin/inquiries', { inquiries });
});

router.post('/inquiries/status/:id', auth, async (req, res) => {
  await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status });
  req.flash('success', 'Status updated.');
  res.redirect('/admin/inquiries');
});

router.post('/inquiries/delete/:id', auth, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  req.flash('success', 'Inquiry deleted.');
  res.redirect('/admin/inquiries');
});

// ─── REDIRECT /admin → dashboard ─────────────────────────────────────────────
router.get('/', (req, res) => res.redirect('/admin/dashboard'));

module.exports = router;
