"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  heatmapImageAlt,
  type HeatmapContext,
} from "@/lib/heatmap";

export type HeatmapViewerProps = {
  url: string;
  context: HeatmapContext;
  onClose: () => void;
};

export function HeatmapViewer({ url, context, onClose }: HeatmapViewerProps) {
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const alt = heatmapImageAlt(context);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setStatus("loading");
  }, [url]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close heatmap viewer"
        className="absolute inset-0 bg-navy-900/70 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 flex max-h-[min(92vh,56rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-navy-700/40 bg-navy-50 shadow-2xl shadow-navy-950/40 sm:rounded-2xl"
      >
        <header className="flex shrink-0 items-start gap-3 border-b border-navy-700/30 bg-hero-navy px-4 py-3.5 text-white sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-100/80">
              Heatmap
            </p>
            <h2
              id={titleId}
              className="mt-0.5 truncate text-base font-semibold tracking-tight sm:text-lg"
            >
              {context.keyword?.trim() || "Untitled keyword"}
            </h2>
            <p id={descId} className="mt-1 text-xs text-navy-100/85 sm:text-sm">
              <span className="font-medium text-white/95">
                {context.locationLabel}
              </span>
              {context.date?.trim() ? (
                <>
                  <span className="mx-1.5 text-navy-200/70" aria-hidden>
                    ·
                  </span>
                  <span className="tabular-nums">{context.date.trim()}</span>
                </>
              ) : null}
              {context.campaignName?.trim() ? (
                <>
                  <span className="mx-1.5 text-navy-200/70" aria-hidden>
                    ·
                  </span>
                  <span className="truncate">{context.campaignName.trim()}</span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 sm:inline-flex"
            >
              Open original ↗
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-lg leading-none text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </header>

        <div className="relative flex min-h-[12rem] flex-1 items-center justify-center overflow-auto bg-navy-100/80 p-3 sm:p-5">
          {status === "loading" ? (
            <div
              className="absolute inset-3 animate-pulse rounded-xl bg-gradient-to-br from-navy-200/80 via-navy-100 to-navy-200/60 sm:inset-5"
              aria-hidden
            />
          ) : null}

          {status === "error" ? (
            <div
              role="alert"
              className="mx-auto max-w-md rounded-xl border border-dashed border-navy-300/80 bg-navy-50 px-5 py-10 text-center shadow-sm"
            >
              <p className="text-sm font-semibold text-navy-900">
                Heatmap could not be loaded
              </p>
              <p className="mt-1.5 text-sm text-navy-600">
                The image failed to load. You can open the original asset in a
                new tab.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-lg bg-navy-800 px-3 py-2 text-sm font-medium text-white hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                Open original ↗
              </a>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- dynamic LF CDN URLs; load only on selection
            <img
              key={url}
              src={url}
              alt={alt}
              className={`relative z-[1] max-h-[min(72vh,42rem)] w-auto max-w-full rounded-lg border border-navy-200/70 bg-white object-contain shadow-md shadow-navy-900/10 ${
                status === "loading" ? "opacity-0" : "opacity-100"
              } transition-opacity duration-200`}
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("error")}
            />
          )}
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-navy-200/80 bg-navy-100/90 px-4 py-2.5 sm:px-5">
          <p className="text-[11px] text-navy-600">
            Esc to close · image loads on demand
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md bg-navy-800 px-2.5 py-1 text-xs font-medium text-white hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1 sm:hidden"
          >
            Open original ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-navy-300/80 bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-800 hover:bg-navy-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
