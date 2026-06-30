# 📦 Store Management Panel

A modern **e-commerce admin dashboard** built with React 19, Vite, and TailwindCSS. Designed with a Persian (RTL) interface, it provides a complete management experience for products, orders, customers, and more — featuring dark mode, responsive layouts, and clean architecture.

---

## ✨ Features

- **Dashboard**: KPI stat cards, 7-day sales chart (Recharts), and recent orders table.
- **Products**: Full CRUD, drag-and-drop image upload, client-side search/filter/pagination, and form validation.
- **Categories**: Hierarchical tree system with parent-child relationships.
- **Orders**: Status tracking (Pending to Delivered), search by ID, and detailed item breakdown.
- **Customers**: User directory with profiles, order history, and total spending stats.
- **Discounts**: Coupon CRUD, usage limits, expiration tracking, and active/inactive toggles.
- **UI/UX**: Dark mode, RTL layout, responsive mobile sidebar, loading skeletons, toasts, and confirmation dialogs.

---

## 🛠 Tech Stack

| Category           | Technology                             |
| ------------------ | -------------------------------------- |
| Framework          | React 19                               |
| Build Tool         | Vite 8                                 |
| Styling            | TailwindCSS 3.4                        |
| Routing            | React Router DOM 7                     |
| State / Server     | React Context + TanStack React Query 5 |
| HTTP Client        | Axios                                  |
| Forms & Validation | React Hook Form 7 + Zod 4              |
| Charts             | Recharts 3                             |
| Dates              | date-fns + date-fns-jalali             |
| Mock API           | JSON Server (beta 15)                  |

---

## 📁 Project Structure

```text
src/
├── components/    # UI primitives, layout, and feature modules
├── context/       # Auth & Theme providers
├── data/          # JSON Server mock DB (db.json) & seeder
├── hooks/         # Custom hooks (debounce, pagination)
├── pages/         # Route views (Dashboard, Products, etc.)
├── routes/        # App routing & protected routes
├── services/      # Axios API client & endpoints
├── styles/        # Tailwind & custom scrollbar CSS
└── utils/         # Formatters (Jalali date, prices) & configs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
git clone <repository-url>
cd Zip_mngemnt-pnl
npm install
```

### Environment Setup

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

> Starts **Vite** on `http://localhost:8000` and **JSON Server** on `http://localhost:5000`.

### Build for Production

```bash
npm run build
```

---

## 🔑 Default Login

| Field    | Value    |
| -------- | -------- |
| Username | `admin`  |
| Password | `123456` |

---

## ⚙️ Architecture & API

- **Client-side Logic**: Products and orders are fetched fully and filtered/paginated on the client to keep the JSON Server setup simple.
- **State Management**: Global states (Auth/Theme) via Context; server state fetching/caching via React Query.
- **REST Endpoints**: Centralized in `src/services/api.js` covering `/products`, `/categories`, `/orders`, `/customers`, `/discounts`, and `/users`.
- **RTL & Localization**: Layout is natively RTL. Dates use the Jalali calendar (`date-fns-jalali`) and prices use Persian numerals (`fa-IR`).

---

## 📄 License

This project is licensed under the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
