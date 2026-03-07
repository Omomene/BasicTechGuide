import fs from "fs";
import path from "path";
import { exec } from "child_process";

// Path to your pages folder
const pagesDir = path.join(process.cwd(), "src", "pages");

// Output file
const outputFile = path.join(process.cwd(), "src", "data", "categories.js");

// Function to convert file/folder name to "Title Case"
function toTitleCase(str) {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const categories = [];

// Read categories (subfolders in pages)
const categoryDirs = fs.readdirSync(pagesDir, { withFileTypes: true });
for (const dirent of categoryDirs) {
  if (dirent.isDirectory()) {
    const categorySlug = dirent.name;
    const categoryName = toTitleCase(categorySlug);

    const guides = [];
    const categoryPath = path.join(pagesDir, categorySlug);
    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (file.endsWith(".jsx")) {
        const guideTitle = toTitleCase(file.replace(".jsx", ""));
        guides.push({
          title: guideTitle,
          path: `/${categorySlug}/${file.replace(".jsx", "")}`
        });
      }
    }

    categories.push({
      name: categoryName,
      slug: categorySlug,
      guides
    });
  }
}

// Generate the categories.js content
const content = `export const categories = ${JSON.stringify(categories, null, 2)};\n`;

// Ensure output folder exists
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

// Write the file
fs.writeFileSync(outputFile, content);

console.log("categories.js generated successfully!");

exec("node scripts/generateCategories.js");
