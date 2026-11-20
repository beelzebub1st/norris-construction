import { put } from "@vercel/blob";
import { requireAdminApi } from "@/lib/auth/require-admin-api";

const MAX_BYTES = 4.5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        ok: false,
        error:
          "Image uploads are not configured yet (BLOB_READ_WRITE_TOKEN missing).",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid upload body" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return Response.json(
      { ok: false, error: "Only JPG, PNG, WebP, GIF, or AVIF images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { ok: false, error: "Image must be under 4.5 MB" },
      { status: 400 },
    );
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase() || "image";
  const pathname = `uploads/${Date.now()}-${safeName}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return Response.json({ ok: true, url: blob.url, pathname: blob.pathname });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
