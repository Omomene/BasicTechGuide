import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "temp/" });

/* -------------------------
HELPERS
------------------------- */

function readCategories() {
  const file = fs.readFileSync(path.join(__dirname, "src/data/categories.js"), "utf-8");
  const cleaned = file.replace("export const categories =", "").replace(/;$/, "").trim();
  return JSON.parse(cleaned);
}

function writeCategories(categories) {
  fs.writeFileSync(
    path.join(__dirname, "src/data/categories.js"),
    `export const categories = ${JSON.stringify(categories, null, 2)};`
  );
}

function readGuidesMeta() {
  const filePath = path.join(__dirname, "src/data/guidesMeta.js");
  if (!fs.existsSync(filePath)) return {};
  const file = fs.readFileSync(filePath, "utf-8");
  const cleaned = file.replace(/export const guidesMeta\s*=\s*/, "").replace(/;\s*$/, "").trim();
  return eval(`(${cleaned})`);
}

function writeGuidesMeta(meta) {
  const filePath = path.join(__dirname, "src/data/guidesMeta.js");
  fs.writeFileSync(filePath, `export const guidesMeta = ${JSON.stringify(meta, null, 2)};\n`);
}

/* -------------------------
GET ALL GUIDES
------------------------- */

app.get("/get-guides", (req, res) => {
  try {
    const categories = readCategories();
    let guides = [];

    categories.forEach(cat => {
      cat.guides.forEach(g => {
        guides.push({
          title: g.title,
          path: g.path,
          category: cat.slug
        });
      });
    });

    res.json({ guides });

  } catch (err) {
    res.status(500).json({ error: "Failed to load guides" });
  }
});

/* -------------------------
GET SINGLE GUIDE
------------------------- */
app.get("/get-guide", (req, res) => {
  try {
    const guidePath = req.query.path;
    if (!guidePath) return res.status(400).json({ error: "Missing guide path" });

    const [category, slug] = guidePath.split("/").filter(Boolean);
    const filePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);
    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: "Guide not found" });

    const content = fs.readFileSync(filePath, "utf-8");

    const titleMatch = content.match(/const guide = { title: "(.*?)"/);
    const guideTitle = titleMatch ? titleMatch[1] : "";

    const blocks = [];

    // -----------------------------
    // 1️⃣ Extract all StepBlocks and <p> paragraphs sequentially
    // -----------------------------
    const combinedRegex = /<StepBlock title="(.*?)" image="(.*?)".*?>([\s\S]*?)<\/StepBlock>|<p>(.*?)<\/p>/g;
    let match;

    while ((match = combinedRegex.exec(content)) !== null) {
      if (match[1] && match[2] !== undefined && match[3] !== undefined) {
        // StepBlock matched
        blocks.push({
          type: "step",
          title: match[1],
          image: match[2],
          content: match[3].trim()
        });
      } else if (match[4] !== undefined) {
        // Paragraph matched
        const text = match[4].trim();
        if (!text) continue; // skip empty paragraphs
        blocks.push({
          type: "paragraph",
          content: `<p>${text}</p>`
        });
      }
    }

    res.json({
      category,
      guideTitle,
      steps: blocks
    });

  } catch (err) {
    res.status(500).json({ error: "Guide load failed" });
  }
});

/* -------------------------
GENERATE GUIDE
------------------------- */

