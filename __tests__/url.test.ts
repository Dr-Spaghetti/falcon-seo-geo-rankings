import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeUrl, siteKey, UrlError } from "../lib/url";

describe("normalizeUrl", () => {
  it("adds https when protocol missing", () => {
    assert.equal(normalizeUrl("example.com"), "https://example.com/");
  });

  it("keeps http", () => {
    assert.equal(normalizeUrl("http://example.com"), "http://example.com/");
  });

  it("strips query and hash", () => {
    assert.equal(
      normalizeUrl("https://example.com/blog?utm=1#top"),
      "https://example.com/blog"
    );
  });

  it("trims whitespace", () => {
    assert.equal(normalizeUrl("  https://Example.com  "), "https://example.com/");
  });

  it("rejects empty", () => {
    assert.throws(() => normalizeUrl(""), (e: unknown) => {
      assert.ok(e instanceof UrlError);
      assert.equal((e as UrlError).code, "invalid_url");
      return true;
    });
  });

  it("rejects bad protocol", () => {
    assert.throws(() => normalizeUrl("ftp://example.com"), UrlError);
  });
});

describe("siteKey", () => {
  it("uses origin lowercased", () => {
    assert.equal(siteKey("https://WWW.Example.com/path"), "https://www.example.com");
  });
});
