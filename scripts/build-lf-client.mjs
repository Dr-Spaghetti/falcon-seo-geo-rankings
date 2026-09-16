#!/usr/bin/env node
/**
 * Client-scoped Local Falcon data builder.
 *
 * Updates ONE client's artifacts under data/lf/ without wiping other clients.
 *
 * Usage:
 *   node scripts/build-lf-client.mjs --client=therman
 *   node scripts/build-lf-client.mjs --client=premier
 *   node scripts/build-lf-client.mjs --client=all
 *   npm run build:lf -- --client=therman
 *
 * Env:
 *   LF_ARCHIVE  — path to archive dir (default /workspace/falcon-lf-archive)
 *   LF_OUT      — output root (default <repo>/data/lf)
 *
 * Flags:
 *   --client=<slug|all>  required (unless positional)
 *   --dry-run            print planned writes/deletes; touch nothing
 *   --list               list known clients and exit
 *
 * Writes per client (additive / idempotent):
 *   data/lf/clients/{slug}.json
 *   data/lf/locations/{placeId}.json   — only that client's place IDs
 *   data/lf/pilot-client.json          — Therman legacy mirror only
 *
 * Never rm -rf data/lf or unlink the whole locations/ directory.
 * Orphan cleanup (if any) is limited to place IDs previously listed
 * on THAT client's JSON that are no longer present.
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE = process.env.LF_ARCHIVE || "/workspace/falcon-lf-archive";
const OUT_DIR = process.env.LF_OUT || path.join(ROOT, "data", "lf");
const CLIENTS_DIR = path.join(OUT_DIR, "clients");
const LOC_DIR = path.join(OUT_DIR, "locations");

/** @typedef {{
 *   slug: string,
 *   name: string,
 *   group: string,
 *   brand_match: string,
 *   match: (row: object) => boolean,
 *   placeIds?: Set<string>,
 *   order?: string[],
 *   writePilotLegacy?: boolean,
 * }} ClientConfig */

