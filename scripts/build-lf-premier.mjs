#!/usr/bin/env node
/**
 * Backward-compatible Premier builder.
 * Safe: only touches Premier place IDs + clients/premier.json.
 * Does NOT wipe other clients' location JSON under data/lf/locations/.
 *
 * Prefer: npm run build:lf -- --client=premier
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(here, "build-lf-client.mjs");
const extra = process.argv.slice(2);
const r = spawnSync(
  process.execPath,
  [target, "--client=premier", ...extra],
  { stdio: "inherit", env: process.env }
);
process.exit(r.status ?? 1);

export { parseCensusDate, CLIENTS, buildClient } from "./build-lf-client.mjs";
