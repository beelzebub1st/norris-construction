import { Resend } from "resend";

export const MISSING_RESEND_API_KEY = "RESEND_API_KEY missing";

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}

export function getResendFromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    // Works without custom domain DNS: can only send to the Resend account email.
    "Norris Construction <onboarding@resend.dev>"
  );
}

export function getLeadNotifyEmail(): string | undefined {
  return process.env.LEAD_NOTIFY_EMAIL?.trim() || undefined;
}

export function createResendClient(apiKey: string) {
  return new Resend(apiKey);
}