/** @type {Record<string, ClientConfig>} */
export const CLIENTS = {
  therman: {
    slug: "therman",
    name: "Charlie Therman Injury & Accident Lawyers, P.C.",
    group: "Therman Law Group",
    brand_match: "therman",
    writePilotLegacy: true,
    match: (obj) => matchesHaystack(obj, /therman/i),
  },
  premier: {
    slug: "premier",
    name: "Premier Law Group",
    group: "Premier Law Group",
    brand_match: "premier",
    placeIds: new Set([
      "ChIJh_RMvzttkFQRdXcAxoifX4Q", // Bellevue
      "ChIJXTyBiIVnkFQRMKImYWD2Avg", // Renton
      "ChIJze5Cu49XkFQRA8EB6HcIvy8", // Federal Way
      "ChIJxw1Dv4VrkFQRa7UR5wKEPsg", // Seattle
    ]),
    order: [
      "ChIJh_RMvzttkFQRdXcAxoifX4Q",
      "ChIJXTyBiIVnkFQRMKImYWD2Avg",
      "ChIJze5Cu49XkFQRA8EB6HcIvy8",
      "ChIJxw1Dv4VrkFQRa7UR5wKEPsg",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.premier.placeIds.has(placeId));
    },
  },
  /**
   * Michael Marr / city Injury Attorneys — Client Ops Master Client Clist (Aug 2 2026): exactly 9.
   * Accuracy fix 2026-09-16: dropped Augusta (ChIJKRdsIXHT-YgRU0wGvxsbe_k, 34) and
   * Jacksonville (ChIJf-eIT6DP5YgR1n5yCCvEXSo, 172). Expected scans 5708-172-34 = 5502.
   * Still excludes: Marr Law Firm Atlanta Real Estate (ChIJr_JjyfEF9YgR1SJzz12xOz4),
   * Tampa duplicate empty-campaign alt (ChIJPYYL0MvDwogRV3QeKpInrT0),
   * Augusta Personal Injury Attorneys 0-scan alt (ChIJE0i3VrjT-YgRyWkb5LeifVE).
   */
  "michael-marr": {
    slug: "michael-marr",
    name: "Michael Marr / Injury Attorneys",
    group: "Injury Attorney's Marr",
    brand_match: "marr",
    placeIds: new Set([
      "ChIJvcSSqmMP9YgRPHRZQke9sfg", // Atlanta Injury Attorneys
      "ChIJUx5O_PDNjIgRfkE4ln96iic", // Columbus Injury Attorneys
      "ChIJyxQfBGhB24gRFyR6sd9z-qY", // Fort Myers Injury Attorneys
      "ChIJCcH65Nf584gRp7f_b88zQEw", // Macon Injury Attorneys
      "ChIJjUQroEdlZIgRu2xAY6NnWPQ", // Nashville Injury Attorneys
      "ChIJGTm5GHLDwogR2d6JRM2hek0", // Tampa Injury Attorneys
      "ChIJI-MrHSTX2IgRUediZIFN05I", // West Palm Beach Injury Attorneys
      "ChIJwQlW_Gef-4gRhxk5gYOD0Us", // Savannah Injury Attorneys (Bull St)
      "ChIJY77Yj0af-4gRXCIEeGDP5tE", // Savannah Injury Attorneys, LLC (Barnard) KEEP
    ]),
    order: [
      "ChIJvcSSqmMP9YgRPHRZQke9sfg",
      "ChIJUx5O_PDNjIgRfkE4ln96iic",
      "ChIJyxQfBGhB24gRFyR6sd9z-qY",
      "ChIJCcH65Nf584gRp7f_b88zQEw",
      "ChIJjUQroEdlZIgRu2xAY6NnWPQ",
      "ChIJGTm5GHLDwogR2d6JRM2hek0",
      "ChIJI-MrHSTX2IgRUediZIFN05I",
      "ChIJwQlW_Gef-4gRhxk5gYOD0Us",
      "ChIJY77Yj0af-4gRXCIEeGDP5tE",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(
        placeId && CLIENTS["michael-marr"].placeIds.has(placeId)
      );
    },
  },
  /**
   * KaplunMarx (Clist 6; LF roster 6 place_ids / 4699 scans).
   * Verified 2026-09-16 from falcon-lf-archive FIRM-ROSTER "KaplunMarx"
   * + reports-census (Kaplun/KaplunMarx brand only; no other firms).
   * + jl-ops/falcon-dashboard-client-queue-2026-09-16.json.
   */
  "kaplun-marx": {
    slug: "kaplun-marx",
    name: "KaplunMarx",
    group: "Kaplun Marx",
    brand_match: "kaplun",
    placeIds: new Set([
      "ChIJ5fHispQ0wYkRoSrFTrQRDpU", // Marlton NJ (1748)
      "ChIJU6hH5gHJxokRTt9l2dFOr0E", // Philadelphia (1218)
      "ChIJl98shp24xokR9ahgsE6mii0", // Bryn Mawr (513)
      "ChIJTbT2t--txokRoWzCuhd53ak", // Allentown (492)
      "ChIJP64QIqitxokRP-krkKcU8jY", // Southampton / Bucks (478)
      "ChIJj3OsYLt3xokRJEjYzsxC4-o", // Reading (250)
    ]),
    order: [
      "ChIJ5fHispQ0wYkRoSrFTrQRDpU",
      "ChIJU6hH5gHJxokRTt9l2dFOr0E",
      "ChIJl98shp24xokR9ahgsE6mii0",
      "ChIJTbT2t--txokRoWzCuhd53ak",
      "ChIJP64QIqitxokRP-krkKcU8jY",
      "ChIJj3OsYLt3xokRJEjYzsxC4-o",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(
        placeId && CLIENTS["kaplun-marx"].placeIds.has(placeId)
      );
    },
  },
  /**
   * Carlson Hayslett / CMH (Clist 7; LF 7 place_ids / 4644 scans).
   * Includes Kevin Hayslett Clearwater (ChIJBfQZa83xwogROITmamKF6MQ, 427) —
   * distinct GBP co-located with main Clearwater suite; roster heuristic splits
   * CMH vs Kevin, builder must union both. Verified 2026-09-16 census recount.
   * Prep: jl-ops/falcon-prep/cmh-2026-09-16.json
   */
  cmh: {
    slug: "cmh",
    name: "Carlson Hayslett / CMH",
    group: "Carlson Hayslett, P.A.",
    brand_match: "cmh",
    placeIds: new Set([
      "ChIJByaIzvbjwogRla_2yvPQD6w", // St. Petersburg (787)
      "ChIJ4xWf_vaQwogRGBA4kwmnfDk", // New Port Richey (783)
      "ChIJx2w59WAg6IgR2LFgtOn3ZH0", // Spring Hill (677)
      "ChIJjxUx1gyNwogRpb4hKte0zJo", // Clearwater (667)
      "ChIJjUr9kGXFwogRVR7ZYm_AP4U", // Tampa Ashley (655)
      "ChIJCQ6E_jIWw4gR_ZpDiibiSvc", // Palmetto / Bradenton (648)
      "ChIJBfQZa83xwogROITmamKF6MQ", // Kevin Hayslett Clearwater (427)
    ]),
    order: [
      "ChIJByaIzvbjwogRla_2yvPQD6w",
      "ChIJ4xWf_vaQwogRGBA4kwmnfDk",
      "ChIJx2w59WAg6IgR2LFgtOn3ZH0",
      "ChIJjxUx1gyNwogRpb4hKte0zJo",
      "ChIJjUr9kGXFwogRVR7ZYm_AP4U",
      "ChIJCQ6E_jIWw4gR_ZpDiibiSvc",
      "ChIJBfQZa83xwogROITmamKF6MQ",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.cmh.placeIds.has(placeId));
    },
  },
  /**
   * Jones & Swanson / AWJ Law (Clist 2; LF 2 place_ids / 3525 scans).
   * Verified 2026-09-16 census: Marietta 3021 + Cartersville 504 = 3525.
   * Prep: jl-ops/falcon-prep/jones-swanson-2026-09-16.json
   * Brand domain awjlaw.com; public display name Jones & Swanson.
   */
  "jones-swanson": {
    slug: "jones-swanson",
    name: "Jones & Swanson",
    group: "Jones & Swanson",
    brand_match: "jones-swanson",
    placeIds: new Set([
      "ChIJRcbcxtAV9YgRtFGgBaVT63A", // Marietta (3021)
      "ChIJzeal6y5P9YgR4OYjyk5bFVQ", // Cartersville (504)
    ]),
    order: [
      "ChIJRcbcxtAV9YgRtFGgBaVT63A",
      "ChIJzeal6y5P9YgR4OYjyk5bFVQ",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(
        placeId && CLIENTS["jones-swanson"].placeIds.has(placeId)
      );
    },
  },
  /**
   * Norden Leacox, PLLC (Clist 7; LF 7 place_ids / 3522 scans).
   * Roster heuristic splits Norden Leacox (6 FL / 3217) vs Norden Leacox-Albuquerque
   * (1 / 305) — builder unions via placeId set. INCLUDE Albuquerque
   * ChIJX8useWgLIocRwEf3Tpw2-Ig. EXCLUDE Law Giant ABQ ChIJS67mWwILIocRNfkUidPPpFw
   * and Santa Fe ChIJu1okKW5RGIcRc-2J0S5dN0c (different firm). Verified 2026-09-16 census.
   * Prep: jl-ops/falcon-prep/norden-leacox-2026-09-16.json
   * Brand: nordenleacox.com --primaryColor #002a54 (not secondary red).
   */
  "norden-leacox": {
    slug: "norden-leacox",
    name: "Norden Leacox",
    group: "Norden Leacox",
    brand_match: "norden-leacox",
    placeIds: new Set([
      "ChIJA_sE3eoP3ogRX4BgH3nQFC4", // Melbourne (664)
      "ChIJSTFWgIJ754gR_Qvx75srB8c", // Orlando (566)
      "ChIJscYHT7gB3ogRuwq6GjfiStk", // Cocoa (539)
      "ChIJKfvJbD2z4IgRqXnuoTnYpdc", // Titusville (528)
      "ChIJ_fzeSMsT3ogRPPsjJ5D7En0", // Palm Bay (514)
      "ChIJQQPm7dnF54gR2ymLrVJqbao", // Lakeland (406)
      "ChIJX8useWgLIocRwEf3Tpw2-Ig", // Albuquerque (305)
    ]),
    order: [
      "ChIJA_sE3eoP3ogRX4BgH3nQFC4",
      "ChIJSTFWgIJ754gR_Qvx75srB8c",
      "ChIJscYHT7gB3ogRuwq6GjfiStk",
      "ChIJKfvJbD2z4IgRqXnuoTnYpdc",
      "ChIJ_fzeSMsT3ogRPPsjJ5D7En0",
      "ChIJQQPm7dnF54gR2ymLrVJqbao",
      "ChIJX8useWgLIocRwEf3Tpw2-Ig",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(
        placeId && CLIENTS["norden-leacox"].placeIds.has(placeId)
      );
    },
  },
  /**
   * Omega Law Group (Clist 5; LF scanned 4 place_ids / 1794 scans).
   * Match ONLY the 4 scanned placeIds — do NOT haystack-match "omega"
   * (pulls 21 zero-scan inflation GBPs under roster
   * "Omega Law Group Accident & Injury Attorneys") and do NOT include
   * Cali Crash King ChIJNQLwhWgTkIARGihS8eZcYg8 (PAUSE, 229 scans, same
   * Stockton building suite #914 vs Omega #705). Clist 5th row not in
   * census with scans — do not invent. Verified 2026-09-16 census.
   * Prep: jl-ops/falcon-prep/omega-2026-09-16.json
   * Brand: omegalaw.com omega-rebuild main.min.css navy #22374b.
   */
  omega: {
    slug: "omega",
    name: "Omega Law Group",
    group: "Omega",
    brand_match: "omega",
    placeIds: new Set([
      "ChIJBwVdXCcTkIARFvxVGj1NITM", // Stockton (544)
      "ChIJP5rAp0Np6oARr9GIHXriErw", // Bakersfield (438)
      "ChIJ8TIc9ISZToYRveGA0Vx1weQ", // Dallas (410)
      "ChIJqzfhTsXDQIYR6vdZUPtCbRg", // Houston (402)
    ]),
    order: [
      "ChIJBwVdXCcTkIARFvxVGj1NITM",
      "ChIJP5rAp0Np6oARr9GIHXriErw",
      "ChIJ8TIc9ISZToYRveGA0Vx1weQ",
      "ChIJqzfhTsXDQIYR6vdZUPtCbRg",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.omega.placeIds.has(placeId));
    },
  },
  /**
   * Widrig Law (Clist/LF 4 place_ids / 1675 scans).
   * Match ONLY the explicit placeId set — union roster firms
   * 'Widrig Law' + 'Widrig Law PLLC | Mt Juliet Attorney'. The 4th GBP
   * (ChIJ65_Tnrs_ZIgRhu5UJOeYRaw, 11205 Lebanon Rd #74) has 0 census
   * rows but is required to hit queue 4 locations; keepZeroScan keeps it.
   * Do NOT rely on firm=='Widrig Law' alone (drops the 0-scan listing).
   * Exclusions: none. Verified 2026-09-16 census (631+589+455+0=1675).
   * Prep: jl-ops/falcon-prep/widrig-2026-09-16.json
   * Brand: widriglaw.com styles/variables.css --color-primary:#233C55.
   */
  widrig: {
    slug: "widrig",
    name: "Widrig Law",
    group: "Widrig",
    brand_match: "widrig",
    keepZeroScan: true,
    placeIds: new Set([
      "ChIJ0U7ruvd7ZIgR12gqUk_CdK4", // Brentwood (631)
      "ChIJ80LRkM8VZIgRQhwCW7eRouw", // Mt. Juliet (589)
      "ChIJtaeHLDAfZIgRR46Ibm7n-fk", // Lebanon (455)
      "ChIJ65_Tnrs_ZIgRhu5UJOeYRaw", // Mt. Juliet Attorney (0)
    ]),
    order: [
      "ChIJ0U7ruvd7ZIgR12gqUk_CdK4",
      "ChIJ80LRkM8VZIgRQhwCW7eRouw",
      "ChIJtaeHLDAfZIgRR46Ibm7n-fk",
      "ChIJ65_Tnrs_ZIgRhu5UJOeYRaw",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.widrig.placeIds.has(placeId));
    },
  },
  /**
   * Adrianos Facchetti (Clist/LF 1 place_id / 1369 scans).
   * Match ONLY the explicit placeId set — do NOT match on Burbank city
   * alone (would pull DJ Law Corp ChIJ-Q_YxzfBwoAR2ZBArnFZhBk, 411 scans,
   * separate queue firm / djlawcorp.com / Magnolia Blvd). Roster
   * firm=='Adrianos Facchetti' covers this 1. Exclusions: DJ Law Corp.
   * Verified 2026-09-16 census (1369).
   * Prep: jl-ops/falcon-prep/facchetti-2026-09-16.json
   * Brand: facchettilaw.com Elementor --e-global-color-primary:#013f4e.
   */
  facchetti: {
    slug: "facchetti",
    name: "Adrianos Facchetti",
    group: "Facchetti",
    brand_match: "facchetti",
    placeIds: new Set([
      "ChIJ_9dZEG_DwoARrMm0afE4i24", // Burbank (1369)
    ]),
    order: [
      "ChIJ_9dZEG_DwoARrMm0afE4i24",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.facchetti.placeIds.has(placeId));
    },
  },
  /**
   * Leahy Cox (Clist/LF 2 place_ids / 853 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Emerald Law
   * / emeraldlaw.com alone (Portland GBP display name is Leahy Cox while
   * location-list URL is emeraldlaw.com). Roster firm=='Leahy Cox' covers
   * these 2. Exclusions: none. Verified 2026-09-16 census (516+337=853).
   * Prep: jl-ops/falcon-prep/leahy-cox-2026-09-16.json
   * Brand: emeraldlaw.com --color-prime:#2d7372.
   */
  "leahy-cox": {
    slug: "leahy-cox",
    name: "Leahy Cox",
    group: "Leahy Cox",
    brand_match: "leahy-cox",
    placeIds: new Set([
      "ChIJj5eDFcvhwFQRmyauSQBy4vk", // Springfield (516)
      "ChIJmaqHA4ULlVQRAW0Y-KvwviA", // Portland (337)
    ]),
    order: [
      "ChIJj5eDFcvhwFQRmyauSQBy4vk",
      "ChIJmaqHA4ULlVQRAW0Y-KvwviA",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["leahy-cox"].placeIds.has(placeId));
    },
  },
  /**
   * Andy Callif Bail Bonds (Clist/LF 2 place_ids / 843 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Andy Callif
   * alone (roster firm=='Andy Callif' while queue name is Andy Callif Bail
   * Bonds). Delaware + Columbus both required for queue 2/843. Exclusions:
   * none. Verified 2026-09-16 census (426+417=843).
   * Prep: jl-ops/falcon-prep/andy-callif-2026-09-16.json
   * Brand: andycallifbailbonds.com burgundy #640d0f.
   */
  "andy-callif": {
    slug: "andy-callif",
    name: "Andy Callif Bail Bonds",
    group: "Andy Callif Bail Bonds",
    brand_match: "andy-callif",
    placeIds: new Set([
      "ChIJWdogKpv7OIgR3Zl3LYcVaVI", // Delaware (426)
      "ChIJJ-LLruKLR4gRNvyLl0GX69Q", // Columbus (417)
    ]),
    order: [
      "ChIJWdogKpv7OIgR3Zl3LYcVaVI",
      "ChIJJ-LLruKLR4gRNvyLl0GX69Q",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["andy-callif"].placeIds.has(placeId));
    },
  },
  /**
   * Amos Perrick (Clist/LF 1 place_id / 782 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Amos Perrick
   * / apmdlaw.com alone. Roster firm=='Amos Perrick' covers this 1.
   * Exclusions: none. Verified 2026-09-16 census (782).
   * Prep: jl-ops/falcon-prep/amos-perrick-2026-09-16.json
   * Brand: apmdlaw.com logo SVG navy #2b2b51.
   */
  "amos-perrick": {
    slug: "amos-perrick",
    name: "Amos Perrick",
    group: "Amos Perrick",
    brand_match: "amos-perrick",
    placeIds: new Set([
      "ChIJtfvPmgUhyIkRrqVD-3_sl2s", // Columbia (782)
    ]),
    order: [
      "ChIJtfvPmgUhyIkRrqVD-3_sl2s",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["amos-perrick"].placeIds.has(placeId));
    },
  },
  /**
   * Gold Dog Injury Law (Clist/LF 2 place_ids / 753 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Gold Dog /
   * Bulldog Law alone. Kennewick census includes campaign alias Bulldog Law
   * (Jack Law) on the same place_id (include; no separate firm). Tacoma queue
   * GBP is addressed in Lakewood — keep source address / Lakewood city label.
   * Exclusions: none. Verified 2026-09-16 census (397+356=753).
   * Prep: jl-ops/falcon-prep/gold-dog-2026-09-16.json
   * Brand: golddoglaw.com logo SVG slate teal #375d6a (gold #ECB52A accent).
   */
  "gold-dog": {
    slug: "gold-dog",
    name: "Gold Dog Injury Law",
    group: "Gold Dog Injury Law",
    brand_match: "gold-dog",
    placeIds: new Set([
      "ChIJD3xS4915mFQRgplHEvLmC7s", // Kennewick (397)
      "ChIJ-wi4M4UBkVQR7SQWDYWFJf0", // Lakewood / Tacoma (356)
    ]),
    order: [
      "ChIJD3xS4915mFQRgplHEvLmC7s",
      "ChIJ-wi4M4UBkVQR7SQWDYWFJf0",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["gold-dog"].placeIds.has(placeId));
    },
  },

  /**
   * Kunka Law (Clist 2 offices / LF 3 place_ids / 603 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Kunka /
   * Columbia Criminal Defense alone. Two Columbia place_ids share
   * 5501 Twin Knolls Rd #102 — keep both (202 + 39). Glen Burnie is the
   * other office. Exclusions: none. Verified 2026-09-16 census (362+202+39=603).
   * Prep: jl-ops/falcon-prep/kunka-2026-09-16.json
   * Brand: kunkalaw.com Elementor --e-global-color-primary #0b3752.
   */
  "kunka": {
    slug: "kunka",
    name: "Kunka Law",
    group: "Kunka Law",
    brand_match: "kunka",
    placeIds: new Set([
      "ChIJ6egAs8X9t4kRQonJnHfArhA", // Glen Burnie (362)
      "ChIJn6xrfznft4kRtWsldlY1zAQ", // Columbia Criminal Defense (202)
      "ChIJv7sKXOHft4kRC4SX7Nf8g7U", // Kunka Law LLC Columbia (39)
    ]),
    order: [
      "ChIJ6egAs8X9t4kRQonJnHfArhA",
      "ChIJn6xrfznft4kRtWsldlY1zAQ",
      "ChIJv7sKXOHft4kRC4SX7Nf8g7U",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.kunka.placeIds.has(placeId));
    },
  },

  /**
   * Rampart Injury Lawyers (Clist/LF 1 place_id / 577 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Rampart /
   * Travis Legal Offices alone. Census includes campaign alias Travis Legal
   * Offices on the same Castle Rock place_id (include; no separate firm).
   * Exclusions: none. Verified 2026-09-16 census (577).
   * Prep: jl-ops/falcon-prep/rampart-2026-09-16.json
   * Brand: rampartinjurylawyers.com Elementor --e-global-color-primary #333544.
   */
  "rampart": {
    slug: "rampart",
    name: "Rampart Injury Lawyers",
    group: "Rampart Injury Lawyers",
    brand_match: "rampart",
    placeIds: new Set([
      "ChIJB4HGE9uFbIcRZmUc1GIQWM0", // Castle Rock (577)
    ]),
    order: [
      "ChIJB4HGE9uFbIcRZmUc1GIQWM0",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.rampart.placeIds.has(placeId));
    },
  },

  /**
   * Milano Legal Group (Clist/LF 1 place_id / 558 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Milano /
   * milanoaccidentlawyers alone. Exclusions: none. Verified 2026-09-16 census (558).
   * Prep: jl-ops/falcon-prep/milano-2026-09-16.json
   * Brand: milanoaccidentlawyers.com WordPress theme primary #0073e5.
   */
  "milano": {
    slug: "milano",
    name: "Milano Legal Group",
    group: "Milano Legal Group",
    brand_match: "milano",
    placeIds: new Set([
      "ChIJkQgFGEPBQIYRGT7-6YcKRRY", // Houston (558)
    ]),
    order: [
      "ChIJkQgFGEPBQIYRGT7-6YcKRRY",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS.milano.placeIds.has(placeId));
    },
  },

  /**
   * Tad Law / Tad Nelson (Clist/LF 2 place_ids / 423 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Tad /
   * tadlaw alone. Union roster split Tad Law (Galveston) + Tad Nelson Law
   * (League City). Exclusions: none. Verified 2026-09-16 census (423).
   * Prep: jl-ops/falcon-prep/tad-law-2026-09-16.json
   * Brand: tadlaw.com homepage critical CSS #cb6326.
   */
  "tad-law": {
    slug: "tad-law",
    name: "Tad Law",
    group: "Tad Law",
    brand_match: "tad-law",
    placeIds: new Set([
      "ChIJj16zeDGdQIYRJaadIn2tVkA", // League City (223)
      "ChIJqyalQEKeP4YRcS9LApadEjg", // Galveston (200)
    ]),
    order: [
      "ChIJj16zeDGdQIYRJaadIn2tVkA",
      "ChIJqyalQEKeP4YRcS9LApadEjg",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["tad-law"].placeIds.has(placeId));
    },
  },

  /**
   * DJ Law Corp (Clist/LF 1 place_id / 411 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match DJ / Burbank /
   * Djougourian alone. SEPARATE from Adrianos Facchetti (ChIJ_9dZEG_DwoARrMm0afE4i24,
   * 1369 scans, facchettilaw.com) — do NOT merge. Verified 2026-09-16 census (411).
   * Prep: jl-ops/falcon-prep/dj-law-2026-09-16.json
   * Brand: djlawcorp.com Bootstrap primary #0d6efd.
   */
  "dj-law": {
    slug: "dj-law",
    name: "DJ Law Corp",
    group: "DJ Law Corp",
    brand_match: "dj-law",
    placeIds: new Set([
      "ChIJ-Q_YxzfBwoAR2ZBArnFZhBk", // Burbank (411)
    ]),
    order: [
      "ChIJ-Q_YxzfBwoAR2ZBArnFZhBk",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["dj-law"].placeIds.has(placeId));
    },
  },

  /**
   * Mary Higgins (Clist/LF 2 place_ids / 408 scans).
   * Match ONLY the explicit placeId set — do NOT haystack-match Higgins /
   * letsbelegal / McLean alone. Exclusions: none. Verified 2026-09-16 census (408).
   * Prep: jl-ops/falcon-prep/mary-higgins-2026-09-16.json
   * Brand: letsbelegal.com --color-prime #b32227.
   */
  "mary-higgins": {
    slug: "mary-higgins",
    name: "Mary Higgins",
    group: "Mary Higgins",
    brand_match: "mary-higgins",
    placeIds: new Set([
      "ChIJyfopmGRlx4kR0zCxNFAuMBc", // Dover (229)
      "ChIJj-y1UxoBx4kR3W5jXJstOXI", // Newark (179)
    ]),
    order: [
      "ChIJyfopmGRlx4kR0zCxNFAuMBc",
      "ChIJj-y1UxoBx4kR3W5jXJstOXI",
    ],
    match: (row) => {
      const placeId = row.place_id || row.id || row.location?.place_id;
      return Boolean(placeId && CLIENTS["mary-higgins"].placeIds.has(placeId));
    },
  },

};


