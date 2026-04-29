# Floral Charm - Flower Sale Platform (Software Testing Training Version)

Welcome to the **Floral Charm** web application! This project is a modern, responsive web application built for a flower shop, adhering to the "Organic Glassmorphism & Flat Botanical" design specifications. 

**IMPORTANT**: This application has been specifically engineered with **intentional bugs** (both frontend and backend) to serve as a training ground for software testing students.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- A Neon Serverless PostgreSQL Database

### 2. Environment Variables
Copy the example environment file and fill in your details:
```bash
cp .env.example .env.local
```
Inside `.env.local`, you MUST set:
- `DATABASE_URL`: Your Neon PostgreSQL connection string.
- `JWT_SECRET`: A secure random string for JWT token signing.
- `NEXTAUTH_SECRET`: A secure random string.
- `NEXTAUTH_URL`: `http://localhost:3000` (for local development).

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seeding
To automatically create the required tables and insert mock data (Admin, Test User, Categories, Products, and News), run the following command:
```bash
npm run seed
```
> Note: This connects directly to your Neon database using the `DATABASE_URL` in `.env.local`.

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🐞 Bug Hunting Guidelines (For Software Testing Training)

This application contains multiple intentional security, UI/UX, and business logic flaws. Students should be tasked with exploring the application, writing test cases, and identifying these issues.

### 🕵️ Frontend / UI Flaws
1. **Cart Quantity Logic**: The shopping cart allows users to decrement the quantity of an item below `1` (negative numbers), which impacts the total price.
2. **Visual-Only Pagination**: The pagination component on the Product List page (`/hoa`) is static HTML. Clicking the buttons does not load new products or change the URL.
3. **Broken Redirect Post-Login**: After successfully logging in from the checkout page or another protected route, the app incorrectly hard-redirects to the homepage (`/`) instead of returning the user to their previous page.
4. **Missing Validation Flags**: On the registration form (`/dang-ky`), the "Tên đăng nhập" field visually appears optional but is strictly required by the backend, leading to unexpected API errors if left blank.
5. **Fake Profile Saving**: On the Account page (`/tai-khoan`), clicking "Lưu" (Save) only updates the LocalStorage visually and shows an alert. It never sends an API request to the database.
6. **Incomplete Client-Side Auth Checks**: The checkout page submits an order without strictly verifying the user token on the client-side, resulting in awkward UX when the backend eventually rejects it.

### 🛑 Backend / Security Flaws
1. **Missing Authorization (Broken Access Control)**: 
   - The `POST /api/categories`, `POST /api/products`, and `POST /api/news` endpoints **do not verify** if the user is an admin. Any user who discovers these endpoints can create products or categories.
2. **Weak Authentication (Plain-text fallback)**: 
   - The `POST /api/auth/login` endpoint has a fallback that accepts plain-text password matches alongside bcrypt hashes.
3. **Data Integrity (Missing DB Transactions)**: 
   - The `POST /api/orders` endpoint inserts the main order and the order details (`ct_don_dat_hang`) sequentially without a database transaction (`BEGIN ... COMMIT`). If an order detail fails to insert, the main order remains in the database in a broken state.
4. **SQL Injection Vulnerability**: 
   - The `GET /api/products?keyword=...` endpoint uses raw string concatenation for the search keyword inside an `ILIKE` clause, making it susceptible to basic SQL injection testing.
5. **Data Exposure (IDOR/Improper Scoping)**: 
   - The `GET /api/orders` endpoint allows any user with a valid JWT token to view **all** orders in the system if they omit the `userId` parameter in the query string. It fails to scope the query to the requesting user's ID unless explicitly provided.

---

## 👨‍💻 Admin Credentials (from Seed Script)
- **Admin Login URL:** `/quan-tri`
- **Username:** `admin`
- **Password:** `admin123`

## 👤 Test User Credentials
- **Login URL:** `/dang-nhap`
- **Username:** `testuser`
- **Password:** `password123`
