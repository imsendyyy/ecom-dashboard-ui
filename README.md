# 🛒 E-Commerce Dashboard UI

A production-ready **React + Axios + Bootstrap** E-Commerce homepage that loads multiple product sections concurrently, detects user location, and handles API failures gracefully.

---

## 🔗 Live Demo

👉 **Live Preview:**  
https://ecom-ui-task.netlify.app/

---

## 🖼️ Screenshots

![Uploading ecom-web-ui.png…]()


---

## ⭐ Overview

This project is a modern E-commerce homepage built using React featuring:

- 4 parallel API calls  
- Section-wise loading & error states  
- Retry mechanism per section  
- Browser + IP location detection  
- Clean Bootstrap UI with skeleton loaders  
- Fully optimized `useProducts()` custom hook

---

## 🚀 Features

### ✅ 1. Concurrent Product Fetching (4 API calls)
The homepage loads these sections simultaneously:

- Frequently Bought  
- Suggested For You  
- Best Deals Today  
- Out of Stock Today  

Each section has:

- Independent loading state  
- Independent error state  
- Retry button  
- Skeleton loaders  

Using:

- `AbortController`  
- `Promise.allSettled()` for safe API handling  

---

### ✅ 2. Smart Location Detection

Two-step location system:

#### **Step 1 → Browser GPS**
- Requests geolocation permission  
- Displays latitude & longitude if allowed  

#### **Step 2 → IP Fallback**
If GPS is denied or fails:

- Gets public IP  
- Detects city, region, and country  
- Ensures UI never breaks or blocks  

---

### ✅ 3. Clean UI (Bootstrap 5)

- Responsive grid  
- Product cards  
- Skeleton placeholders  
- Retry buttons  
- Organized sections  

---

### ✅ 4. Optimized Custom Hook (`useProducts()`)

Handles:

- 4 parallel API calls  
- Abort on re-fetch  
- Section-wise retry  
- Individual loading/error states  
- Does not block UI even if an API fails  

---

## 🧠 Problems Solved

- Prevented app crashes when an API breaks  
- Removed memory leaks using abort controllers  
- Avoided UI flickering issues  
- Implemented correct GPS → IP fallback logic  
- Built reusable, scalable structure  

---

## 📁 Folder Structure

```
src/
│── components/
│   ├── Header.jsx
│   ├── Section.jsx
│
│── hooks/
│   ├── useProducts.js
│
│── utils/
│   ├── detectLocation.js
│
│── pages/
│   ├── EcommerceHomePage.jsx
│
└── App.js
```

---

## 🛠 Tech Stack

- React JS  
- Axios  
- Bootstrap 5  
- AbortController  
- Browser Geolocation API  
- IP Geolocation API  

---

## ▶️ Setup Instructions

### 1. Clone Repo
```sh
git clone https://github.com/imsendyyy/ecom-dashboard-ui.git
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start App
```sh
npm start
```

---

## 🎯 Future Enhancements

- Theme switch (Dark/Light)  
- Backend API integration  
- Global state with Redux/Zustand  
- Infinite scroll / Pagination  
- Image lazy loading  

---

## 📜 License

MIT License — open for modification and use.