function matchesHaystack(obj, re) {
  if (!obj || typeof obj !== "object") return false;
  const hay = [];
  if (obj.name) hay.push(String(obj.name));
  if (obj.campaign_name) hay.push(String(obj.campaign_name));
  for (const key of ["groups", "group"]) {
    if (Array.isArray(obj[key])) {
      for (const g of obj[key]) {
        if (typeof g === "string") hay.push(g);
        else if (g?.name) hay.push(String(g.name));
      }
    }
  }
  if (obj.location?.name) hay.push(String(obj.location.name));
  if (Array.isArray(obj.location?.group)) {
    for (const g of obj.location.group) {
      if (typeof g === "string") hay.push(g);
      else if (g?.name) hay.push(String(g.name));
    }
  }
  return hay.some((s) => re.test(s));
}

/** Parse US `M/D/YYYY h:mm AM/PM` → { year, month, day, isoDate } or null */
export function parseCensusDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;
  const m = dateStr.trim().match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?$/i
  );
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { year, month, day, isoDate };
}

function numOrNull(v) {
  if (v === false || v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function compactScan(row) {
  const parsed = parseCensusDate(row.date);
  return {
    id: row.id || row.report_key,
    report_key: row.report_key || null,
    date: row.date || null,
    year: parsed?.year ?? null,
    month: parsed?.month ?? null,
    day: parsed?.day ?? null,
    isoDate: parsed?.isoDate ?? null,
    type: row.type || null,
    campaign_name: row.campaign_name || null,
    platform: row.platform || null,
    keyword: row.keyword || null,
    grid_size: numOrNull(row.grid_size),
    radius: numOrNull(row.radius),
    measurement: row.measurement || null,
    data_points: numOrNull(row.data_points),
    found_in: numOrNull(row.found_in),
    arp: numOrNull(row.arp),
    atrp: numOrNull(row.atrp),
    solv: numOrNull(row.solv),
    image: row.image || null,
    heatmap: row.heatmap || null,
    pdf: row.pdf || null,
    public_url: row.public_url || null,
  };
}

function readJsonl(filePath, onRow) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error(`Missing archive file: ${filePath}`));
      return;
    }
    const input = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({ input, crlfDelay: Infinity });
    rl.on("line", (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        onRow(JSON.parse(trimmed));
      } catch {
        // skip bad lines
      }
    });
    rl.on("close", resolve);
    rl.on("error", reject);
    input.on("error", reject);
  });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cityFromAddress(address) {
  if (!address) return null;
  const parts = String(address).split(",").map((s) => s.trim());
  if (parts.length >= 2) return parts[parts.length - 2] || null;
  return null;
}