app.post("/generate-guide", upload.array("images"), (req, res) => {

  try {

    let { category, guideTitle, steps } = req.body;

    if (!category || !guideTitle || !steps)
      return res.status(400).json({ error: "Missing fields" });

    if (typeof steps === "string") steps = JSON.parse(steps);

    const slug = guideTitle
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    const guideFolder = path.join(__dirname, "src/pages", category);
    const imagesFolder = path.join(__dirname, "public/assets/images", category, slug);

    if (!fs.existsSync(guideFolder)) fs.mkdirSync(guideFolder, { recursive: true });
    if (!fs.existsSync(imagesFolder)) fs.mkdirSync(imagesFolder, { recursive: true });

    const files = req.files || [];
    let imgIndex = 0;

    /* handle images */
    steps.forEach(step => {

      if (step.type === "step" && step.imageFile && files[imgIndex]) {

        const file = files[imgIndex];

        const dest = path.join(imagesFolder, file.originalname);

        fs.renameSync(file.path, dest);

        step.image = `/assets/images/${category}/${slug}/${file.originalname}`;

        imgIndex++;
      }

    });

    /* generate blocks */
    const blocksJSX = steps.map(block => {

      if (block.type === "paragraph") {
        return `${block.content}`;
      }

      if (block.type === "step") {

        return `
<StepBlock title="${block.title}" image="${block.image || ""}">
${block.content}
</StepBlock>
`;

      }

    }).join("\n");

    const componentName = guideTitle.replace(/\s+/g, "");

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
      <TutorialLayout title={guide.title} description="">
        ${blocksJSX}
      </TutorialLayout>
    </Layout>
  );

}

export default ${componentName};
`;

    fs.writeFileSync(path.join(guideFolder, `${slug}.jsx`), jsxContent);

    /* update categories */

    const categories = readCategories();
    const catIndex = categories.findIndex(c => c.slug === category);

    if (catIndex >= 0) {

      categories[catIndex].guides.push({
        title: guideTitle,
        path: `/${category}/${slug}`
      });

      writeCategories(categories);
    }

    /* update meta */

    const guidesMeta = readGuidesMeta();

    guidesMeta[`/${category}/${slug}`] = {
      intro: "",
      thumbnail: steps.find(s => s.image)?.image || ""
    };

    writeGuidesMeta(guidesMeta);

    res.json({ success: true });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

/* -------------------------
SAVE / EDIT GUIDE
------------------------- */
app.post("/save-guide", upload.array("images"), (req, res) => {
  try {
    const guidePath = req.body.path;
    if (!guidePath) return res.status(400).json({ error: "Missing guide path" });

    let steps = req.body.steps;
    if (!steps) return res.status(400).json({ error: "Missing steps" });
    if (typeof steps === "string") steps = JSON.parse(steps);

    const files = req.files || [];
    let imgIndex = 0;

    const [category, slug] = guidePath.split("/").filter(Boolean);
    const guideFilePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);
    const imagesFolder = path.join(__dirname, "public/assets/images", category, slug);

    if (!fs.existsSync(guideFilePath)) return res.status(404).json({ error: "Guide not found" });
    if (!fs.existsSync(imagesFolder)) fs.mkdirSync(imagesFolder, { recursive: true });

    // Update step images
    steps.forEach((step, index) => {
      if (step.imageFile && files[imgIndex]) {
        const file = files[imgIndex];

        // Delete old image if exists
        if (step.image) {
          const oldPath = path.join(__dirname, "public", step.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        const dest = path.join(imagesFolder, file.originalname);
        fs.renameSync(file.path, dest);

        step.image = `/assets/images/${category}/${slug}/${file.originalname}`;
        imgIndex++;
      }
    });

    // Generate updated JSX
    const blocksJSX = steps.map(block => {
      if (block.type === "paragraph") return `${block.content}`;
      if (block.type === "step") return `<StepBlock title="${block.title}" image="${block.image || ""}">\n${block.content}\n</StepBlock>`;
    }).join("\n");

    // Read old content to get guideTitle and category name
    let oldContent = fs.readFileSync(guideFilePath, "utf-8");
    const titleMatch = oldContent.match(/const guide = { title: "(.*?)"/);
    const guideTitle = titleMatch ? titleMatch[1] : slug;
    
    const componentName = guideTitle.replace(/\s+/g, "");

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
      <TutorialLayout title={guide.title} description="">
        ${blocksJSX}
      </TutorialLayout>
    </Layout>
  );
}

export default ${componentName};
`;

    fs.writeFileSync(guideFilePath, jsxContent);

    // Update guidesMeta
    const guidesMeta = readGuidesMeta();
    guidesMeta[guidePath] = {
      intro: "",
      thumbnail: steps.find(s => s.image)?.image || ""
    };
    writeGuidesMeta(guidesMeta);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------
DELETE GUIDE
------------------------- */

app.post("/delete-guide", (req, res) => {

  try {

    const { path: guidePath } = req.body;

    const [category, slug] = guidePath.split("/").filter(Boolean);

    const filePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);

    const imagesFolder = path.join(
      __dirname,
      "public/assets/images",
      category,
      slug
    );

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    if (fs.existsSync(imagesFolder))
      fs.rmSync(imagesFolder, { recursive: true, force: true });

    const categories = readCategories();

    const catIndex = categories.findIndex(c => c.slug === category);

    if (catIndex >= 0) {
      categories[catIndex].guides =
        categories[catIndex].guides.filter(g => g.path !== guidePath);

      writeCategories(categories);
    }

    const guidesMeta = readGuidesMeta();
    delete guidesMeta[guidePath];
    writeGuidesMeta(guidesMeta);

    res.json({ success: true });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

/* ------------------------- */

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);