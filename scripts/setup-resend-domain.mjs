const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("RESEND_API_KEY missing");
  process.exit(1);
}

async function resend(path, options = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

const list = await resend("/domains");
console.log("domains_list_status=", list.status);
console.log(JSON.stringify(list.json, null, 2));

const existing = (list.json?.data || []).find(
  (d) => d.name === "norrisconstruction.co",
);

let domain = existing;
if (!existing) {
  const created = await resend("/domains", {
    method: "POST",
    body: JSON.stringify({ name: "norrisconstruction.co" }),
  });
  console.log("create_status=", created.status);
  console.log(JSON.stringify(created.json, null, 2));
  domain = created.json;
} else {
  const detail = await resend(`/domains/${existing.id}`);
  console.log("domain_detail_status=", detail.status);
  console.log(JSON.stringify(detail.json, null, 2));
  domain = detail.json;
}

if (domain?.id) {
  const verified = await resend(`/domains/${domain.id}/verify`, {
    method: "POST",
  });
  console.log("verify_status=", verified.status);
  console.log(JSON.stringify(verified.json, null, 2));
}
