"use client";

import { useId, useState } from "react";
import { inputClass, labelClass } from "@/components/admin/admin-chrome";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
  multiple?: boolean;
};

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
  if (!res.ok || !data.ok || !data.url) {
    throw new Error(data.error ?? "Upload failed");
  }
  return data.url;
}

export function ImageUploadField({
  name,
  label,
  defaultValue = "",
  hint,
  multiple = false,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const initial = (defaultValue ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const [urls, setUrls] = useState<string[]>(initial);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value = multiple ? urls.join("\n") : (urls[0] ?? "");

  async function onFilesSelected(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    setPending(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadFile(file));
      }
      setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(0, 1)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setPending(false);
    }
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
        <label className="inline-flex cursor-pointer items-center rounded-lg border border-[#E06820]/40 bg-[#E06820]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#E06820] transition hover:bg-[#E06820]/20">
          {pending ? "Uploading…" : multiple ? "Upload photos" : "Upload photo"}
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple={multiple}
            disabled={pending}
            className="sr-only"
            onChange={(e) => {
              void onFilesSelected(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <input type="hidden" name={name} value={value} />

      {!multiple ? (
        <input
          type="url"
          value={urls[0] ?? ""}
          onChange={(e) => setUrls(e.target.value ? [e.target.value] : [])}
          placeholder="Or paste an image URL"
          className={inputClass}
        />
      ) : (
        <textarea
          value={urls.join("\n")}
          onChange={(e) =>
            setUrls(
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
          rows={Math.max(3, urls.length + 1)}
          placeholder="Uploaded URLs appear here (one per line). You can also paste URLs."
          className={inputClass}
        />
      )}

      {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {urls.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, index) => (
            <li
              key={`${url}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white opacity-90 transition hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-zinc-500">
          Drop-ready upload — tap the button to add project photos from your computer or phone.
        </div>
      )}
    </div>
  );
}