function seedFromListRow(row, placeId, fallbackName) {
  const groups = Array.isArray(row.groups)
    ? row.groups.map((g) => (typeof g === "string" ? g : g?.name)).filter(Boolean)
    : [];
  let primary = null;
  if (row.categories && typeof row.categories === "object") {
    primary = Object.values(row.categories)[0] || null;
  }
  return {
    place_id: placeId,
    name: row.name || fallbackName,
    address: row.address || null,
    city: cityFromAddress(row.address),
    lat: row.lat ? Number(row.lat) : null,
    lng: row.lng ? Number(row.lng) : null,
    rating: numOrNull(row.rating),
    reviews: numOrNull(row.reviews),
    phone: row.phone || null,
    url: row.url || null,
    primary_category: primary,
    groups,
    scan_count: 0,
    latest_date: null,
    latest_iso: null,
  };
}

function seedFromCensusLoc(loc, placeId, fallbackName) {
  const groups = Array.isArray(loc.group)
    ? loc.group.map((g) => (typeof g === "string" ? g : g?.name)).filter(Boolean)
    : [];
  return {
    place_id: placeId,
    name: loc.name || fallbackName,
    address: loc.address || null,
    city: cityFromAddress(loc.address),
    lat: loc.lat ? Number(loc.lat) : null,
    lng: loc.lng ? Number(loc.lng) : null,
    rating: numOrNull(loc.rating),
    reviews: numOrNull(loc.reviews),
    phone: loc.phone || null,
    url: loc.url || null,
    primary_category: loc.primary_category || null,
    groups,
    scan_count: 0,
    latest_date: null,
    latest_iso: null,
  };
}

