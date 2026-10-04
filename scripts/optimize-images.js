import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = path.resolve('public/assets/images');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const stats = fs.statSync(fullPath);
    if (stats.size < 150 * 1024) continue; // Skip files already under 150KB

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      let pipeline = sharp(fullPath);

      // Downscale if ridiculously wide for web
      if (metadata.width && metadata.width > 1600) {
        pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
      }

      if (ext === '.png') {
        // Optimized PNG compression with palette quantization where suitable
        const buffer = await pipeline
          .png({ quality: 82, compressionLevel: 9, effort: 7 })
          .toBuffer();

        if (buffer.length < stats.size) {
          fs.writeFileSync(fullPath, buffer);
          console.log(`Optimized ${entry.name}: ${(stats.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB`);
        }
      } else if (['.jpg', '.jpeg'].includes(ext)) {
        const buffer = await pipeline
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();

        if (buffer.length < stats.size) {
          fs.writeFileSync(fullPath, buffer);
          console.log(`Optimized ${entry.name}: ${(stats.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB`);
        }
      }
    } catch (err) {
      console.warn(`Could not optimize ${entry.name}: ${err.message}`);
    }
  }
}

console.log('Starting image optimization in:', imgDir);
await processDirectory(imgDir);
console.log('Finished image optimization!');
