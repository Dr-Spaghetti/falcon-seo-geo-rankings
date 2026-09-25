import { test } from "node:test";
import assert from "node:assert/strict";
import { countLabel, hubStatLabels } from "../lib/hub-labels";

test("singular for exactly 1", () => {
  assert.deepEqual(hubStatLabels(1, 1), { locations: "1 LOCATION", scans: "1 TOTAL SCAN" });
});

test("plural for 0 and >1, with thousands separator", () => {
  assert.deepEqual(hubStatLabels(7, 4733), { locations: "7 LOCATIONS", scans: "4,733 TOTAL SCANS" });
  assert.deepEqual(hubStatLabels(1, 411), { locations: "1 LOCATION", scans: "411 TOTAL SCANS" });
  assert.equal(countLabel(0, "LOCATION", "LOCATIONS"), "0 LOCATIONS");
});
