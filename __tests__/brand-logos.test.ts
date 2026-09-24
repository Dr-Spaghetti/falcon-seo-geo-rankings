import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { FIRM_LOGOS, JUSTIFY_LOCAL_LOGO, type BrandLogo } from "../lib/brand-logos";

const pub = path.join(process.cwd(), "public");

function dims(buf: Buffer): { w: number; h: number } {
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  throw new Error("unsupported image format");
}

function check(logo: BrandLogo) {
  const abs = path.join(pub, logo.src);
  assert.ok(fs.existsSync(abs), `${logo.src} missing`);
  const buf = fs.readFileSync(abs);
  const sha = crypto.createHash("sha256").update(buf).digest("hex");
  assert.equal(sha, logo.sha256, `${logo.src} bytes changed — logos must stay untouched`);
  const d = dims(buf);
  assert.deepEqual(d, { w: logo.width, h: logo.height }, `${logo.src} dimensions`);
}

describe("brand-logos manifest (official files, untouched)", () => {
  it("Justify Local lockup matches official Drive file bytes", () => check(JUSTIFY_LOCAL_LOGO));

  for (const [slug, logo] of Object.entries(FIRM_LOGOS)) {
    it(`${slug} logo matches recorded official bytes`, () => check(logo));
  }

  it("every public/brands/<slug>/logo.* has a manifest entry", () => {
    const dir = path.join(pub, "brands");
    for (const slug of fs.readdirSync(dir)) {
      if (slug.startsWith("_")) continue;
      const files = fs.readdirSync(path.join(dir, slug)).filter((f) => /^logo\./.test(f));
      for (const f of files) {
        assert.ok(FIRM_LOGOS[slug], `no manifest entry for brands/${slug}/${f}`);
        assert.equal(FIRM_LOGOS[slug].src, `/brands/${slug}/${f}`);
      }
    }
  });
  it("no traced/redrawn logo modules remain", () => {
    const root = process.cwd();
    assert.ok(!fs.existsSync(path.join(root, "components/hub/justify-arrows-path.ts")));
    assert.ok(!fs.existsSync(path.join(root, "public/brands/_hub/justify-mark.png")));
    for (const f of ["components/AppShell.tsx", "components/ClientHub.tsx", "components/hub/HubDecor.tsx"]) {
      const src = fs.readFileSync(path.join(root, f), "utf8");
      assert.ok(!/JustifyCornerArrows|JustifyMark\b|JUSTIFY_ARROWS_PATH/.test(src), `${f} still uses a redrawn Justify mark`);
    }
  });

});
