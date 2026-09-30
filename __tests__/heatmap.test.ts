import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  heatmapImageAlt,
  isLocalFalconHeatmapUrl,
} from "../lib/heatmap";

describe("heatmapImageAlt", () => {
  it("includes keyword, location, and date", () => {
    const alt = heatmapImageAlt({
      keyword: "personal injury attorney",
      date: "9/1/2026 1:30 AM",
      campaignName: "Charlie Therman - Chicago",
      locationLabel: "Chicago",
    });
    assert.match(alt, /personal injury attorney/);
    assert.match(alt, /Chicago/);
    assert.match(alt, /9\/1\/2026/);
  });

  it("falls back when keyword missing", () => {
    const alt = heatmapImageAlt({
      keyword: null,
      date: null,
      campaignName: null,
      locationLabel: "Bellevue",
    });
    assert.match(alt, /unnamed keyword/);
    assert.match(alt, /Bellevue/);
  });
});

describe("isLocalFalconHeatmapUrl", () => {
  it("accepts real LF static heatmap hosts", () => {
    assert.equal(
      isLocalFalconHeatmapUrl(
        "https://lf-static-v2.localfalcon.com/heatmap-img/f7da0156455a285/f3f1f176fe4546d"
      ),
      true
    );
  });

  it("rejects non-LF or non-heatmap URLs", () => {
    assert.equal(isLocalFalconHeatmapUrl(null), false);
    assert.equal(isLocalFalconHeatmapUrl("https://example.com/heatmap.png"), false);
    assert.equal(
      isLocalFalconHeatmapUrl(
        "https://lf-static-v2.localfalcon.com/image/abc/def"
      ),
      false
    );
  });
});

describe("census heatmap URLs (data)", () => {
  it("Therman + Premier sample scans use LF heatmap URLs", () => {
    const dataDir = path.join(process.cwd(), "data", "lf", "locations");
    const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
    assert.ok(files.length > 0, "expected location JSON files");

    let checked = 0;
    for (const file of files.slice(0, 4)) {
      const detail = JSON.parse(
        fs.readFileSync(path.join(dataDir, file), "utf8")
      ) as { scans: Array<{ heatmap: string | null }> };
      const withHm = detail.scans.filter((s) => s.heatmap).slice(0, 5);
      for (const s of withHm) {
        assert.equal(
          isLocalFalconHeatmapUrl(s.heatmap),
          true,
          `unexpected heatmap URL in ${file}: ${s.heatmap}`
        );
        checked += 1;
      }
    }
    assert.ok(checked > 0, "expected at least one heatmap URL in sample data");
  });
});
