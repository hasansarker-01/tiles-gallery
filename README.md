
# 🧱 Tiles Gallery

### Discover Your Perfect Aesthetic

Tiles Gallery is a responsive web application for exploring and discovering beautiful tile designs. Users can browse tiles, search by title, view tile details, and manage their profiles after signing in.

## 🌐 Live Website

- **Live URL:** Add your deployed Vercel URL here.
- **GitHub Repository:** https://github.com/hasansarker-01/Assignment-8

## ✨ Key Features

- **Home Page:** Attractive banner with a "Discover Your Perfect Aesthetic" heading and a Browse Now button.
- **Featured Tiles:** Displays selected tile designs on the homepage.
- **All Tiles Gallery:** Browse available tiles and search by title.
- **Tile Details:** View tile images, descriptions, creator information, styles, and tags.
- **User Authentication:** Register and log in using email and password.
- **Google Login:** Sign in with a Google account.
- **My Profile:** View profile information and update your name and profile image URL.
- **Responsive Design:** Supports mobile, tablet, and desktop screens.
- **Loading State:** Displays a loader while data is loading.
- **Custom Footer:** Includes social media links and contact information.
- **Protected Routes:** Restricts access to private pages for unauthenticated users.
- **Interactive UI:** Includes a scrolling marquee and animated elements.

## 🛠️ Technologies Used

- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- HeroUI
- Better Auth
- MongoDB
- React Toastify
- Animate.css / React Spring / SwiperJS — include the package actually used in the project.

## 🔐 Environment Variables

Configure the required environment variables in your local `.env.local` file and in your deployment platform.

Example variable names:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Use the exact variable names required by your application. Never commit `.env.local` or expose secret values publicly.

## 🚀 Deployment

This project can be deployed using Vercel.

After deployment, update the Live URL above with your actual website URL. Verify that the homepage, authentication pages, All Tiles page, and other routes work correctly when opened directly or reloaded.

## 👨‍💻 Author

**Hasan Sarker**

GitHub: https://github.com/hasansarker-01