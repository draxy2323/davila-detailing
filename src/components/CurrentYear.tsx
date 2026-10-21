"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Read the year in the visitor's browser so the static page never shows a stale year. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}
