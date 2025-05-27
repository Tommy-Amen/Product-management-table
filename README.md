# 🛍️ Product Management App

A web application built with **React** and **PrimeReact** that enables users to manage products—view, add, edit, delete, and mark items as favorites—using a mock REST API.

🔗 **Live Demo**: [https://product-management-assess.netlify.app](https://product-management-assess.netlify.app)

---

## 🚀 Setup Instructions

To run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/product-management-app.git
cd product-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

The app will run on `http://localhost:3000` by default.

> **Note**: The project uses a mock API hosted at [https://mock-data-josw.onrender.com/products](https://mock-data-josw.onrender.com/products). Ensure you’re online to fetch data properly.

---

## 📌 Assumptions & Decisions

- Each product has a unique `id` used for key operations like edit, delete, and favorite.
- API operations (GET, POST, PUT, DELETE) are assumed to work with the mock REST endpoint.
- No authentication is implemented, as the app is focused on frontend product management workflows.
- PrimeReact was chosen for efficient UI scaffolding and built-in component functionality.
- Tailwind CSS is used for utility-first, consistent styling.

---

## 🔄 Navigation Flow

- **Home Page**:

  - Displays a paginated table of products.
  - You can sort, filter, and search products.

- **Add Product**:

  - Click the “Add New Product” button at the top right.
  - A modal appears for entering product details.

- **Edit Product**:

  - Click the ✏️ (edit) icon in the “Actions” column.
  - Modify the product’s fields and save.

- **View Product**:

  - Click the 👁️ (view) icon to open a modal with product details.

- **Delete Product**:
  - Click the 🗑️ (delete) icon and confirm in the dialog.

---

## 🛠️ Tech Stack

- **Frontend**: React, PrimeReact, Tailwind CSS
- **Icons & UI**: PrimeIcons
- **Data Fetching**: Axios / native fetch
- **State**: React `useState`, `useEffect`
- **Notifications**: React Hot Toast
- **API**: Mock REST API ([Render](https://mock-data-josw.onrender.com/products))

---

## 📈 What I’d Improve With More Time

- Add “Favorites Only” view or filter toggle
- Add form validation for Add/Edit product modals
- Implement user authentication and role-based access
- Improve responsiveness of DataTable on smaller screens
- Add search across all product fields (global search)
- Add charts and analytics for product data
- Refactor repeated API logic into services/hooks

---

## 📄 License

This project was built for assessment and educational purposes only.
