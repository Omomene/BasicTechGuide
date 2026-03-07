import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import { exec } from "child_process";


const traverse = traverseModule.default;

const pagesDir = path.join(process.cwd(), "src/pages");
const guidesMeta = {};

// Recursively get all .js/.jsx files
function getAllFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else if (
      item.isFile() &&
      (item.name.endsWith(".js") || item.name.endsWith(".jsx"))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

// Extract ALL text inside a JSX node (including nested elements)
function extractText(node) {
  let text = "";

  if (!node) return text;

  if (node.type === "JSXText") {
    text += node.value;
  }

  if (node.type === "JSXExpressionContainer") {
    if (node.expression.type === "StringLiteral") {
      text += node.expression.value;
    }
  }

  if (node.children) {
    node.children.forEach(child => {
      text += extractText(child);
    });
  }

  return text;
}

// Trim intro to 2 sentences OR max 30 words
function trimIntro(text, maxWords = 30, maxSentences = 2) {
  if (!text) return "";

  text = text.replace(/\s+/g, " ").trim();
  const originalWords = text.split(/\s+/);

  // Hard word cap first
  let limited = originalWords.slice(0, maxWords).join(" ");
  const cutByWords = originalWords.length > maxWords;

  // Sentence limit inside word cap
  const sentences = limited.split(/(?<=[.!?])\s+/);
  let result = sentences.slice(0, maxSentences).join(" ");
  const cutBySentences = sentences.length > maxSentences;

  if (cutByWords || cutBySentences) {
    if (!/[.!?]$/.test(result)) {
      result += "...";
    }
  }

  return result;
}

const files = getAllFiles(pagesDir);

for (const filePath of files) {
  const code = fs.readFileSync(filePath, "utf8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let introParagraphs = [];
  let thumbnail = null;
  const importsMap = {};

  traverse(ast, {
    ImportDeclaration(path) {
      const specifier = path.node.specifiers[0]?.local.name;
      const source = path.node.source.value;
      if (specifier && source) {
        importsMap[specifier] = source;
      }
    },

    JSXElement(path) {
      const opening = path.node.openingElement;
      const tagName = opening.name.name;

      // Stop collecting intro after first StepBlock
      if (tagName === "StepBlock" && introParagraphs.length > 0) {
        path.stop();
      }

      // Collect full text from <p> before StepBlock
      if (tagName === "p") {
        const paragraphText = extractText(path.node);
        if (paragraphText.trim()) {
          introParagraphs.push(paragraphText.trim());
        }
      }

      // Capture first StepBlock image
      if (!thumbnail && tagName === "StepBlock") {
        const imageAttr = opening.attributes.find(
          attr => attr.name?.name === "image"
        );

        if (!imageAttr) return;

        // Case 1: image={variable}
        if (imageAttr.value?.type === "JSXExpressionContainer") {
          const expr = imageAttr.value.expression;

          if (expr.type === "Identifier" && importsMap[expr.name]) {
            thumbnail = importsMap[expr.name].replace(
              /^\.\/\.\.\/\.\.\/assets/,
              "/assets"
            );
          }

          // Case 2: image={"string-path"}
          if (expr.type === "StringLiteral") {
            thumbnail = expr.value;
          }
        }

        // Case 3: image="string-path"
        if (imageAttr.value?.type === "StringLiteral") {
          thumbnail = imageAttr.value.value;
        }
      }
    },
  });

  const relativePath = filePath
    .replace(pagesDir, "")
    .replace(/\\/g, "/")
    .replace(/\.(js|jsx)$/, "");

  const fullIntroText = introParagraphs.join(" ");
  const trimmedIntro = trimIntro(fullIntroText);

  guidesMeta[relativePath] = {
    intro: trimmedIntro,
    thumbnail: thumbnail || null,
  };
}

// Write output file
fs.writeFileSync(
  path.join(process.cwd(), "src/data/guidesMeta.js"),
  `export const guidesMeta = ${JSON.stringify(guidesMeta, null, 2)};`
);

console.log("guidesMeta.js generated successfully");

exec("node scripts/generateGuidesMeta.js");