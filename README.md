<div align="center">

# 🌸 Suman Florals – Premium Flower Boutique Nepal

### Elegant • Modern • Fast • Built for the Nepali Flower Market

*A beautiful full-stack flower e-commerce platform built with Next.js, designed specifically for flower shops and boutique florists in Nepal.*

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

![Suman Florals Banner](https://via.placeholder.com/1400x500?text=Suman+Florals+-+Premium+Flower+Boutique+Nepal)

</div>

---

# 🌷 Overview

**Suman Florals** is a modern, elegant, and fully responsive online flower boutique built using the latest **Next.js App Router** architecture.

The project is designed for florists, flower boutiques, gift shops, and bouquet businesses in Nepal. Customers can browse flowers, filter products, save favorites, place orders, and receive instant email confirmations.

The project emphasizes:

- ✨ Beautiful user experience
- ⚡ Lightning-fast performance
- 📱 Mobile-first responsive design
- 💐 Elegant floral branding
- 🛒 Complete shopping experience
- 📧 Automated order notifications
- 🌍 English & Nepali language support

---

# ✨ Features

## 🌸 Product Catalogue

Browse hundreds of flower arrangements including:

- Rose Bouquets
- Lily Collections
- Tulip Arrangements
- Anniversary Flowers
- Birthday Gifts
- Wedding Collections
- Sympathy Flowers
- Seasonal Flowers
- Premium Luxury Bouquets
- Gift Hampers

Each product includes:

- Multiple images
- Price
- Discount
- Description
- Category
- Occasion
- Reviews
- Availability
- Delivery Information

---

## 🔍 Advanced Search & Filtering

Powerful filtering system including:

- Category
- Occasion
- Price Range
- Flower Type
- Featured Products
- Best Sellers
- New Arrivals
- Search by keyword
- URL synced filters
- Responsive filter sidebar

---

## ❤️ Wishlist

Customers can:

- Save favorite bouquets
- Remove products
- View wishlist anytime
- Persistent local storage
- One-click add to cart

---

## 🛒 Shopping Cart

Complete shopping cart functionality.

Features include:

- Add products
- Remove products
- Quantity adjustment
- Gift wrapping
- Delivery charges
- Coupon ready architecture
- Order summary
- Tax calculation
- Grand total

---

## 💳 Checkout System

Modern multi-step checkout process.

Includes:

- Customer Information
- Recipient Information
- Delivery Date
- Delivery Time
- Address
- Phone Number
- Gift Message
- Special Instructions
- Payment Selection
- Order Review
- Confirmation

Validation is handled before order submission.

---

## 🚚 Delivery Scheduling

Customers can choose:

- Delivery Date
- Preferred Time Slot
- Recipient Name
- Recipient Phone
- Delivery Instructions

Perfect for:

- Birthdays
- Anniversaries
- Weddings
- Valentine's Day
- Mother's Day
- Father's Day

---

## 💌 Email Notifications

Automatic email notifications are sent after every successful order.

Using:

- Gmail SMTP
- Nodemailer
- App Password Authentication

Email includes:

- Customer Details
- Ordered Products
- Quantity
- Total Amount
- Delivery Address
- Delivery Date
- Payment Method

---

## 🌐 Multi-language Support

Built-in language switching.

Supports:

- 🇬🇧 English
- 🇳🇵 Nepali

Easy to extend for additional languages.

---

## 📱 Responsive Design

Optimized for every device.

Supports:

- Desktop
- Laptop
- Tablet
- Mobile
- Large Displays

Built with:

- Tailwind CSS v4
- CSS Grid
- Flexbox
- Responsive Typography

---

## 🎨 Beautiful UI

Designed with a premium floral aesthetic.

Includes:

- Smooth animations
- Elegant gradients
- Floral color palette
- Rounded cards
- Modern buttons
- Soft shadows
- Glassmorphism elements
- Framer Motion animations

---

# 🚀 Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 16 |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| State Management | React Context API |
| Backend | Next.js API Routes |
| Email | Nodemailer |
| Storage | JSON File Storage |
| Components | Radix UI |
| Notifications | React Hot Toast |

---

# 📁 Project Structure

```text
suman-florals/
│
├── app/
│   ├── api/
│   │   └── orders/
│   │       └── route.ts
│   │
│   ├── checkout/
│   │
│   ├── shop/
│   │
│   ├── product/
│   │   └── [slug]/
│   │
│   ├── thank-you/
│   │
│   ├── wishlist/
│   │
│   ├── cart/
│   │
│   ├── about/
│   │
│   ├── contact/
│   │
│   ├── layout.tsx
│   │
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── common/
│
├── lib/
│   ├── context.tsx
│   ├── email.ts
│   ├── storage.ts
│   ├── data.ts
│   └── utils.ts
│
├── public/
│
├── data/
│   └── orders.json
│
├── styles/
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/suman-florals.git
```

```bash
cd suman-florals
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create

```text
.env.local
```

Add:

```env
EMAIL_USER=your-email@gmail.com

EMAIL_PASS=your-16-character-app-password

EMAIL_TO=orders@example.com
```

---

## 4. Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

| Variable | Description |
|-----------|-------------|
| EMAIL_USER | Gmail Address |
| EMAIL_PASS | Gmail App Password |
| EMAIL_TO | Notification Email |

> **Never commit your `.env.local` file.**

---

# 📬 API Endpoints

## GET `/api/orders`

Returns every saved order.

### Response

```json
[
  {
    "id": 1,
    "customer": {},
    "items": [],
    "total": 6552
  }
]
```

---

## POST `/api/orders`

Creates a new order.

### Example Request

```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+97798XXXXXXXX",
    "address": "Thamel, Kathmandu"
  },
  "items": [
    {
      "productId": "1",
      "name": "Royal Red Roses Bouquet",
      "quantity": 1,
      "price": 2499
    }
  ],
  "total": 6552,
  "paymentMethod": "cod",
  "delivery": {
    "recipient": "Jane Doe",
    "phone": "+97798XXXXXXXX",
    "date": "2026-07-20",
    "time": "12 PM - 3 PM",
    "instructions": "Call before delivery"
  }
}
```

---

### Response

```http
201 Created
```

Returns the saved order.

---

# 📧 Email Workflow

```text
Customer Places Order
          │
          ▼
