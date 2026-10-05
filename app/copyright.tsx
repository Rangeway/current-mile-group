"use client";

import { useSyncExternalStore } from "react";

function subscribe(refresh: () => void) {
  const timer = window.setInterval(refresh, 60 * 60 * 1000);
  window.addEventListener("focus", refresh);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", refresh);
  };
}

export default function Copyright({ buildYear }: { buildYear: number }) {
  // Hydrate from the static build, then use the visitor's current year.
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => buildYear);
  return <span>© {year} Current Mile Group</span>;
}
