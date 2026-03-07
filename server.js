import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/generate-guide", upload.array("images"), (req, res) => {
  try {
    let { category, guideTitle, steps } = req.body;
    const images = req.files || [];

    if (!category || !guideTitle || !steps) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ---------- SAFE PARSE STEPS ----------
    if (typeof steps === "string") {
      try {
        steps = JSON.parse(steps);
      } catch (err) {
        console.error("Invalid steps JSON:", steps);
        return res.status(400).json({ error: "Invalid steps format" });
      }
    }

    // ---------- COMPONENT NAME & SLUG ----------
    const componentName = guideTitle.replace(/\s+/g, ""); // PascalCase
    const slug = guideTitle
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-"); // lowercase, URL-safe

    // ---------- MOVE IMAGES ----------
    const imagesFolder = join(__dirname, "public/assets/images", category, slug);
    if (!fs.existsSync(imagesFolder)) fs.mkdirSync(imagesFolder, { recursive: true });

    images.forEach(file => {
      const dest = join(imagesFolder, file.originalname);
      fs.renameSync(file.path, dest);
    });

    // ---------- INTRO PARAGRAPH ----------
    const intro = `This guide explains how to ${guideTitle.toLowerCase()} step-by-step. Follow the instructions below to complete the task efficiently.`;

    // ---------- GENERATE JSX STEPS ----------
    const jsxSteps = steps.map((step, idx) => {

      let img = "";

      if (images[idx]) {
        img = `/assets/images/${category}/${slug}/${images[idx].originalname}`;
      }

      return `
    <StepBlock title="${step.title || ""}" image="${img}" alt="${step.title || ""}">
      ${step.content || ""}
    </StepBlock>
    `;
    }).join("\n\n");

    // ---------- GENERATE JSX PAGE ----------
    const jsxContent = `
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function ${componentName}() {
  const category = { name: "${category}", slug: "${category}" };
  const guide = { title: "${guideTitle}" };

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout
        title={guide.title}
        description="Step-by-step guide to ${guideTitle.toLowerCase()}."
      >
        <p>${intro}</p>

        ${jsxSteps}

      </TutorialLayout>
    </Layout>
  );
}

export default ${componentName};
`;

    const guideFolder = join(__dirname, "src/pages", category);
    if (!fs.existsSync(guideFolder)) fs.mkdirSync(guideFolder, { recursive: true });

    const fileName = join(guideFolder, `${slug}.jsx`); // FILENAME = slug (lowercase)
    fs.writeFileSync(fileName, jsxContent);

    // ---------- UPDATE categories.js ----------
    const categoriesPath = join(__dirname, "src/data/categories.js");
    let categoriesData = fs.readFileSync(categoriesPath, "utf-8")
      .replace("export const categories =", "")
      .trim()
      .replace(/;$/, "");

    let categories = JSON.parse(categoriesData);
    const catIndex = categories.findIndex(c => c.slug === category);

    if (catIndex >= 0) {
      // Prevent duplicates
      const exists = categories[catIndex].guides.some(g => g.path === `/${category}/${slug}`);
      if (!exists) {
        categories[catIndex].guides.push({
          title: guideTitle,
          path: `/${category}/${slug}`
        });
      }
    }

    fs.writeFileSync(categoriesPath, `export const categories = ${JSON.stringify(categories, null, 2)};`);

    // ---------- UPDATE guidesMeta.js ----------
    const guidesMetaPath = join(__dirname, "src/data/guidesMeta.js");
    let guidesMetaData = fs.readFileSync(guidesMetaPath, "utf-8")
      .replace("export const guidesMeta =", "")
      .trim()
      .replace(/;$/, "");

    let guidesMeta = JSON.parse(guidesMetaData);

    guidesMeta[`/${category}/${slug}`] = {
      intro: intro.slice(0, 160), // excerpt for search & previews
      thumbnail: images[0] ? `/assets/images/${category}/${slug}/${images[0].originalname}` : ""
    };

    fs.writeFileSync(guidesMetaPath, `export const guidesMeta = ${JSON.stringify(guidesMeta, null, 2)};`);

    res.json({
      success: true,
      message: "Guide created successfully!",
      jsxFile: `${slug}.jsx`,
      slug: `/${category}/${slug}`
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Admin backend running on port ${PORT}`));