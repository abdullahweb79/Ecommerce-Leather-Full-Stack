# LeatherCo — Full-Stack Leather Export Website

Premium leather goods showcase + inquiry management system built with Node.js, Express, MongoDB, and EJS.

---

## 📁 Folder Structure

```
leatherco/
├── server.js              # Main Express app
├── seed.js                # Database seeder
├── .env                   # Environment variables
├── package.json
├── models/
│   ├── Product.js         # Product model
│   ├── Inquiry.js         # Contact inquiry model
│   └── Admin.js           # Admin user model
├── routes/
│   ├── front.js           # Public frontend routes
│   └── admin.js           # Admin panel routes
├── middleware/
│   └── auth.js            # Session auth guard
├── config/
│   └── multer.js          # Image upload config
├── views/
│   ├── index.ejs          # Home page
│   ├── products.ejs       # Products page
│   ├── contact.ejs        # Contact page
│   ├── 404.ejs            # 404 page
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── flash.ejs
│   │   └── product-card.ejs
│   └── admin/
│       ├── login.ejs
│       ├── dashboard.ejs
│       ├── products.ejs
│       ├── product-form.ejs
│       ├── inquiries.ejs
│       ├── layout-top.ejs
│       └── layout-bottom.ejs
└── public/
    ├── css/
    │   ├── style.css      # Main frontend styles
    │   └── admin.css      # Admin panel styles
    ├── js/
    │   ├── main.js        # Frontend scripts
    │   └── admin.js       # Admin scripts
    ├── img/
    │   └── placeholder.svg
    └── uploads/           # Product images (auto-created)
```

---

## 🚀 Setup Instructions

### Step 1 — Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (local) OR a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### Step 2 — Install Dependencies

```bash
cd leatherco
npm install
```

### Step 3 — Configure Environment

Edit `.env` to match your setup:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/leatherco
SESSION_SECRET=your_very_secret_key_here

# Optional: Email notifications
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=info@leatherco.com
```

> For MongoDB Atlas, replace the URI with your cluster connection string.

### Step 4 — Seed the Database

This creates the default admin account and sample products:

```bash
npm run seed
```

Default admin credentials:
- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ Change the password immediately after first login by editing the Admin document in MongoDB.

### Step 5 — Start the Server

```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

### Step 6 — Open in Browser

| URL | Page |
|-----|------|
| http://localhost:3000 | Home page |
| http://localhost:3000/products | Products page |
| http://localhost:3000/contact | Contact form |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/admin/dashboard | Admin dashboard |

---

## 🔑 Admin Panel Features

### Login
- Go to `/admin/login`
- Enter credentials (default: admin / admin123)

### Dashboard
- Overview stats: total products, inquiries, new inquiries
- Recent inquiry feed

### Products Management
- **Add Product:** Upload image, set name, description, category, price, featured flag
- **Edit Product:** Update all fields, replace image
- **Delete Product:** Removes product + image from disk
- **Categories:** Leather Duffle Bags, Duffle Bags, Laptop Bags, Accessories, Sports Bags

### Inquiries Management
- View all customer inquiries
- Update inquiry status: New → Read → Replied
- Delete inquiries

---

## 🌐 Frontend Features

- **Home Page:** Hero, stats bar, about, categories, featured products, features, CTA, contact
- **Products Page:** Filter by category (tabs), search bar, grouped display
- **Contact Page:** Pre-filled from "Order Now" button, stores to MongoDB
- **Responsive:** Mobile-first design, works on all screen sizes
- **Animations:** Scroll reveal, hover effects

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| express | Web framework |
| ejs | Templating engine |
| mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| express-session | Session management |
| connect-flash | Flash messages |
| multer | Image file uploads |
| dotenv | Environment variables |
| nodemon | Dev auto-restart |

---

## 🎨 Design

- **Fonts:** Cormorant Garamond (display) + DM Sans (body)
- **Colors:** Leather brown (#7C4A2D), warm cream, teal accent (#2A7B6F)
- **Style:** Refined luxury editorial aesthetic

---

## 🔒 Security Notes

1. Change the admin password after first use
2. Set a strong `SESSION_SECRET` in production
3. Use HTTPS in production
4. Consider rate-limiting the `/admin/login` route in production
5. Add `helmet` and `express-rate-limit` packages for production hardening

---

## 📧 Optional: Email Notifications

To receive email when a customer submits an inquiry, add this to your `routes/front.js` after saving the inquiry:

```js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO,
  subject: `New Inquiry from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${productName}\nMessage: ${message}`
});
```
<img width="1891" height="946" alt="image" src="https://github.com/user-attachments/assets/f8a9b731-1e44-487a-8d3f-5a9ffc3acc78" />
<img width="946" height="473" alt="Screenshot 2026-05-16 122856" src="https://github.com/user-attachments/assets/8d58ec2b-b8bf-4fb6-b129-d15ad795e95e" />
<img width="948" height="474" alt="Screenshot 2026-05-16 122827" src="https://github.com/user-attachments/assets/9ce64ae8-bb84-47ca-bfb5-9843e0553379" />
<img width="946" height="466" alt="Screenshot 2026-05-16 122752" src="https://github.com/user-attachments/assets/c8bf4dfd-fac2-4180-af59-79480a86d374" />
<img width="959" height="470" alt="Screenshot 2026-05-16 122739" src="https://github.com/user-attachments/assets/c37c9a95-6aee-4d35-ae08-4701af7f773b" />
<img width="959" height="473" alt="Screenshot 2026-05-16 122726" src="https://github.com/user-attachments/assets/3e76f8a7-da4c-4e82-9353-6d7e898c01ea" />
<img width="945" height="475" alt="Screenshot 2026-05-16 122712" src="https://github.com/user-attachments/assets/446ea8e6-6616-4099-9e3a-38852a988ea6" />
<img width="950" height="473" alt="Screenshot 2026-05-16 122656" src="https://github.com/user-attachments/assets/1c079105-1a90-49a2-9635-31c3b2db116d" />
<img width="947" height="468" alt="Screenshot 2026-05-16 122335" src="https://github.com/user-attachments/assets/ccc259a1-0cad-4bae-9640-b1aed18439dd" />
<img width="151" height="207" alt="Screenshot 2026-05-16 122323" src="https://github.com/user-attachments/assets/ad5fd9cd-4c7d-4d2a-9f92-22f03c2dace2" />
<img width="948" height="475" alt="Screenshot 2026-05-16 122249" src="https://github.com/user-attachments/assets/95052c68-d441-4067-8ed3-261f3ceb5e0a" />
<img width="945" height="476" alt="Screenshot 2026-05-16 122225" src="https://github.com/user-attachments/assets/0320875d-5af1-41e3-968b-a0c64e5e135e" />
<img width="950" height="473" alt="Screenshot 2026-05-16 122200" src="https://github.com/user-attachments/assets/fa3f0dc0-df5c-412e-8266-f3e465b89a77" />


---

Made with ❤️ in Pakistan 🇵🇰 By SG LEGEND 79(Abdullah)
