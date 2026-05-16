require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Product = require('./models/Product');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB...');

  // Create admin
  await Admin.deleteMany({});
  const admin = new Admin({ username: 'admin', password: 'admin123' });
  await admin.save();
  console.log('✅ Admin created: username=admin, password=admin123');

  // Seed products
  await Product.deleteMany({});
  const products = [
    { name: 'Executive Leather Duffle', description: 'Spacious full-grain leather duffle for the modern executive. Perfect for weekend trips.', category: 'leather-duffle-bags', price: '$180', featured: true, image: 'default-product.jpg' },
    { name: 'Classic Travel Duffle', description: 'Robust canvas and leather duffle bag with multiple compartments for organized travel.', category: 'duffle-bags', price: '$120', featured: true, image: 'default-product.jpg' },
    { name: 'Pro Laptop Messenger', description: 'Slim, professional laptop bag in genuine leather — fits up to 15.6" laptops.', category: 'laptop-bags', price: '$140', featured: true, image: 'default-product.jpg' },
    { name: 'Leather Bifold Wallet', description: 'Slim bifold wallet in premium cow leather with card slots and bill compartment.', category: 'accessories', price: '$45', featured: true, image: 'default-product.jpg' },
    { name: 'Gym Sports Duffle', description: 'High-capacity sports bag with ventilated shoe pocket and durable leather trim.', category: 'sports-bags', price: '$110', featured: true, image: 'default-product.jpg' },
    { name: 'Heritage Leather Briefcase', description: 'Timeless leather briefcase for the boardroom. Fits 15" laptop, documents, and accessories.', category: 'laptop-bags', price: '$200', featured: true, image: 'default-product.jpg' },
    { name: 'Classic Leather Belt', description: 'Full-grain leather belt with brushed silver buckle. Available in brown and black.', category: 'accessories', price: '$55', featured: false, image: 'default-product.jpg' },
    { name: 'Weekender Duffle Bag', description: 'Roomy leather weekender with top handles and removable shoulder strap.', category: 'leather-duffle-bags', price: '$160', featured: false, image: 'default-product.jpg' },
  ];

  await Product.insertMany(products);
  console.log(`✅ ${products.length} products seeded`);
  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => { console.error(err); process.exit(1); });
