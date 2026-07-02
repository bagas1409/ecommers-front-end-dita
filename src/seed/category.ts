import { connectDB } from "../lib/db";
import { Category } from "../models/Category";

async function seedCategories() {
  await connectDB();

  const categories = [
    {
      name: "Skincare",
      slug: "skincare",
    },
    {
      name: "Sunscreen",
      slug: "sunscreen",
    },
    {
      name: "Makeup",
      slug: "makeup",
    },
    {
      name: "Hair Care",
      slug: "hair-care",
    },
    {
      name: "Body Care",
      slug: "body-care",
    },
    {
      name: "Fragrance",
      slug: "fragrance",
    },
  ];

  await Category.deleteMany(); // optional: reset data
  await Category.insertMany(categories);

  console.log("Category seed completed");
  process.exit(0);
}

seedCategories().catch((error) => {
  console.error(error);
  process.exit(1);
});