Checkout Validation
          │
          ▼
Save Order
(JSON Storage)
          │
          ▼
Generate Email
          │
          ▼
Nodemailer SMTP
          │
          ▼
Gmail Server
          │
          ▼
Customer Receives Confirmation
```

---

# 🧪 Testing

1. Configure `.env.local`

2. Run:

```bash
npm run dev
```

3. Place a test order

4. Check:

- Terminal logs

```
📧 Order confirmation email sent
```

5. Verify email inbox.

If you receive

```
535 Authentication Failed
```

Make sure:

- Two-Factor Authentication is enabled
- Gmail App Password is correct
- No spaces exist in the App Password

---

# 🚀 Deployment

## Vercel (Recommended)

```bash
git push origin main
```

Import the repository into Vercel.

Add environment variables:

- EMAIL_USER
- EMAIL_PASS
- EMAIL_TO

Deploy.

---

## Other Platforms

Compatible with:

- Railway
- Render
- DigitalOcean
- VPS
- Node.js Hosting

Static export is **not supported** because API Routes require a Node.js runtime.

---

# 🛣️ Future Improvements

- PostgreSQL Database
- Prisma ORM
- Authentication
- Customer Accounts
- Razorpay Integration
- Khalti Payment
- eSewa Payment
- FonePay Integration
- Stripe Payments
- Order Tracking
- Admin Dashboard
- Inventory Management
- Discount Coupons
- Product Reviews
- CMS Integration
- Analytics Dashboard
- SMS Notifications
- Push Notifications
- AI Bouquet Recommendation
- Delivery Partner Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🙏 Acknowledgements

Special thanks to the creators of these amazing technologies:

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React
- Nodemailer
- Radix UI
- React Hot Toast
- TypeScript

---

# 💐 About

Suman Florals is designed as a premium online flower boutique for Nepal, combining elegant design with a seamless shopping experience. Whether customers are celebrating birthdays, anniversaries, weddings, festivals, or simply expressing love and appreciation, the platform makes ordering flowers effortless, reliable, and enjoyable.

---

<div align="center">

### 🌸 Made with ❤️ for Nepal's Flower Industry 🌸

**If you like this project, consider giving it a ⭐ on GitHub!**

</div>