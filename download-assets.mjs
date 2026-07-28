import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, "public", "images");
const downloadsDir = path.join(__dirname, "public", "downloads");

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

const assets = [
  { url: "https://hearocare.com/wp-content/uploads/2023/04/Hear-O-Care-logo-1-1.png", dest: path.join(imagesDir, "logo.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/08/hearing-problem.jpg", dest: path.join(imagesDir, "hearing-problem.jpg") },
  { url: "https://hearocare.com/wp-content/uploads/2023/04/hearocarecatalogue.pdf", dest: path.join(downloadsDir, "hearocarecatalogue.pdf") },
  { url: "https://hearocare.com/wp-content/uploads/2019/08/product-image-540x734.png", dest: path.join(imagesDir, "product-bottle.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/09/inner-ear-hear-o-care-pill.png", dest: path.join(imagesDir, "inner-ear.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/09/brain-hear-o-care.png", dest: path.join(imagesDir, "brain-hear-o-care.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/09/ear-icon-hear-o-care.png", dest: path.join(imagesDir, "ear-icon.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/08/hearing-aids-1.png", dest: path.join(imagesDir, "hearing-aids.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/09/manish-100x100.jpg", dest: path.join(imagesDir, "manish.jpg") },
  { url: "https://hearocare.com/wp-content/uploads/2019/09/deepak-100x100.jpg", dest: path.join(imagesDir, "deepak.jpg") },
  { url: "https://hearocare.com/wp-content/uploads/2017/08/instructor-3-100x100.png", dest: path.join(imagesDir, "amaira.png") },
  { url: "https://hearocare.com/wp-content/uploads/2019/08/product-1.png", dest: path.join(imagesDir, "product-1.png") },
];

async function downloadAll() {
  console.log("Starting download of all assets...");
  for (const asset of assets) {
    try {
      console.log(`Downloading: ${asset.url}`);
      const response = await fetch(asset.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      fs.writeFileSync(asset.dest, Buffer.from(arrayBuffer));
      console.log(`Saved to: ${asset.dest}`);
    } catch (err) {
      console.error(`Failed to download ${asset.url}:`, err.message);
    }
  }
  console.log("All assets processing finished!");
}

downloadAll();
