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

// Multer config
const upload = multer({ dest: "temp/" });

// -------------------------
// HELPERS
// -------------------------
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

// -------------------------
// GET ALL GUIDES
// -------------------------
app.get("/get-guides", (req, res) => {
  try {
    const categories = readCategories();
    let guides = [];
    categories.forEach(cat => {
      cat.guides.forEach(g => {
        guides.push({ title: g.title, path: g.path, category: cat.slug });
      });
    });
    res.json({ guides });
  } catch (err) {
    res.status(500).json({ error: "Failed to load guides" });
  }
});

// -------------------------
// GET SINGLE GUIDE
// -------------------------
app.get("/get-guide", (req, res) => {
  try {
    const guidePath = req.query.path;
    if (!guidePath) return res.status(400).json({ error: "Missing guide path" });

    const [category, slug] = guidePath.split("/").filter(Boolean);
    const filePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Guide not found" });

    const content = fs.readFileSync(filePath, "utf-8");
    const titleMatch = content.match(/const guide = { title: "(.*?)"/);
    const guideTitle = titleMatch ? titleMatch[1] : "";

    const stepRegex = /<StepBlock title="(.*?)" image="(.*?)".*?>([\s\S]*?)<\/StepBlock>/g;
    let steps = [];
    let match;
    while ((match = stepRegex.exec(content)) !== null) {
      steps.push({ type: "step", title: match[1], image: match[2], content: match[3].trim() });
    }

    res.json({ category, guideTitle, steps });
  } catch (err) {
    res.status(500).json({ error: "Guide load failed" });
  }
});

// -------------------------
// CREATE / GENERATE GUIDE
// -------------------------
app.post("/generate-guide", upload.array("images"), (req, res) => {
  try {
    let { category, guideTitle, steps, originalPath } = req.body;
    if (!category || !guideTitle || !steps) return res.status(400).json({ error: "Missing fields" });
    if (typeof steps === "string") steps = JSON.parse(steps);

    const files = req.files || [];
    const slug = originalPath
      ? originalPath.split("/").filter(Boolean)[1]
      : guideTitle.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");

    const guideFolder = path.join(__dirname, "src/pages", category);
    const imagesFolder = path.join(__dirname, "public/assets/images", category, slug);
    if (!fs.existsSync(guideFolder)) fs.mkdirSync(guideFolder, { recursive: true });
    if (!fs.existsSync(imagesFolder)) fs.mkdirSync(imagesFolder, { recursive: true });

    // Handle step images
    steps.forEach((step, index) => {
      if (step.imageFile && files[index]) {
        const file = files[index];
        const dest = path.join(imagesFolder, file.originalname);
        fs.renameSync(file.path, dest);
        step.image = `/assets/images/${category}/${slug}/${file.originalname}`;
        step.imageFile = null;
      }
    });

    // Generate JSX
    const jsxSteps = steps.map(s => `
<StepBlock title="${s.title || ""}" image="${s.image || ""}">
  ${s.content || ""}
</StepBlock>`).join("\n");

    const componentName = guideTitle.replace(/\s+/g, "");
    const jsxContent = `
import Layout from "../../components/Layout";
import TutorialLayout from "../../components/TutorialLayout";
import StepBlock from "../../components/StepBlock";
import Breadcrumb from "../../components/Breadcrumb";

function ${componentName}() {
  const category = { name: "${category}", slug: "${category}" };
  const guide = { title: "${guideTitle}" };
  const intro = "This guide explains ${guideTitle.toLowerCase()} step-by-step.";

  return (
    <Layout>
      <Breadcrumb category={category} guide={guide} />
      <TutorialLayout title={guide.title} description={intro}>
        <p>{intro}</p>
        ${jsxSteps}
      </TutorialLayout>
    </Layout>
  );
}

export default ${componentName};
`;

    fs.writeFileSync(path.join(guideFolder, `${slug}.jsx`), jsxContent);

    // Update categories
    const categories = readCategories();
    const catIndex = categories.findIndex(c => c.slug === category);
    if (catIndex >= 0) {
      const guideIndex = categories[catIndex].guides.findIndex(g => g.path === (originalPath || `/${category}/${slug}`));
      if (guideIndex >= 0) categories[catIndex].guides[guideIndex].title = guideTitle;
      else categories[catIndex].guides.push({ title: guideTitle, path: `/${category}/${slug}` });
      writeCategories(categories);
    }

    // Update guidesMeta
    const guidesMeta = readGuidesMeta();
    guidesMeta[`/${category}/${slug}`] = {
      intro: `This guide explains ${guideTitle.toLowerCase()} step-by-step.`,
      thumbnail: steps[0]?.image || ""
    };
    writeGuidesMeta(guidesMeta);

    res.json({ success: true, slug: `/${category}/${slug}` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// SAVE / EDIT GUIDE (steps/images only)
// -------------------------
app.post("/save-guide", upload.array("images"), (req, res) => {
  try {
    const guidePath = req.body.path;
    if (!guidePath) return res.status(400).json({ error: "Missing guide path" });

    let steps = req.body.steps;
    if (typeof steps === "string") steps = JSON.parse(steps);

    const files = req.files || [];
    const [category, slug] = guidePath.split("/").filter(Boolean);

    const filePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Guide not found" });

    let jsx = fs.readFileSync(filePath, "utf-8");
    let imgIndex = 0;

    // Build updated steps JSX
    const stepsJSX = steps.map((step, idx) => {
      let imagePath = step.originalImage;

      if (step.newFile && files[imgIndex]) {
        const file = files[imgIndex];
        const folder = path.join(__dirname, "public/assets/images", category, slug);
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

        // Delete old
        if (step.originalImage) {
          const oldImagePath = path.join(__dirname, "public", step.originalImage);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        // Move new
        const newPath = path.join(folder, file.originalname);
        fs.renameSync(file.path, newPath);
        imagePath = `/assets/images/${category}/${slug}/${file.originalname}`;
        imgIndex++;
      }

      return `<StepBlock title="${step.title}" image="${imagePath}">
  ${step.content}
</StepBlock>`;
    }).join("\n");

    // Replace steps in JSX
    jsx = jsx.replace(/<StepBlock[\s\S]*?<\/StepBlock>/g, "");
    jsx = jsx.replace(/<\/TutorialLayout>/, `${stepsJSX}\n</TutorialLayout>`);
    fs.writeFileSync(filePath, jsx);

    // Update guidesMeta thumbnail
    const guidesMeta = readGuidesMeta();
    const firstImage = steps[0]?.newFile
      ? `/assets/images/${category}/${slug}/${files[0].originalname}`
      : steps[0]?.originalImage || "";
    guidesMeta[`/${category}/${slug}`] = {
      intro: `This guide explains ${slug} step-by-step.`,
      thumbnail: firstImage
    };
    writeGuidesMeta(guidesMeta);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
});

// -------------------------
// DELETE GUIDE
// -------------------------
app.post("/delete-guide", (req, res) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ error: "Missing path" });

    const [category, slug] = path.split("/").filter(Boolean);
    const filePath = path.join(__dirname, "src/pages", category, `${slug}.jsx`);
    const imagesFolder = path.join(__dirname, "public/assets/images", category, slug);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(imagesFolder)) fs.rmSync(imagesFolder, { recursive: true, force: true });

    // Update categories
    const categories = readCategories();
    const catIndex = categories.findIndex(c => c.slug === category);
    if (catIndex >= 0) {
      categories[catIndex].guides = categories[catIndex].guides.filter(g => g.path !== path);
      writeCategories(categories);
    }

    // Update guidesMeta
    const guidesMeta = readGuidesMeta();
    delete guidesMeta[path];
    writeGuidesMeta(guidesMeta);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// START SERVER
// -------------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));