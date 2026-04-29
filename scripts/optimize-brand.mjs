// One-shot brand image optimizer. Run: node scripts/optimize-brand.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function ensureDir(p) {
  await fs.mkdir(dirname(p), { recursive: true });
}

async function size(p) {
  try {
    const s = await fs.stat(p);
    return s.size;
  } catch {
    return 0;
  }
}

async function optimize({ src, dest, width, height, opts = {} }) {
  const before = await size(src);
  await ensureDir(dest);
  let p = sharp(src).resize({
    width,
    height,
    fit: height ? "cover" : "inside",
    withoutEnlargement: true,
    background: { r: 27, g: 31, b: 58, alpha: 1 },
  });
  // PNG palette compression for the marks; keep RGBA logo as PNG with palette quantization too.
  p = p.png({ compressionLevel: 9, palette: true, quality: 80, effort: 10, ...opts });
  const buf = await p.toBuffer();
  await fs.writeFile(dest, buf);
  const after = (await size(dest)) || buf.length;
  console.log(
    `${dest.replace(root + "/", "")}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
  );
}

const tasks = [
  // Site OG / footer-quality logo (max ~1200px wide)
  {
    src: resolve(root, "public/Logo And Images/logo.png"),
    dest: resolve(root, "public/brand/brainon-logo.png"),
    width: 1200,
  },
  // OG-spec rendition for social share (1200x630, padded)
  {
    src: resolve(root, "public/Logo And Images/logo.png"),
    dest: resolve(root, "public/brand/og.png"),
    width: 1200,
    height: 630,
    opts: {},
  },
  // Brand mark for hero/menu floaters (max 256px)
  {
    src: resolve(root, "public/Logo And Images/favicons.png"),
    dest: resolve(root, "public/brand/brainon-mark.png"),
    width: 256,
  },
  // Favicon — 64px for icon.png
  {
    src: resolve(root, "public/Logo And Images/favicons.png"),
    dest: resolve(root, "src/app/icon.png"),
    width: 64,
  },
  // Apple touch icon — 180px
  {
    src: resolve(root, "public/Logo And Images/favicons.png"),
    dest: resolve(root, "src/app/apple-icon.png"),
    width: 180,
  },
];

for (const t of tasks) {
  try {
    await optimize(t);
  } catch (err) {
    console.error("Failed:", t.dest, err.message);
  }
}
