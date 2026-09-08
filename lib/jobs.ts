import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Job, JobStatus, PageRecord } from "./types";
import { DEFAULT_MAX_PAGES } from "./types";
import { siteKey } from "./url";

const DATA_DIR = path.join(process.cwd(), "data", "jobs");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function jobPath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

export function createJob(url: string, maxPages = DEFAULT_MAX_PAGES): Job {
  ensureDir();
  const key = siteKey(url);
  const existing = findInProgressBySiteKey(key);
  if (existing) {
    const err = new Error(
      `A crawl is already in progress for this site (job ${existing.id})`
    ) as Error & { code: string; jobId: string };
    err.code = "duplicate_in_progress";
    err.jobId = existing.id;
    throw err;
  }

  const now = new Date().toISOString();
  const job: Job = {
    id: uuidv4(),
    url,
    siteKey: key,
    status: "queued",
    createdAt: now,
    updatedAt: now,
    progress: { crawled: 0, queued: 1, maxPages },
    pages: [],
  };
  saveJob(job);
  return job;
}

export function saveJob(job: Job): void {
  ensureDir();
  job.updatedAt = new Date().toISOString();
  fs.writeFileSync(jobPath(job.id), JSON.stringify(job, null, 2), "utf8");
}

export function getJob(id: string): Job | null {
  ensureDir();
  const p = jobPath(id);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as Job;
  } catch {
    return null;
  }
}

export function updateJob(
  id: string,
  patch: Partial<
    Pick<Job, "status" | "error" | "errorCode" | "wpSignals" | "progress" | "pages">
  >
): Job | null {
  const job = getJob(id);
  if (!job) return null;
  Object.assign(job, patch);
  saveJob(job);
  return job;
}

export function appendPage(id: string, page: PageRecord): Job | null {
  const job = getJob(id);
  if (!job) return null;
  job.pages.push(page);
  job.progress.crawled = job.pages.length;
  saveJob(job);
  return job;
}

export function setStatus(
  id: string,
  status: JobStatus,
  extra?: { error?: string; errorCode?: string }
): Job | null {
  return updateJob(id, { status, ...extra });
}

export function listJobs(): Job[] {
  ensureDir();
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(
          fs.readFileSync(path.join(DATA_DIR, f), "utf8")
        ) as Job;
      } catch {
        return null;
      }
    })
    .filter((j): j is Job => !!j)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function findInProgressBySiteKey(key: string): Job | null {
  const active: JobStatus[] = ["queued", "detecting", "crawling"];
  return (
    listJobs().find((j) => j.siteKey === key && active.includes(j.status)) ||
    null
  );
}

/** Public view without full page bodies (for polling UI). */
export function jobSummary(job: Job) {
  return {
    id: job.id,
    url: job.url,
    status: job.status,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    progress: job.progress,
    error: job.error,
    errorCode: job.errorCode,
    wpSignals: job.wpSignals,
    pageCount: job.pages.length,
  };
}
