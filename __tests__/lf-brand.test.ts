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
  it("maps therman, premier, michael-marr, and kaplun-marx to distinct primaries", () => {
    const therman = getBrandTheme("therman");
    const premier = getBrandTheme("premier");
    const marr = getBrandTheme("michael-marr");
    const kaplun = getBrandTheme("kaplun-marx");
    assert.equal(therman.primary, "#011633");
    assert.equal(premier.primary, "#142452");
    assert.equal(marr.primary, "#212e51");
    assert.equal(kaplun.primary, "#092241");
    assert.notEqual(therman.primary, premier.primary);
    assert.notEqual(premier.primary, marr.primary);
    assert.notEqual(marr.primary, kaplun.primary);
    assert.equal(therman.onPrimary, "#ffffff");
    assert.equal(premier.onPrimary, "#ffffff");
    assert.equal(marr.onPrimary, "#ffffff");
    assert.equal(kaplun.onPrimary, "#ffffff");
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
    assert.equal(
      brandSlugFromPathname("/clients/michael-marr/locations/ChIJabc"),
      "michael-marr"
    );
    assert.equal(
      brandSlugFromPathname("/clients/kaplun-marx/locations/ChIJabc"),
      "kaplun-marx"
    );
    assert.equal(brandSlugFromPathname("/wordpress"), null);
    assert.equal(brandSlugFromPathname("/"), null);
  });

  it("picks readable contrast on light vs dark primaries", () => {
    assert.equal(contrastOnPrimary("#011633"), "#ffffff");
    assert.equal(contrastOnPrimary("#212e51"), "#ffffff");
    assert.equal(contrastOnPrimary("#ffffff"), "#0a0a0a");
    assert.equal(contrastOnPrimary("#ffb254"), "#0a0a0a");
  });

  it("documents brand sources", () => {
    assert.match(LF_BRAND_BY_SLUG.therman.source, /choosecharlie/i);
    assert.match(LF_BRAND_BY_SLUG.premier.source, /142452|premierlawgroup|header-nav/i);
    assert.match(
      LF_BRAND_BY_SLUG["michael-marr"].source,
      /212e51|atlantainjuryattorneys|header-nav|header-main-wrap/i
    );
    assert.match(
      LF_BRAND_BY_SLUG["kaplun-marx"].source,
      /092241|kaplunmarx|elementor-24|e-global-color-2a1465e/i
    );
  });
});