function parseArgs(argv) {
  const out = { client: null, dryRun: false, list: false };
  for (const arg of argv) {
    if (arg === "--dry-run") out.dryRun = true;
    else if (arg === "--list") out.list = true;
    else if (arg.startsWith("--client=")) out.client = arg.slice("--client=".length);
    else if (arg === "--client") continue;
    else if (!arg.startsWith("-") && !out.client) out.client = arg;
  }
  // support: --client therman
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--client" && argv[i + 1] && !argv[i + 1].startsWith("-")) {
      out.client = argv[i + 1];
    }
  }
  return out;
}

function previousPlaceIds(slug) {
  const p = path.join(CLIENTS_DIR, `${slug}.json`);
  if (!fs.existsSync(p)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    return (data.locations || []).map((l) => l.place_id).filter(Boolean);
  } catch {
    return [];
  }
}

function writeJson(filePath, value, dryRun, pretty = false) {
  const body = pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
  if (dryRun) {
    console.log(`  [dry-run] would write ${path.relative(ROOT, filePath)} (${body.length} bytes)`);
    return;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, body);
}

function unlinkIfExists(filePath, dryRun) {
  if (!fs.existsSync(filePath)) return;
  if (dryRun) {
    console.log(`  [dry-run] would unlink ${path.relative(ROOT, filePath)}`);
    return;
  }
  fs.unlinkSync(filePath);
}

