// src/data/seed.js
const data = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "123456",
      fullName: "مدیر فروشگاه",
      role: "admin",
    },
  ],
  products: [
    {
      id: 1,
      title: "آینه دیواری مدرن",
      price: 2500000,
      discount: 10,
      description: "آینه طرح دار با فریم طلایی، مناسب پذیرایی",
      categoryId: 2,
      stock: 15,
      rating: 4.5,
      colors: ["طلایی", "نقره‌ای"],
      sizes: ["کوچک", "متوسط"],
      images: ["/images/product1-1.jpg"],
      createdAt: "2026-05-20",
      updatedAt: "2026-05-22",
    },
  ],
  categories: [
    { id: 1, name: "آینه و کنسول", slug: "mirror-console", parentId: null },
  ],
  orders: [],
  customers: [],
  discounts: [],
};

export default data;
