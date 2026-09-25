import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { googleListingUrl, locationLinks } from "../lib/google-listing";

test("place id -> Google Maps listing URL", () => {
  assert.equal(
    googleListingUrl("ChIJ9ztWtfPJD4gRiJFRBlDKIfw", "Charlie Therman"),
    "https://www.google.com/maps/search/?api=1&query=Charlie%20Therman&query_place_id=ChIJ9ztWtfPJD4gRiJFRBlDKIfw",
  );
  assert.equal(googleListingUrl("not-a-place-id"), null);
  assert.equal(googleListingUrl(null), null);
});

test("website is never labelled as the Google listing", () => {
  const withId = locationLinks({ place_id: "ChIJ9ztWtfPJD4gRiJFRBlDKIfw", name: "X", url: "https://choosecharlie.com/" });
  assert.deepEqual(withId.map((l) => [l.kind, l.label]), [["google", "Open Google listing"], ["website", "Open website"]]);
  assert.ok(withId[0].href.startsWith("https://www.google.com/maps/"));
  const noId = locationLinks({ place_id: "", name: "X", url: "https://example.com" });
  assert.deepEqual(noId.map((l) => l.label), ["Open website"]);
  assert.deepEqual(locationLinks({ place_id: null, url: null }), []);
});

test("every location in client data gets a correctly labelled link", () => {
  const dir = path.join(process.cwd(), "data", "lf", "clients");
  for (const f of fs.readdirSync(dir)) {
    const c = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const l of c.locations) {
      for (const link of locationLinks(l)) {
        if (link.kind === "google") assert.ok(link.href.startsWith("https://www.google.com/maps/"));
        else assert.equal(link.label, "Open website");
      }
    }
  }
});