/**
 * Build one client. Returns summary stats.
 * @param {ClientConfig} cfg
 * @param {{ dryRun?: boolean }} opts
 */
export async function buildClient(cfg, opts = {}) {
  const dryRun = Boolean(opts.dryRun);
  console.log(`\n=== Building client: ${cfg.slug} ===`);
  console.log(`LF archive: ${ARCHIVE}`);
  console.log(`Output:     ${OUT_DIR}`);
  console.log(`Mode:       ${dryRun ? "dry-run (no writes)" : "write"}`);

  const locationsById = new Map();

  await readJsonl(path.join(ARCHIVE, "locations-list.jsonl"), (row) => {
    if (!cfg.match(row)) return;
    const placeId = row.place_id || row.id;
    if (!placeId) return;
    if (cfg.placeIds && !cfg.placeIds.has(placeId)) return;
    locationsById.set(placeId, seedFromListRow(row, placeId, cfg.name));
  });

  const scansByPlace = new Map();

  await readJsonl(path.join(ARCHIVE, "reports-census.jsonl"), (row) => {
    if (!cfg.match(row)) return;
    const placeId = row.place_id || row.location?.place_id;
    if (!placeId) return;
    if (cfg.placeIds && !cfg.placeIds.has(placeId)) return;

    if (!locationsById.has(placeId)) {
      locationsById.set(
        placeId,
        seedFromCensusLoc(row.location || {}, placeId, cfg.name)
      );
    }

    const scan = compactScan(row);
    if (!scansByPlace.has(placeId)) scansByPlace.set(placeId, []);
    scansByPlace.get(placeId).push(scan);
  });

  for (const [placeId, scans] of scansByPlace) {
    scans.sort((a, b) => {
      const ai = a.isoDate || "";
      const bi = b.isoDate || "";
      if (ai !== bi) return bi.localeCompare(ai);
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    const loc = locationsById.get(placeId);
    if (loc) {
      loc.scan_count = scans.length;
      loc.latest_date = scans[0]?.date || null;
      loc.latest_iso = scans[0]?.isoDate || null;
    }
  }

  let locations;
  if (cfg.order?.length) {
    locations = cfg.order
      .map((id) => locationsById.get(id))
      .filter(Boolean)
      .filter(
        (l) =>
          cfg.keepZeroScan ||
          (scansByPlace.get(l.place_id) || []).length > 0
      );
    if (cfg.placeIds && locations.length !== cfg.placeIds.size) {
      const missing = [...cfg.placeIds].filter(
        (id) => !locations.some((l) => l.place_id === id)
      );
      console.warn(
        cfg.keepZeroScan
          ? "WARNING missing locations:"
          : "WARNING missing locations with scans:",
        missing
      );
    }
  } else {
    locations = [...locationsById.values()]
      .filter(
        (l) =>
          cfg.keepZeroScan ||
          (scansByPlace.get(l.place_id) || []).length > 0
      )
      .sort((a, b) => (b.scan_count || 0) - (a.scan_count || 0));
  }

  const newPlaceIds = new Set(locations.map((l) => l.place_id));
  const prevIds = previousPlaceIds(cfg.slug);
  const orphans = prevIds.filter((id) => !newPlaceIds.has(id));

  // Safety: never delete a place_id that still belongs to another known client.
  const otherOwned = new Set();
  for (const other of Object.values(CLIENTS)) {
    if (other.slug === cfg.slug) continue;
    for (const id of previousPlaceIds(other.slug)) otherOwned.add(id);
  }
  const safeOrphans = orphans.filter((id) => !otherOwned.has(id));
  const blockedOrphans = orphans.filter((id) => otherOwned.has(id));
  if (blockedOrphans.length) {
    console.warn(
      `  Skipping orphan delete (owned by another client): ${blockedOrphans.join(", ")}`
    );
  }

  if (!dryRun) {
    ensureDir(CLIENTS_DIR);
    ensureDir(LOC_DIR);
  }

  let totalScans = 0;
  for (const loc of locations) {
    const scans = scansByPlace.get(loc.place_id) || [];
    totalScans += scans.length;
    const years = [...new Set(scans.map((s) => s.year).filter(Boolean))].sort(
      (a, b) => b - a
    );
    const payload = {
      place_id: loc.place_id,
      location: {
        place_id: loc.place_id,
        name: loc.name,
        address: loc.address,
        city: loc.city,
        lat: loc.lat,
        lng: loc.lng,
        rating: loc.rating,
        reviews: loc.reviews,
        phone: loc.phone,
        url: loc.url,
        primary_category: loc.primary_category,
        groups: loc.groups,
      },
      scan_count: scans.length,
      years,
      scans,
    };
    const outPath = path.join(LOC_DIR, `${loc.place_id}.json`);
    writeJson(outPath, payload, dryRun, false);
    console.log(
      `  ${dryRun ? "would write" : "wrote"} locations/${loc.place_id}.json (${scans.length} scans)`
    );
  }

  for (const id of safeOrphans) {
    unlinkIfExists(path.join(LOC_DIR, `${id}.json`), dryRun);
  }

  const client = {
    slug: cfg.slug,
    name: cfg.name,
    group: cfg.group,
    brand_match: cfg.brand_match,
    generated_at: new Date().toISOString(),
    source_archive: ARCHIVE,
    location_count: locations.length,
    scan_count: totalScans,
    locations: locations.map((l) => ({
      place_id: l.place_id,
      name: l.name,
      address: l.address,
      city: l.city,
      rating: l.rating,
      reviews: l.reviews,
      phone: l.phone,
      url: l.url,
      primary_category: l.primary_category,
      groups: l.groups,
      scan_count: l.scan_count,
      latest_date: l.latest_date,
      latest_iso: l.latest_iso,
    })),
  };

  writeJson(path.join(CLIENTS_DIR, `${cfg.slug}.json`), client, dryRun, true);
  console.log(
    `  ${dryRun ? "would write" : "Wrote"} data/lf/clients/${cfg.slug}.json`
  );

  if (cfg.writePilotLegacy) {
    writeJson(path.join(OUT_DIR, "pilot-client.json"), client, dryRun, true);
    console.log(
      `  ${dryRun ? "would write" : "Wrote"} data/lf/pilot-client.json (legacy mirror)`
    );
  }

  console.log(`Client: ${client.name}`);
  console.log(`Locations: ${client.location_count}`);
  console.log(`Scans: ${client.scan_count}`);
  if (safeOrphans.length) {
    console.log(`Orphans removed (this client only): ${safeOrphans.length}`);
  }

  return {
    slug: cfg.slug,
    location_count: client.location_count,
    scan_count: client.scan_count,
    place_ids: [...newPlaceIds],
    orphans_removed: safeOrphans,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.list) {
    console.log("Known clients:");
    for (const c of Object.values(CLIENTS)) {
      console.log(`  - ${c.slug}: ${c.name}`);
    }
    return;
  }

  if (!args.client) {
    console.error(
      "Usage: node scripts/build-lf-client.mjs --client=therman|premier|michael-marr|kaplun-marx|cmh|jones-swanson|norden-leacox|omega|widrig|facchetti|leahy-cox|andy-callif|amos-perrick|gold-dog|kunka|rampart|milano|tad-law|dj-law|mary-higgins|all [--dry-run]\n" +
        "       npm run build:lf -- --client=therman"
    );
    process.exit(2);
  }

  const slugs =
    args.client === "all" ? Object.keys(CLIENTS) : [args.client.toLowerCase()];

  for (const slug of slugs) {
    const cfg = CLIENTS[slug];
    if (!cfg) {
      console.error(
        `Unknown client "${slug}". Known: ${Object.keys(CLIENTS).join(", ")}`
      );
      process.exit(2);
    }
    await buildClient(cfg, { dryRun: args.dryRun });
  }
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
