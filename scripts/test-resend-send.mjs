import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM;
const to = process.env.LEAD_NOTIFY_EMAIL;

const resend = new Resend(apiKey);

async function trySend(label, fromAddress) {
  console.log(`\n--- try ${label} from=${fromAddress} to=${to}`);
  const result = await resend.emails.send({
    from: fromAddress,
    to,
    subject: "Norris Construction — Resend test",
    html: `<p>This is a Resend wiring test for Norris Construction.</p><p>If you got this, outbound email works.</p>`,
  });
  console.log(JSON.stringify(result, null, 2));
}

await trySend("domain-from", from);
await trySend("resend-onboarding", "Norris Construction <beth.t@example.com>");
