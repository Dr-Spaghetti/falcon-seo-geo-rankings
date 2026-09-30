import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveBrandLogoUrl } from "../lib/lf-logo";

describe("lf-logo", () => {
  it("resolves dj-law official logo.webp when present", () => {
    const url = resolveBrandLogoUrl("dj-law");
    assert.equal(url, "/brands/dj-law/logo.webp");
    const abs = path.join(process.cwd(), "public", "brands", "dj-law", "logo.webp");
    assert.ok(fs.existsSync(abs));
    const buf = fs.readFileSync(abs);
    assert.ok(buf.length > 1000, "logo binary should be substantial");
    // WebP magic (firm's original DLC-FAV-ICON.webp)
    assert.equal(buf.toString("ascii", 0, 4), "RIFF");
    assert.equal(buf.toString("ascii", 8, 12), "WEBP");
  });

  it("resolves therman official logo.webp when present", () => {
    const url = resolveBrandLogoUrl("therman");
    assert.equal(url, "/brands/therman/logo.webp");
    const abs = path.join(
      process.cwd(),
      "public",
      "brands",
      "therman",
      "logo.webp"
    );
    assert.ok(fs.existsSync(abs));
    const buf = fs.readFileSync(abs);
    assert.ok(buf.length > 500, "therman logo binary should be substantial");
  });

  it("returns null for firms without a logo file (placeholder path)", () => {
    assert.equal(resolveBrandLogoUrl("no-such-firm-xyz"), null);
  });
});
