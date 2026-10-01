import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countScanKinds,
  scanKindFromPlatform,
  scanMatchesKindFilter,
  GEO_PLATFORMS,
  SEO_PLATFORMS,
  SCAN_KIND_LABEL,
} from "../lib/lf-scan-kind";

test("SEO platforms map to seo (Google / Maps)", () => {
  for (const p of SEO_PLATFORMS) {
    assert.equal(scanKindFromPlatform(p), "seo");
  }
  assert.equal(scanKindFromPlatform("Google"), "seo");
  assert.equal(SCAN_KIND_LABEL.seo.detail, "Google / Maps");
});

test("GEO platforms map to geo (LLM / geo grid)", () => {
  for (const p of GEO_PLATFORMS) {
    assert.equal(scanKindFromPlatform(p), "geo");
  }
  assert.equal(scanKindFromPlatform("ChatGPT"), "geo");
  assert.equal(SCAN_KIND_LABEL.geo.detail, "LLM / geo grid");
});

test("does not invent kinds for unknown or empty platform", () => {
  assert.equal(scanKindFromPlatform(null), null);
  assert.equal(scanKindFromPlatform(undefined), null);
  assert.equal(scanKindFromPlatform(""), null);
  assert.equal(scanKindFromPlatform("bing"), null);
});

test("type field is not used — only platform", () => {
  // campaign/manual/auto are execution modes; classification ignores them
  assert.equal(scanKindFromPlatform("google"), "seo");
  assert.equal(scanKindFromPlatform("gaio"), "geo");
});

test("filter helper and counts", () => {
  assert.equal(scanMatchesKindFilter("google", "all"), true);
  assert.equal(scanMatchesKindFilter("google", "seo"), true);
  assert.equal(scanMatchesKindFilter("google", "geo"), false);
  assert.equal(scanMatchesKindFilter("chatgpt", "geo"), true);
  assert.deepEqual(
    countScanKinds([
      { platform: "google" },
      { platform: "google" },
      { platform: "gemini" },
      { platform: "mystery" },
    ]),
    { seo: 2, geo: 1, unknown: 1 },
  );
});
