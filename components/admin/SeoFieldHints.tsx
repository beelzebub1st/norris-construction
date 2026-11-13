"use client";

import { useState } from "react";

export function SeoTitleInput({
  name = "seoTitle",
  defaultValue = "",
  className,
}: {
  name?: string;
  defaultValue?: string;
  className: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const len = value.trim().length;
  const tone =
    len === 0 ? "text-zinc-500" : len > 60 ? "text-amber-300" : "text-emerald-400";

  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
        placeholder="Ideal ~50–60 characters"
      />
      <p className={`mt-1 text-xs ${tone}`}>{len}/60 characters</p>
    </div>
  );
}

export function SeoDescriptionInput({
  name = "seoDescription",
  defaultValue = "",
  className,
  rows = 2,
}: {
  name?: string;
  defaultValue?: string;
  className: string;
  rows?: number;
}) {
  const [value, setValue] = useState(defaultValue);
  const len = value.trim().length;
  const tone =
    len === 0
      ? "text-zinc-500"
      : len < 70 || len > 160
        ? "text-amber-300"
        : "text-emerald-400";

  return (
    <div>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
        placeholder="Ideal ~120–155 characters"
      />
      <p className={`mt-1 text-xs ${tone}`}>{len}/160 characters</p>
    </div>
  );
}
