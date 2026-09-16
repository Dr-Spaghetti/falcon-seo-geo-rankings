import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  brandSlugFromPathname,
  contrastOnPrimary,
  getBrandTheme,
  LF_BRAND_BY_SLUG,
  LF_BRAND_FALLBACK,
} from "../lib/lf-brand";

describe("lf-brand", () => {
  it("maps therman and premier to distinct primaries", () => {
    const therman = getBrandTheme("therman");
    const premier = getBrandTheme("premier");
    assert.equal(therman.primary, "#011633");
    assert.equal(premier.primary, "#142452");
    assert.notEqual(therman.primary, premier.primary);
    assert.equal(therman.onPrimary, "#ffffff");
    assert.equal(premier.onPrimary, "#ffffff");
  });

  it("falls back to Falcon navy for unknown / null", () => {
    assert.equal(getBrandTheme(null).primary, LF_BRAND_FALLBACK.primary);
    assert.equal(getBrandTheme("wordpress").primary, LF_BRAND_FALLBACK.primary);
    assert.equal(getBrandTheme("nope").primary, "#122033");
  });

  it("resolves slug from client pathnames", () => {
    assert.equal(brandSlugFromPathname("/clients/therman"), "therman");
    assert.equal(
      brandSlugFromPathname("/clients/premier/locations/ChIJabc"),
      "premier"
    );
    assert.equal(brandSlugFromPathname("/wordpress"), null);
    assert.equal(brandSlugFromPathname("/"), null);
  });

  it("picks readable contrast on light vs dark primaries", () => {
    assert.equal(contrastOnPrimary("#011633"), "#ffffff");
    assert.equal(contrastOnPrimary("#ffffff"), "#0a0a0a");
    assert.equal(contrastOnPrimary("#ffb254"), "#0a0a0a");
  });

  it("documents brand sources", () => {
    assert.match(LF_BRAND_BY_SLUG.therman.source, /choosecharlie/i);
    assert.match(LF_BRAND_BY_SLUG.premier.source, /142452|premierlawgroup|header-nav/i);
  });
});
