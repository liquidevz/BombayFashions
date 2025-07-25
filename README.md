# Bombay Fashions - Professional Uniform Manufacturing

A modern, responsive website for Bombay Fashions, specializing in professional uniform manufacturing for corporate, hospital, hotel & hospitality, and school sectors.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Product Catalog**: Comprehensive product listing with categories and filtering
- **Contact Forms**: Integrated contact and booking forms with email notifications
- **Blog Section**: Content management for blog posts
- **SEO Optimized**: Built with SEO best practices
- **Performance Optimized**: Fast loading with Next.js optimization
- **Modern UI**: Clean and professional design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer
- **Analytics**: Google Analytics ready

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bombay-fashions.git
cd bombay-fashions
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@bombayfashions.com
EMAIL_TO=info@bombayfashions.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://bombayfashions.com
```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 🧪 Code Quality

- **Type Checking**: `npm run type-check`
- **Linting**: `npm run lint`
- **Formatting**: `npm run format`

## 📁 Project Structure

```
bombay-fashions/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── products/          # Products pages
│   ├── services/          # Services page
│   ├── blog/              # Blog pages
│   └── contact/           # Contact page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── forms/            # Form components
├── lib/                   # Utility functions
├── public/               # Static assets
└── types/                # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Node.js

## 🔒 Security

- Environment variables for sensitive data
- Input validation on all forms
- Email validation and sanitization
- Rate limiting ready (configure in .env)

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app password in `SMTP_PASS`

For other providers, update SMTP settings accordingly.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support, email info@bombayfashions.com or call +91 98765 43210.

---

Built with ❤️ for Bombay Fashions
