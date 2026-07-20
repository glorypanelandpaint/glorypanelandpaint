import { useEffect } from "react";
import { reportVisit } from "../api/visit";

const STORAGE_KEY = "glory_visit_last_at";
const SESSION_KEY = "glory_visit_session";
const ONE_HOUR_MS = 60 * 60 * 1000;

let inFlight = false;
/** In-memory fallback so a storage failure cannot cause a tight retry loop. */
let memoryLastAt: number | null = null;

function readLastAt(): number | null {
  if (memoryLastAt !== null) return memoryLastAt;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = Number(raw);
    if (!Number.isFinite(value)) return null;
    memoryLastAt = value;
    return value;
  } catch {
    return null;
  }
}

function writeLastAt(timestamp: number) {
  memoryLastAt = timestamp;
  try {
    localStorage.setItem(STORAGE_KEY, String(timestamp));
  } catch {
    /* private browsing / quota */
  }
}

function hasReportedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markReportedThisSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private browsing */
  }
}

/** True when there is no prior report, or the last report is older than one hour. */
function isDue(): boolean {
  const lastAt = readLastAt();
  if (lastAt === null) return true;
  return Date.now() - lastAt >= ONE_HOUR_MS;
}

async function sendVisitReport() {
  if (inFlight || !isDue()) return;

  inFlight = true;
  const reportedAt = Date.now();
  // Persist before the request so remounts / route changes cannot double-fire.
  writeLastAt(reportedAt);
  markReportedThisSession();

  try {
    await reportVisit();
  } catch {
    /* avoid retry storms; next window is still one hour out */
  } finally {
    inFlight = false;
  }
}

/**
 * Reports GET /visit at most once per browser session on init,
 * and at most once per hour across refreshes / route changes.
 */
export function useVisitReport() {
  useEffect(() => {
    if (!hasReportedThisSession() && isDue()) {
      void sendVisitReport();
    }
  }, []);
}
