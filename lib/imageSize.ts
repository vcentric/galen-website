import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Width and height of an image in /public, read from the file header (JPEG, PNG, WebP, SVG).
 * Used to reserve an image's space before it loads. Returns null when the size cannot be read.
 */
export function publicImageSize(src: string): { width: number; height: number } | null {
  try {
    if (!src.startsWith("/")) return null;
    const b = fs.readFileSync(path.join(process.cwd(), "public", decodeURIComponent(src.split("?")[0])));
    const ok = (width: number, height: number) => (width > 0 && height > 0 ? { width, height } : null);
    if (b.toString("ascii", 1, 4) === "PNG") return ok(b.readUInt32BE(16), b.readUInt32BE(20));
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const kind = b.toString("ascii", 12, 16);
      if (kind === "VP8X") return ok(1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3));
      if (kind === "VP8 ") return ok(b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff);
      if (kind === "VP8L") {
        const n = b.readUInt32LE(21);
        return ok(1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff));
      }
      return null;
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) return null;
        const marker = b[i + 1];
        // Start-of-frame markers carry the size.
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc)
          return ok(b.readUInt16BE(i + 7), b.readUInt16BE(i + 5));
        i += 2 + b.readUInt16BE(i + 2);
      }
      return null;
    }
    const svg = b.toString("utf8", 0, 2000);
    const box = svg.match(/viewBox="[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/);
    if (box) return ok(Number(box[1]), Number(box[2]));
    return null;
  } catch {
    return null;
  }
}
