# 🏠 HomeNest – Real Estate Listing Portal

**HomeNest** is a full-stack real estate listing platform where users can browse, search, and manage rental or sale properties. Property owners can securely add, update, and delete listings, while users can explore properties, view details, and leave ratings and reviews.

🔗 **Live Website:** https://home-nest-7e180.web.app/  

---

## 📌 Project Features

-  **Authentication System**
  - Email & password authentication using Firebase
  - Google social login
  - Protected/private routes for logged-in users
  - Persistent login on page reload

-  **Property Management (CRUD)**
  - Add, update, delete, and view property listings
  - Properties stored and fetched from MongoDB
  - Only logged-in users can manage their own listings

-  **Advanced Property Browsing**
  - Browse all available properties
  - Backend sorting (price / posted date)
  - Search properties by property name
  - Featured properties displayed by newest first

-  **Ratings & Reviews**
  - Users can rate properties (1–5 stars)
  - Submit short reviews for properties
  - Dedicated “My Ratings” page for user feedback history

-  **Modern UI & UX**
  - Fully responsive design (mobile, tablet, desktop)
  - Light/Dark mode support
  - Toast & SweetAlert for success and error messages
  - Loading spinners for async operations
  - Custom 404 (Not Found) page

---

## 🧭 Application Pages & Routes

### Public Routes
- Home
- All Properties
- Login
- Register

### Private Routes
- Add Property
- My Properties
- Update Property
- Property Details
- My Ratings

---

## 🛠️ Technologies Used

### Frontend
- React 19
- React Router
- Tailwind CSS + DaisyUI
- Swiper (Slider)
- React Hook Form
- TanStack React Query
- Firebase Authentication
- Axios
- React Hot Toast
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- Vercel Deployment

---

## ⚙️ NPM Packages (Client)

```json
react, react-router, firebase, axios,
@tanstack/react-query, tailwindcss, daisyui,
swiper, react-hook-form, react-rating,
react-hot-toast, sweetalert2
