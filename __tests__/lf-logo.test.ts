import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveBrandLogoUrl } from "../lib/lf-logo";

describe("lf-logo", () => {
  it("resolves dj-law official crest when present", () => {
    const url = resolveBrandLogoUrl("dj-law");
    assert.equal(url, "/brands/dj-law/logo.png");
    const abs = path.join(process.cwd(), "public", "brands", "dj-law", "logo.png");
    assert.ok(fs.existsSync(abs));
    const buf = fs.readFileSync(abs);
    assert.ok(buf.length > 1000, "logo binary should be substantial");
    // PNG magic
    assert.equal(buf[0], 0x89);
    assert.equal(buf[1], 0x50);
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
